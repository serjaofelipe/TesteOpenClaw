// Matrix Animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
};

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Navigation Logic
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    const buttons = document.querySelectorAll('.nav-btn');
    if (sectionId === 'code-analysis') buttons[0].classList.add('active');
    else if (sectionId === 'wifi-scanner') buttons[1].classList.add('active');
    else if (sectionId === 'bluetooth-analysis') buttons[2].classList.add('active');
    else if (sectionId === 'traffic-monitor') buttons[3].classList.add('active');
    else if (sectionId === 'ping-radar') buttons[4].classList.add('active');
    else if (sectionId === 'subnet-calc') buttons[5].classList.add('active');
    else if (sectionId === 'traceroute-map') buttons[6].classList.add('active');
}

// Network Scanner Logic
const btnScan = document.getElementById('btn-scan');
const statusBox = document.getElementById('scan-status-box');
const statusText = document.getElementById('scan-status');
const rangeText = document.getElementById('scan-range');
const table = document.getElementById('hosts-table');
const tbody = document.getElementById('hosts-body');

let pollingInterval;

btnScan.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/start_scan', { method: 'POST' });
        const data = await response.json();
        
        btnScan.style.display = 'none';
        statusBox.style.display = 'block';
        table.style.display = 'table';
        rangeText.textContent = data.range || 'Determinando...';
        
        pollingInterval = setInterval(pollScan, 1500);
    } catch (err) {
        alert('Erro ao contatar servidor: ' + err);
    }
});

async function pollScan() {
    try {
        const res = await fetch('/api/scan');
        const data = await res.json();
        
        if (data.range) rangeText.textContent = data.range;
        
        tbody.innerHTML = '';
        data.hosts.forEach(host => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${host.ip || '---'}</td>
                <td>${host.mac || '---'}</td>
                <td>${host.vendor || '---'}</td>
                <td>${host.os || '---'}</td>
            `;
            tbody.appendChild(tr);
        });
        
        if (data.status === 'completed') {
            clearInterval(pollingInterval);
            statusText.textContent = 'Varredura Concluída!';
            statusText.classList.remove('blink');
            btnScan.style.display = 'inline-block';
            btnScan.textContent = '[ REINICIAR SCAN ]';
        } else if (data.status === 'scanning') {
            statusText.textContent = 'Varrendo rede...';
            statusText.classList.add('blink');
        }
        
    } catch (err) {
        console.error(err);
    }
}

// Wi-Fi Scanner Logic
const btnWifi = document.getElementById('btn-wifi');
const wifiTable = document.getElementById('wifi-table');
const wifiBody = document.getElementById('wifi-body');

btnWifi.addEventListener('click', async () => {
    btnWifi.textContent = '[ RASTREANDO... ]';
    btnWifi.classList.add('blink');
    
    try {
        const res = await fetch('/api/wifi');
        const data = await res.json();
        
        wifiBody.innerHTML = '';
        if (data.status === 'success' && data.networks.length > 0) {
            data.networks.forEach(net => {
                const tr = document.createElement('tr');
                let color = "var(--text-main)";
                if (parseInt(net.signal) < 40) color = "orange";
                if (parseInt(net.signal) < 20) color = "red";
                
                tr.innerHTML = `
                    <td style="color: ${color}"><strong>${net.ssid}</strong></td>
                    <td style="color: ${color}">${net.auth}</td>
                    <td style="color: ${color}">${net.signal}</td>
                `;
                wifiBody.appendChild(tr);
            });
            wifiTable.style.display = 'table';
        } else {
            alert('Nenhuma rede encontrada ou comando falhou.');
        }
    } catch (err) {
        alert('Erro ao buscar redes: ' + err);
    }
    
    btnWifi.textContent = '[ ATUALIZAR REDES ]';
    btnWifi.classList.remove('blink');
});

// Bluetooth Scanner Logic
const btnBt = document.getElementById('btn-bluetooth');
const btTable = document.getElementById('bt-table');
const btBody = document.getElementById('bt-body');

btnBt.addEventListener('click', async () => {
    btnBt.textContent = '[ RASTREANDO BLE... ]';
    btnBt.classList.add('blink');
    
    try {
        const res = await fetch('/api/bluetooth');
        const data = await res.json();
        
        if (data.status === 'success') {
            btBody.innerHTML = '';
            if (data.devices.length > 0) {
                data.devices.forEach(dev => {
                    const tr = document.createElement('tr');
                    let color = "var(--text-main)";
                    if (parseInt(dev.rssi) < -70) color = "orange";
                    if (parseInt(dev.rssi) < -90) color = "red";
                    
                    tr.innerHTML = `
                        <td style="color: ${color}"><strong>${dev.name}</strong></td>
                        <td style="color: ${color}">${dev.address}</td>
                        <td style="color: ${color}">${dev.rssi} dBm</td>
                    `;
                    btBody.appendChild(tr);
                });
                btTable.style.display = 'table';
            } else {
                alert('Nenhum dispositivo Bluetooth encontrado nas proximidades.');
            }
        } else {
            alert('Erro: ' + data.message);
        }
    } catch (err) {
        alert('Erro ao buscar Bluetooth: ' + err);
    }
    
    btnBt.textContent = '[ RASTREAR BLUETOOTH ]';
    btnBt.classList.remove('blink');
});

// --- NOVAS FUNCIONALIDADES ---

// Traffic Monitor Logic
const dlSpeed = document.getElementById('dl-speed');
const ulSpeed = document.getElementById('ul-speed');

async function pollTraffic() {
    try {
        const res = await fetch('/api/traffic');
        const data = await res.json();
        if (data.download_bps !== undefined) {
            dlSpeed.textContent = (data.download_bps / 1024).toFixed(2);
            ulSpeed.textContent = (data.upload_bps / 1024).toFixed(2);
        }
    } catch (err) {
        console.error('Traffic poll error:', err);
    }
}
setInterval(pollTraffic, 1000); // Polling 1s

// Ping Radar Logic
const btnPing = document.getElementById('btn-ping');
const pingTarget = document.getElementById('ping-target');
const pingOutput = document.getElementById('ping-output');

btnPing.addEventListener('click', async () => {
    const target = pingTarget.value.trim();
    if (!target) return alert("Digite um alvo válido.");
    
    pingOutput.textContent = `Disparando ping para ${target}...\n`;
    btnPing.disabled = true;
    
    try {
        const res = await fetch('/api/ping', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({target: target})
        });
        const data = await res.json();
        pingOutput.textContent += data.output;
    } catch (err) {
        pingOutput.textContent += "\nErro: " + err;
    }
    btnPing.disabled = false;
});

// Subnet Calculator Logic
const btnSubnet = document.getElementById('btn-subnet');
const subnetTarget = document.getElementById('subnet-target');
const subNet = document.getElementById('sub-net');
const subMask = document.getElementById('sub-mask');
const subBc = document.getElementById('sub-bc');
const subHosts = document.getElementById('sub-hosts');
const subRange = document.getElementById('sub-range');
const subnetOutput = document.getElementById('subnet-output');

btnSubnet.addEventListener('click', async () => {
    const cidr = subnetTarget.value.trim();
    if (!cidr) return alert("Digite um bloco CIDR (ex: 10.0.0.0/24).");
    
    try {
        const res = await fetch('/api/subnet', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cidr: cidr})
        });
        const data = await res.json();
        if (data.status === 'success') {
            subNet.textContent = data.network;
            subMask.textContent = data.netmask;
            subBc.textContent = data.broadcast;
            subHosts.textContent = data.num_hosts;
            subRange.textContent = `${data.min_ip} - ${data.max_ip}`;
            subnetOutput.style.display = 'block';
        } else {
            alert("Bloco inválido: " + data.message);
        }
    } catch (err) {
        alert("Erro: " + err);
    }
});

// Traceroute Map Logic
const btnTrace = document.getElementById('btn-trace');
const traceTarget = document.getElementById('trace-target');
const traceOutput = document.getElementById('trace-output');

btnTrace.addEventListener('click', async () => {
    const target = traceTarget.value.trim();
    if (!target) return alert("Digite um alvo válido para o traceroute.");
    
    traceOutput.textContent = `Iniciando rastreamento de rota para ${target}...\n(Aguarde, pode levar até 30 segundos)\n\n`;
    btnTrace.disabled = true;
    
    try {
        const res = await fetch('/api/traceroute', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({target: target})
        });
        const data = await res.json();
        traceOutput.textContent += data.output;
    } catch (err) {
        traceOutput.textContent += "\nErro: " + err;
    }
    btnTrace.disabled = false;
});
