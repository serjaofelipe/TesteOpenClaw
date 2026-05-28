const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const winScreen = document.getElementById('win-screen');

const TILE_SIZE = 20;
const ROWS = 22;
const COLS = 20;

let score = 0;
let highScore = localStorage.getItem('pacmanHighScore') || 0;
highScoreEl.innerText = highScore;

let gameState = 'START'; // START, PLAYING, GAME_OVER, WIN
let animationId;

// 1: Parede, 0: Ponto, 2: Vazio, 3: Ghost Spawner
const mapTemplate = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,0,1,1,1,1],
    [2,2,2,1,0,1,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
    [1,1,1,1,0,1,2,1,1,3,3,1,1,2,1,0,1,1,1,1],
    [2,2,2,2,0,2,2,1,3,3,3,3,1,2,2,0,2,2,2,2],
    [1,1,1,1,0,1,2,1,1,1,1,1,1,2,1,0,1,1,1,1],
    [2,2,2,1,0,1,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
    [1,1,1,1,0,1,2,1,1,1,1,1,1,2,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

let map = [];
let dotsCount = 0;

function resetMap() {
    map = [];
    dotsCount = 0;
    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLS; c++) {
            row.push(mapTemplate[r][c]);
            if (mapTemplate[r][c] === 0) dotsCount++;
        }
        map.push(row);
    }
}

function drawMap() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (map[r][c] === 1) {
                ctx.fillStyle = '#1919A6'; // Blue walls
                ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            } else if (map[r][c] === 0) {
                ctx.fillStyle = '#ffb8ae'; // Dot color
                ctx.beginPath();
                ctx.arc(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

class Pacman {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = 10 * TILE_SIZE;
        this.y = 15 * TILE_SIZE;
        this.vx = 0;
        this.vy = 0;
        this.nextVx = 0;
        this.nextVy = 0;
        this.speed = 2;
        this.angle = 0;
        this.mouthOpen = 0;
        this.mouthDir = 1;
    }
    
    update() {
        // Mouth animation
        this.mouthOpen += 0.1 * this.mouthDir;
        if (this.mouthOpen >= 0.5 || this.mouthOpen <= 0) this.mouthDir *= -1;

        // Try to turn if we are exactly on a grid cell
        if (this.x % TILE_SIZE === 0 && this.y % TILE_SIZE === 0) {
            let nextCol = this.x / TILE_SIZE + (this.nextVx / this.speed);
            let nextRow = this.y / TILE_SIZE + (this.nextVy / this.speed);
            
            // Wrap around tunnel
            if (nextCol < 0) nextCol = COLS - 1;
            if (nextCol >= COLS) nextCol = 0;

            if (map[nextRow] && map[nextRow][nextCol] !== 1 && map[nextRow][nextCol] !== 3) {
                this.vx = this.nextVx;
                this.vy = this.nextVy;
                if (this.vx > 0) this.angle = 0;
                if (this.vx < 0) this.angle = Math.PI;
                if (this.vy > 0) this.angle = Math.PI / 2;
                if (this.vy < 0) this.angle = -Math.PI / 2;
            }
        }

        // Check collision for current direction
        let currentCol = this.x / TILE_SIZE;
        let currentRow = this.y / TILE_SIZE;
        
        let nextXCol = (this.x + this.vx) / TILE_SIZE;
        let nextYRow = (this.y + this.vy) / TILE_SIZE;

        let blocked = false;
        if (this.vx > 0 && map[currentRow][Math.floor(nextXCol) + 1] === 1 && (this.x % TILE_SIZE) >= 0) blocked = true;
        if (this.vx < 0 && map[currentRow][Math.ceil(nextXCol) - 1] === 1 && (this.x % TILE_SIZE) <= 0) blocked = true;
        if (this.vy > 0 && map[Math.floor(nextYRow) + 1] && map[Math.floor(nextYRow) + 1][currentCol] === 1 && (this.y % TILE_SIZE) >= 0) blocked = true;
        if (this.vy < 0 && map[Math.ceil(nextYRow) - 1] && map[Math.ceil(nextYRow) - 1][currentCol] === 1 && (this.y % TILE_SIZE) <= 0) blocked = true;

        if (!blocked) {
            this.x += this.vx;
            this.y += this.vy;
            
            // Tunnel wrap
            if (this.x < -TILE_SIZE) this.x = canvas.width;
            if (this.x > canvas.width) this.x = -TILE_SIZE;
        }

        // Eat dot
        let centerCol = Math.floor((this.x + TILE_SIZE/2) / TILE_SIZE);
        let centerRow = Math.floor((this.y + TILE_SIZE/2) / TILE_SIZE);
        if (centerRow >= 0 && centerRow < ROWS && centerCol >= 0 && centerCol < COLS) {
            if (map[centerRow][centerCol] === 0) {
                map[centerRow][centerCol] = 2; // set empty
                score += 10;
                scoreEl.innerText = score;
                dotsCount--;
                if (dotsCount <= 0) {
                    winGame();
                }
            }
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x + TILE_SIZE/2, this.y + TILE_SIZE/2);
        ctx.rotate(this.angle);
        
        ctx.fillStyle = '#ffff00'; // Yellow
        ctx.beginPath();
        // Arc from mouthOpen to 2PI - mouthOpen
        ctx.arc(0, 0, TILE_SIZE/2 - 2, this.mouthOpen * Math.PI, (2 - this.mouthOpen) * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.restore();
    }
}

class Ghost {
    constructor(color, xCol, yRow) {
        this.color = color;
        this.startCol = xCol;
        this.startRow = yRow;
        this.reset();
    }
    
    reset() {
        this.x = this.startCol * TILE_SIZE;
        this.y = this.startRow * TILE_SIZE;
        this.vx = 2;
        this.vy = 0;
        this.speed = 2;
    }
    
    update() {
        // Ghost very basic AI: Move until wall, then pick random valid direction
        if (this.x % TILE_SIZE === 0 && this.y % TILE_SIZE === 0) {
            let possibleDirs = [];
            let currentCol = this.x / TILE_SIZE;
            let currentRow = this.y / TILE_SIZE;
            
            let dirs = [[2,0], [-2,0], [0,2], [0,-2]]; // vx, vy
            // Avoid reversing immediately unless stuck
            let safeDirs = [];

            for (let d of dirs) {
                let nc = currentCol + (d[0]/2);
                let nr = currentRow + (d[1]/2);
                
                // Wrap tunnel
                if (nc < 0) nc = COLS - 1;
                if (nc >= COLS) nc = 0;

                if (map[nr] && map[nr][nc] !== 1) {
                    possibleDirs.push(d);
                    if (d[0] !== -this.vx && d[1] !== -this.vy) {
                        safeDirs.push(d);
                    }
                }
            }
            
            let chosen = safeDirs.length > 0 ? safeDirs[Math.floor(Math.random() * safeDirs.length)] : possibleDirs[0];
            if (chosen) {
                this.vx = chosen[0];
                this.vy = chosen[1];
            }
        }
        
        this.x += this.vx;
        this.y += this.vy;

        // Tunnel
        if (this.x < -TILE_SIZE) this.x = canvas.width;
        if (this.x > canvas.width) this.x = -TILE_SIZE;

        // Check collision with pacman
        let dist = Math.hypot(this.x - pacman.x, this.y - pacman.y);
        if (dist < TILE_SIZE - 4) {
            loseGame();
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let cx = this.x + TILE_SIZE/2;
        let cy = this.y + TILE_SIZE/2;
        let r = TILE_SIZE/2 - 2;
        
        // Ghost shape (semi circle top, zig zag bottom)
        ctx.arc(cx, cy - 2, r, Math.PI, 0);
        ctx.lineTo(cx + r, cy + r);
        ctx.lineTo(cx + r/3, cy + r - 3);
        ctx.lineTo(cx, cy + r);
        ctx.lineTo(cx - r/3, cy + r - 3);
        ctx.lineTo(cx - r, cy + r);
        ctx.closePath();
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(cx - 3, cy - 4, 3, 0, Math.PI*2);
        ctx.arc(cx + 3, cy - 4, 3, 0, Math.PI*2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = 'blue';
        let lookX = (this.vx > 0) ? 1 : (this.vx < 0 ? -1 : 0);
        let lookY = (this.vy > 0) ? 1 : (this.vy < 0 ? -1 : 0);
        ctx.beginPath();
        ctx.arc(cx - 3 + lookX, cy - 4 + lookY, 1.5, 0, Math.PI*2);
        ctx.arc(cx + 3 + lookX, cy - 4 + lookY, 1.5, 0, Math.PI*2);
        ctx.fill();
    }
}

const pacman = new Pacman();
const ghosts = [
    new Ghost('#ff0000', 9, 9), // Blinky
    new Ghost('#ffb8ff', 10, 9), // Pinky
    new Ghost('#00ffff', 9, 10), // Inky
    new Ghost('#ffb852', 10, 10) // Clyde
];

function checkHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('pacmanHighScore', highScore);
        highScoreEl.innerText = highScore;
    }
}

function loseGame() {
    gameState = 'GAME_OVER';
    checkHighScore();
    gameOverScreen.classList.add('active');
}

function winGame() {
    gameState = 'WIN';
    checkHighScore();
    winScreen.classList.add('active');
}

function resetGame(keepScore = false) {
    if (!keepScore) {
        score = 0;
        scoreEl.innerText = score;
        resetMap();
    } else {
        resetMap(); // Restore dots for next level
    }
    pacman.reset();
    ghosts.forEach(g => g.reset());
    
    startScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    winScreen.classList.remove('active');
    gameState = 'PLAYING';
}

window.addEventListener('keydown', (e) => {
    if (gameState === 'PLAYING') {
        if (e.key === 'ArrowLeft') { pacman.nextVx = -pacman.speed; pacman.nextVy = 0; }
        if (e.key === 'ArrowRight') { pacman.nextVx = pacman.speed; pacman.nextVy = 0; }
        if (e.key === 'ArrowUp') { pacman.nextVx = 0; pacman.nextVy = -pacman.speed; }
        if (e.key === 'ArrowDown') { pacman.nextVx = 0; pacman.nextVy = pacman.speed; }
    } else if (e.key === ' ') {
        if (gameState === 'START' || gameState === 'GAME_OVER') {
            resetGame(false);
        } else if (gameState === 'WIN') {
            resetGame(true);
        }
    }
});

document.getElementById('restart-btn').addEventListener('click', () => resetGame(false));
document.getElementById('next-level-btn').addEventListener('click', () => resetGame(true));

function gameLoop() {
    // Clear
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gameState === 'START') {
        resetMap();
        drawMap();
    } else if (gameState === 'PLAYING' || gameState === 'GAME_OVER' || gameState === 'WIN') {
        if (gameState === 'PLAYING') {
            pacman.update();
            ghosts.forEach(g => g.update());
        }
        drawMap();
        pacman.draw();
        ghosts.forEach(g => g.draw());
    }

    animationId = requestAnimationFrame(gameLoop);
}

// Start visual loop immediately
resetMap();
gameLoop();
