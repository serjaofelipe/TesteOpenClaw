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
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Activate clicked button
    const buttons = document.querySelectorAll('.nav-btn');
    if (sectionId === 'code-analysis') buttons[0].classList.add('active');
    else if (sectionId === 'wifi-analysis') buttons[1].classList.add('active');
    else if (sectionId === 'bluetooth-analysis') buttons[2].classList.add('active');
}

// Scanner Logic
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
        
        // Começa a pesquisar
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
        
        // Atualiza a tabela
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
