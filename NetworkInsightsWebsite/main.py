import scapy.all as scapy
from scapy.layers.inet import IP, TCP, ICMP
import socket
import requests
import time
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import threading

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scan_results = {
    "status": "idle",
    "range": "",
    "hosts": []
}

def get_mac_vendor(mac_address):
    try:
        url = f"https://api.macvendors.com/{mac_address}"
        response = requests.get(url, timeout=2)
        if response.status_code == 200:
            return response.text
        return "Desconhecido"
    except:
        return "Desconhecido"

def identificar_os(ttl):
    if ttl <= 64:
        return "Linux/Android/Mac"
    elif ttl <= 128:
        return "Windows"
    else:
        return "Desconhecido"

def pegar_meu_mac_ip():
    try:
        mac = scapy.get_if_hwaddr(scapy.conf.iface)
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 1))
        ip = s.getsockname()[0]
        s.close()
        return {'ip': ip, 'mac': mac, 'vendor': 'ESTE DISPOSITIVO (HOST)', 'os': 'Windows/Linux (Host Local)'}
    except:
        return None

def analisar_host(ip, mac, vendor_pre_definido=None):
    if vendor_pre_definido:
        vendor = vendor_pre_definido
        os_guess = "Windows/Linux (Host Local)"
    else:
        # Avoid blocking for too long on API limit
        vendor = get_mac_vendor(mac)
        time.sleep(1) # Rate limit for macvendors
        os_guess = "Não respondeu Ping"
        try:
            # Aumentado timeout de ICMP para buscar mais longe/host mais lentos
            resp = scapy.sr1(IP(dst=ip) / ICMP(), timeout=2.5, verbose=0)
            if resp:
                os_guess = f"{identificar_os(resp.ttl)} (TTL={resp.ttl})"
        except:
            pass
    return {'ip': ip, 'mac': mac, 'vendor': vendor, 'os': os_guess}

def escanear_rede_ultimate_background(ip_range):
    global scan_results
    scan_results['status'] = 'scanning'
    scan_results['range'] = ip_range
    scan_results['hosts'] = []
    
    try:
        # 1. ARP Discovery com timeout maior (5s) para pegar redes mais amplas
        arp = scapy.ARP(pdst=ip_range)
        ether = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
        pacote = ether / arp
        resultado = scapy.srp(pacote, timeout=5.0, verbose=0)[0]
        
        hosts_temp = []
        meu_pc = pegar_meu_mac_ip()
        if meu_pc:
            hosts_temp.append(meu_pc)
            
        for sent, received in resultado:
            hosts_temp.append({'ip': received.psrc, 'mac': received.hwsrc, 'vendor': None})
            
        for h in hosts_temp:
            if 'os' not in h:
                info = analisar_host(h['ip'], h['mac'], h['vendor'])
                scan_results['hosts'].append(info)
            else:
                scan_results['hosts'].append(h)
    except Exception as e:
        print(f"Erro no escaneamento: {e}")
        
    scan_results['status'] = 'completed'

@app.get("/api/scan")
def get_scan():
    global scan_results
    return scan_results

@app.get("/api/bluetooth")
async def get_bluetooth():
    try:
        from bleak import BleakScanner
        devices = await BleakScanner.discover(timeout=8.0) # Timeout longo para varrer Bluetooth LE longe
        bt_list = []
        for d in devices:
            bt_list.append({
                "name": d.name or "<Desconhecido>",
                "address": d.address,
                "rssi": d.rssi
            })
        
        bt_list.sort(key=lambda x: x['rssi'], reverse=True)
        return {"status": "success", "devices": bt_list}
    except ImportError:
        return {"status": "error", "message": "Biblioteca 'bleak' não instalada. Feche e abra o start.bat."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/api/wifi")
def get_wifi():
    import subprocess
    try:
        output = subprocess.check_output(["netsh", "wlan", "show", "network", "mode=bssid"], encoding='cp1252', errors='ignore')
        networks = []
        current_ssid = None
        current_auth = "Desconhecido"
        
        for line in output.split('\n'):
            line = line.strip()
            if line.startswith("SSID "):
                parts = line.split(":", 1)
                if len(parts) > 1:
                    current_ssid = parts[1].strip()
                    if current_ssid == "":
                        current_ssid = "<Oculto>"
            elif line.startswith("Autentica") or line.startswith("Authentication"):
                parts = line.split(":", 1)
                if len(parts) > 1:
                    current_auth = parts[1].strip()
            elif line.startswith("Sinal") or line.startswith("Signal"):
                parts = line.split(":", 1)
                if len(parts) > 1 and current_ssid:
                    signal = parts[1].strip()
                    networks.append({"ssid": current_ssid, "auth": current_auth, "signal": signal})
                    current_ssid = None # Evita duplicar se houver múltiplos BSSIDs
        
        # Ordenar por sinal decrescente (ex: "99%" -> 99)
        def parse_signal(s):
            try: return int(s.replace('%', ''))
            except: return 0
        networks.sort(key=lambda x: parse_signal(x['signal']), reverse=True)
        
        return {"status": "success", "networks": networks}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/api/start_scan")
def start_scan():
    global scan_results
    if scan_results['status'] == 'scanning':
        return {"message": "Scan já está em progresso", "status": "scanning"}
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 1))
        meu_ip = s.getsockname()[0]
        s.close()
        base_ip = ".".join(meu_ip.split('.')[:3]) + ".1/24"
    except:
        base_ip = "192.168.1.1/24"
        
    thread = threading.Thread(target=escanear_rede_ultimate_background, args=(base_ip,))
    thread.daemon = True
    thread.start()
    return {"message": "Scan iniciado com sucesso", "range": base_ip, "status": "started"}

app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8090, reload=True)
