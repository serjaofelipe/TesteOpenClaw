const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('best-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Game constants and state
const GRAVITY = 0.25;
const FLAP_SPEED = -5.5;
const PIPE_SPEED = 2.5;
const PIPE_SPAWN_RATE = 120; // frames
const PIPE_GAP = 140;

let frames = 0;
let score = 0;
let bestScore = localStorage.getItem('flappyBestScore') || 0;
let gameState = 'START'; // START, PLAYING, GAME_OVER

bestScoreEl.innerText = bestScore;

// Objects
const bird = {
    x: 50,
    y: 150,
    w: 34,
    h: 24,
    velocity: 0,
    rotation: 0,
    
    draw() {
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        
        // Calculate rotation based on velocity
        this.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.1)));
        ctx.rotate(this.rotation);
        
        // Draw Bird Body (Yellow Circle/Ellipse)
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.w/2, this.h/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h); // Retro border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(8, -4, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(10, -4, 2, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.rect(10, 2, 12, 8);
        ctx.fill();
        ctx.stroke();
        
        // Wing
        ctx.fillStyle = '#fff';
        const flapOffset = (frames % 10 < 5) ? -2 : 2; // Wing animation
        ctx.beginPath();
        ctx.ellipse(-5, flapOffset, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    },
    
    update() {
        this.velocity += GRAVITY;
        this.y += this.velocity;

        // Floor collision
        if (this.y + this.h / 2 >= canvas.height - floor.h) {
            this.y = canvas.height - floor.h - this.h / 2;
            setGameOver();
        }
        
        // Ceiling collision
        if (this.y - this.h / 2 <= 0) {
            this.y = this.h / 2;
            this.velocity = 0;
        }
    },
    
    flap() {
        this.velocity = FLAP_SPEED;
    },
    
    reset() {
        this.y = 150;
        this.velocity = 0;
        this.rotation = 0;
    }
};

const pipes = {
    items: [],
    w: 50,
    
    draw() {
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            
            // Top pipe
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(p.x, 0, this.w, p.top);
            ctx.strokeRect(p.x, 0, this.w, p.top);
            
            // Top pipe lip
            ctx.fillRect(p.x - 2, p.top - 20, this.w + 4, 20);
            ctx.strokeRect(p.x - 2, p.top - 20, this.w + 4, 20);
            
            // Bottom pipe
            ctx.fillRect(p.x, p.bottom, this.w, canvas.height - p.bottom - floor.h);
            ctx.strokeRect(p.x, p.bottom, this.w, canvas.height - p.bottom - floor.h);
            
            // Bottom pipe lip
            ctx.fillRect(p.x - 2, p.bottom, this.w + 4, 20);
            ctx.strokeRect(p.x - 2, p.bottom, this.w + 4, 20);
        }
    },
    
    update() {
        // Spawn pipes
        if (frames % PIPE_SPAWN_RATE === 0) {
            let topPosition = Math.max(50, Math.random() * (canvas.height - floor.h - PIPE_GAP - 50));
            this.items.push({
                x: canvas.width,
                top: topPosition,
                bottom: topPosition + PIPE_GAP,
                passed: false
            });
        }
        
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            p.x -= PIPE_SPEED;
            
            // Collision detection
            // Bounding box for bird
            const birdLeft = bird.x - bird.w / 2 + 5;
            const birdRight = bird.x + bird.w / 2 - 5;
            const birdTop = bird.y - bird.h / 2 + 5;
            const birdBottom = bird.y + bird.h / 2 - 5;
            
            if (birdRight > p.x && birdLeft < p.x + this.w) {
                if (birdTop < p.top || birdBottom > p.bottom) {
                    setGameOver();
                }
            }
            
            // Score update
            if (p.x + this.w < birdLeft && !p.passed) {
                score++;
                scoreEl.innerText = score;
                p.passed = true;
            }
            
            // Remove off-screen pipes
            if (p.x + this.w < 0) {
                this.items.shift();
                i--;
            }
        }
    },
    
    reset() {
        this.items = [];
    }
};

const floor = {
    h: 100,
    x: 0,
    
    draw() {
        ctx.fillStyle = '#ded895';
        ctx.fillRect(0, canvas.height - this.h, canvas.width, this.h);
        
        // Floor strip
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(0, canvas.height - this.h, canvas.width, 10);
        ctx.strokeRect(0, canvas.height - this.h, canvas.width, 10);
        
        // Moving pattern
        ctx.strokeStyle = '#c4b96a';
        ctx.lineWidth = 2;
        for (let i = 0; i < canvas.width / 20 + 2; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 20 + this.x, canvas.height - this.h + 10);
            ctx.lineTo(i * 20 - 10 + this.x, canvas.height);
            ctx.stroke();
        }
    },
    
    update() {
        this.x = (this.x - PIPE_SPEED) % 20;
    }
};

const clouds = {
    draw() {
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.5;
        // Simple static clouds
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, Math.PI * 2);
        ctx.arc(140, 100, 40, 0, Math.PI * 2);
        ctx.arc(180, 100, 30, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(300, 200, 20, 0, Math.PI * 2);
        ctx.arc(330, 200, 30, 0, Math.PI * 2);
        ctx.arc(360, 200, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

function setGameOver() {
    gameState = 'GAME_OVER';
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('flappyBestScore', bestScore);
        bestScoreEl.innerText = bestScore;
    }
    finalScoreEl.innerText = score;
    gameOverScreen.classList.add('active');
}

function resetGame() {
    bird.reset();
    pipes.reset();
    score = 0;
    scoreEl.innerText = score;
    frames = 0;
    gameOverScreen.classList.remove('active');
    gameState = 'START';
    startScreen.classList.add('active');
    draw(); // Redraw initial state
}

function update() {
    if (gameState !== 'PLAYING') return;
    
    bird.update();
    pipes.update();
    floor.update();
    frames++;
}

function draw() {
    // Clear canvas (Sky)
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    clouds.draw();
    pipes.draw();
    floor.draw();
    bird.draw();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Controls
function action() {
    if (gameState === 'START') {
        gameState = 'PLAYING';
        startScreen.classList.remove('active');
        bird.flap();
    } else if (gameState === 'PLAYING') {
        bird.flap();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (gameState !== 'GAME_OVER') action();
    }
});

canvas.addEventListener('mousedown', () => {
    if (gameState !== 'GAME_OVER') action();
});

restartBtn.addEventListener('click', () => {
    resetGame();
});

// Initialize
resetGame();
loop();
