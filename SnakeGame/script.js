// ELEMENTOS DA DOM
const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('error-msg');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const gameOverOverlay = document.getElementById('game-over-overlay');
const restartBtn = document.getElementById('restart-btn');

// SISTEMA DE LOGIN
loginBtn.addEventListener('click', () => {
    const user = usernameInput.value;
    const pass = passwordInput.value;

    if (user === 'Teste' && pass === '123') {
        loginContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        initGame();
    } else {
        errorMsg.textContent = 'Usuário ou senha incorretos!';
    }
});

// CONFIGURAÇÕES DO JOGO
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let dx = 0;
let dy = 0;
let foodX = 0;
let foodY = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoopId;
let gameSpeed = 100;

highScoreElement.textContent = highScore;

// INICIALIZA O JOGO
function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 }
    ];
    dx = 0;
    dy = -1;
    score = 0;
    gameSpeed = 100;
    scoreElement.textContent = score;
    gameOverOverlay.style.display = 'none';
    spawnFood();
    if (gameLoopId) clearTimeout(gameLoopId);
    gameLoop();
}

// LOOP DO JOGO
function gameLoop() {
    if (checkCollision()) {
        gameOver();
        return;
    }

    clearCanvas();
    drawMap();
    drawFood();
    moveSnake();
    drawSnake();

    gameLoopId = setTimeout(gameLoop, gameSpeed);
}

// DESENHA O MAPA VASTO E BONITO
function drawMap() {
    for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillStyle = '#1e293b'; // Cor 1 do tabuleiro
            } else {
                ctx.fillStyle = '#0f172a'; // Cor 2 do tabuleiro
            }
            ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }
}

// LIMPA O CANVAS
function clearCanvas() {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// GERA A FRUTINHA (Maçã Moderna)
function spawnFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    
    // Evita spawn em cima da cobra
    snake.forEach(part => {
        if (part.x === foodX && part.y === foodY) {
            spawnFood();
        }
    });
}

function drawFood() {
    const x = foodX * gridSize + gridSize / 2;
    const y = foodY * gridSize + gridSize / 2;
    const radius = gridSize / 2 - 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ef4444'; // Vermelho Maçã
    ctx.fill();
    ctx.closePath();
    
    // Detalhe brilhante na maçã
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, radius / 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
    ctx.closePath();
    
    // Folhinha da maçã
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.quadraticCurveTo(x + 5, y - radius - 5, x, y - radius - 2);
    ctx.fillStyle = '#22c55e';
    ctx.fill();
    ctx.closePath();
}

// MOVIMENTAÇÃO DA COBRA
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Verifica se comeu a fruta
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreElement.textContent = score;
        if (gameSpeed > 50) gameSpeed -= 2; // Aumenta dificuldade
        spawnFood();
    } else {
        snake.pop(); // Remove cauda se não comeu
    }
}

// DESENHO DA COBRA PERFEITA E MODERNA
function drawSnake() {
    snake.forEach((part, index) => {
        const isHead = index === 0;
        const x = part.x * gridSize;
        const y = part.y * gridSize;

        if (isHead) {
            // Cabeça arredondada e mais escura
            ctx.fillStyle = '#059669';
            ctx.beginPath();
            ctx.roundRect(x, y, gridSize, gridSize, 8);
            ctx.fill();

            // Olhos
            ctx.fillStyle = 'white';
            const eyeOffset = 4;
            const eyeSize = 4;
            const pupilSize = 2;

            ctx.beginPath();
            if (dx === 1) { // Direita
                ctx.arc(x + gridSize - eyeOffset, y + eyeOffset, eyeSize, 0, 2*Math.PI);
                ctx.arc(x + gridSize - eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, 2*Math.PI);
            } else if (dx === -1) { // Esquerda
                ctx.arc(x + eyeOffset, y + eyeOffset, eyeSize, 0, 2*Math.PI);
                ctx.arc(x + eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, 2*Math.PI);
            } else if (dy === 1) { // Baixo
                ctx.arc(x + eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, 2*Math.PI);
                ctx.arc(x + gridSize - eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, 2*Math.PI);
            } else { // Cima (default)
                ctx.arc(x + eyeOffset, y + eyeOffset, eyeSize, 0, 2*Math.PI);
                ctx.arc(x + gridSize - eyeOffset, y + eyeOffset, eyeSize, 0, 2*Math.PI);
            }
            ctx.fill();
            
            // Pupilas (Preto)
            ctx.fillStyle = 'black';
            ctx.beginPath();
            if (dx === 1) { 
                ctx.arc(x + gridSize - eyeOffset + 1, y + eyeOffset, pupilSize, 0, 2*Math.PI);
                ctx.arc(x + gridSize - eyeOffset + 1, y + gridSize - eyeOffset, pupilSize, 0, 2*Math.PI);
            } else if (dx === -1) { 
                ctx.arc(x + eyeOffset - 1, y + eyeOffset, pupilSize, 0, 2*Math.PI);
                ctx.arc(x + eyeOffset - 1, y + gridSize - eyeOffset, pupilSize, 0, 2*Math.PI);
            } else if (dy === 1) { 
                ctx.arc(x + eyeOffset, y + gridSize - eyeOffset + 1, pupilSize, 0, 2*Math.PI);
                ctx.arc(x + gridSize - eyeOffset, y + gridSize - eyeOffset + 1, pupilSize, 0, 2*Math.PI);
            } else { 
                ctx.arc(x + eyeOffset, y + eyeOffset - 1, pupilSize, 0, 2*Math.PI);
                ctx.arc(x + gridSize - eyeOffset, y + eyeOffset - 1, pupilSize, 0, 2*Math.PI);
            }
            ctx.fill();

        } else {
            // Corpo com gradiente de tamanho e cor
            const colorRatio = index / snake.length;
            ctx.fillStyle = `hsl(158, 80%, ${45 + (colorRatio * 20)}%)`; // Degrade suave
            
            // Faz o corpo afinar levemente pro fim
            const padding = Math.min(index * 0.2, 4); 
            ctx.beginPath();
            ctx.roundRect(x + padding, y + padding, gridSize - padding*2, gridSize - padding*2, 5);
            ctx.fill();
        }
    });
}

// VERIFICA COLISÕES
function checkCollision() {
    const head = snake[0];
    
    // Bateu na parede
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // Bateu no próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// FIM DE JOGO
function gameOver() {
    gameOverOverlay.style.display = 'flex';
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
}

restartBtn.addEventListener('click', initGame);

// CONTROLES
document.addEventListener('keydown', (e) => {
    // Impede rolar a tela com as setas
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && dy !== 1) {
        dx = 0; dy = -1;
    } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && dy !== -1) {
        dx = 0; dy = 1;
    } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && dx !== 1) {
        dx = -1; dy = 0;
    } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && dx !== -1) {
        dx = 1; dy = 0;
    }
});
