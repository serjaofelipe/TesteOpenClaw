const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

let frames = 0;
let score = 0;
let gameState = 'START'; // START, PLAYING, GAME_OVER
let reqAnimFrame;

// Physics and Settings
const gravity = 0.25;
const jumpForce = -5.5;
const speed = 2;

const bird = {
    x: 50,
    y: 150,
    w: 34,
    h: 24,
    velocity: 0,
    rotation: 0,
    draw: function() {
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y + this.h/2);
        this.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.1)));
        ctx.rotate(this.rotation);
        
        // Draw Bird (Yellow body)
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(4, -4, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(6, -4, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Lips / Beak
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.ellipse(10, 2, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Wing
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(-4, 2, 5, 3, Math.PI/4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    },
    update: function() {
        this.velocity += gravity;
        this.y += this.velocity;
        
        // Floor collision
        if (this.y + this.h/2 >= canvas.height - 112) {
            this.y = canvas.height - 112 - this.h/2;
            gameState = 'GAME_OVER';
        }
    },
    jump: function() {
        this.velocity = jumpForce;
    },
    reset: function() {
        this.y = 150;
        this.velocity = 0;
        this.rotation = 0;
    }
}

const pipes = {
    items: [],
    w: 52,
    gap: 120,
    dx: speed,
    draw: function() {
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            let topY = p.y;
            let bottomY = p.y + this.gap;

            // Draw Top Pipe
            ctx.fillStyle = '#73bf2e'; // Green
            ctx.fillRect(p.x, 0, this.w, topY);
            ctx.strokeRect(p.x, 0, this.w, topY);
            // Top Pipe Cap
            ctx.fillRect(p.x - 2, topY - 20, this.w + 4, 20);
            ctx.strokeRect(p.x - 2, topY - 20, this.w + 4, 20);

            // Draw Bottom Pipe
            ctx.fillRect(p.x, bottomY, this.w, canvas.height - bottomY - 112);
            ctx.strokeRect(p.x, bottomY, this.w, canvas.height - bottomY - 112);
            // Bottom Pipe Cap
            ctx.fillRect(p.x - 2, bottomY, this.w + 4, 20);
            ctx.strokeRect(p.x - 2, bottomY, this.w + 4, 20);
        }
    },
    update: function() {
        // Add new pipe every 100 frames
        if (frames % 100 === 0) {
            this.items.push({
                x: canvas.width,
                y: Math.floor(Math.random() * (canvas.height - 112 - this.gap - 40)) + 20,
                passed: false
            });
        }

        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            p.x -= this.dx;

            // Collision Detection
            // Top Pipe
            if (bird.x + bird.w/2 > p.x && bird.x - bird.w/2 < p.x + this.w && bird.y - bird.h/2 < p.y) {
                gameState = 'GAME_OVER';
            }
            // Bottom Pipe
            if (bird.x + bird.w/2 > p.x && bird.x - bird.w/2 < p.x + this.w && bird.y + bird.h/2 > p.y + this.gap) {
                gameState = 'GAME_OVER';
            }

            // Score update
            if (p.x + this.w < bird.x - bird.w/2 && !p.passed) {
                score++;
                scoreDisplay.innerText = score;
                p.passed = true;
            }

            // Remove pipes that went off screen
            if (p.x + this.w < 0) {
                this.items.shift();
                i--;
            }
        }
    },
    reset: function() {
        this.items = [];
    }
}

const ground = {
    x: 0,
    y: canvas.height - 112,
    w: canvas.width,
    h: 112,
    dx: speed,
    draw: function() {
        ctx.fillStyle = '#ded895'; // Sand color
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillRect(this.x + this.w, this.y, this.w, this.h);
        
        // Ground top line (grass)
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(this.x, this.y, this.w, 15);
        ctx.fillRect(this.x + this.w, this.y, this.w, 15);
        
        ctx.strokeStyle = '#558022';
        ctx.strokeRect(this.x, this.y, this.w, 15);
        ctx.strokeRect(this.x + this.w, this.y, this.w, 15);
    },
    update: function() {
        if (gameState === 'PLAYING') {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    }
}

function drawBackground() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw some simple clouds
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, Math.PI*2);
    ctx.arc(120, 90, 25, 0, Math.PI*2);
    ctx.arc(140, 100, 20, 0, Math.PI*2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(280, 150, 15, 0, Math.PI*2);
    ctx.arc(295, 145, 20, 0, Math.PI*2);
    ctx.arc(310, 150, 15, 0, Math.PI*2);
    ctx.fill();
}

function draw() {
    drawBackground();
    pipes.draw();
    ground.draw();
    bird.draw();
}

function update() {
    ground.update();
    if (gameState === 'PLAYING') {
        bird.update();
        pipes.update();
    }
}

function loop() {
    update();
    draw();
    frames++;

    if (gameState !== 'GAME_OVER') {
        reqAnimFrame = requestAnimationFrame(loop);
    } else {
        finalScore.innerText = `Score: ${score}`;
        gameOverScreen.classList.add('active');
        scoreDisplay.style.display = 'none';
    }
}

function resetGame() {
    bird.reset();
    pipes.reset();
    score = 0;
    scoreDisplay.innerText = score;
    frames = 0;
}

// Input Handlers
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (gameState === 'START') {
            gameState = 'PLAYING';
            startScreen.classList.remove('active');
            scoreDisplay.style.display = 'block';
        } else if (gameState === 'PLAYING') {
            bird.jump();
        }
    }
});

canvas.addEventListener('mousedown', () => {
    if (gameState === 'START') {
        gameState = 'PLAYING';
        startScreen.classList.remove('active');
        scoreDisplay.style.display = 'block';
    } else if (gameState === 'PLAYING') {
        bird.jump();
    }
});

restartBtn.addEventListener('click', () => {
    resetGame();
    gameState = 'PLAYING';
    gameOverScreen.classList.remove('active');
    scoreDisplay.style.display = 'block';
    loop();
});

// Init
draw();
