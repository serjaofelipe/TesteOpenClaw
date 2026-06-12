from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time
import asyncio
import socket

app = FastAPI()

# Enable CORS so the React frontend can talk to it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for network history
network_history = []
max_history_points = 50

# Track previous bytes to calculate speed
last_bytes_sent = psutil.net_io_counters().bytes_sent
last_bytes_recv = psutil.net_io_counters().bytes_recv
last_check_time = time.time()

def measure_ping():
    """Medição simulada de ping (em ms) focada no tráfego de interface, 
       sem fazer port scanning."""
    try:
        # A simple socket connection test to 8.8.8.8 to measure latency safely
        start_time = time.time()
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        s.connect(('8.8.8.8', 53))
        s.close()
        end_time = time.time()
        return round((end_time - start_time) * 1000)
    except Exception:
        return 999  # Fallback ping value if connection fails

@app.get("/api/network/stats")
def get_network_stats():
    global last_bytes_sent, last_bytes_recv, last_check_time

    current_time = time.time()
    time_elapsed = current_time - last_check_time
    
    current_bytes_sent = psutil.net_io_counters().bytes_sent
    current_bytes_recv = psutil.net_io_counters().bytes_recv

    # Calculate speeds in MB/s
    upload_speed = ((current_bytes_sent - last_bytes_sent) / time_elapsed) / (1024 * 1024)
    download_speed = ((current_bytes_recv - last_bytes_recv) / time_elapsed) / (1024 * 1024)

    # Ping measurement
    ping = measure_ping()

    # Update state
    last_bytes_sent = current_bytes_sent
    last_bytes_recv = current_bytes_recv
    last_check_time = current_time

    timestamp = time.strftime("%H:%M:%S")

    data_point = {
        "time": timestamp,
        "upload_mbps": round(upload_speed * 8, 2), # Convert to Mbps
        "download_mbps": round(download_speed * 8, 2),
        "ping_ms": ping
    }

    network_history.append(data_point)
    if len(network_history) > max_history_points:
        network_history.pop(0)

    # Calculate peak info
    peak_download = max([p["download_mbps"] for p in network_history]) if network_history else 0
    peak_upload = max([p["upload_mbps"] for p in network_history]) if network_history else 0

    return {
        "current": data_point,
        "history": network_history,
        "peaks": {
            "download": peak_download,
            "upload": peak_upload
        },
        "system": {
            "cpu_percent": psutil.cpu_percent(),
            "ram_percent": psutil.virtual_memory().percent
        }
    }

if __name__ == "__main__":
    import uvicorn
    # Serves the fastAPI backend
    print("Iniciando backend CyberDash [Monitor de Rede Seguro]...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
