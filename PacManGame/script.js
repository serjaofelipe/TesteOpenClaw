const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');
const winScreen = document.getElementById('win-screen');
const winScoreEl = document.getElementById('win-score');
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-level-btn');
const livesContainer = document.getElementById('lives-container');

// Map: 1 = Wall, 0 = Pellet, 2 = Empty, 3 = Power Pellet
const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1],
    [2,2,2,2,2,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,2,2,2,2,2],
    [2,2,2,2,2,1,0,1,1,2,1,1,1,2,2,1,1,1,2,1,1,0,1,2,2,2,2,2],
    [2,2,2,2,2,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,2,2,2,2,2],
    [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
    [2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2],
    [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
    [2,2,2,2,2,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,2,2,2,2,2],
    [2,2,2,2,2,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,2,2,2,2,2],
    [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const cellSize = 16;
let score = 0;
let highScore = localStorage.getItem('pacman_highscore') || 0;
highScoreEl.innerText = highScore;
let lives = 3;
let gameState = 'START'; // START, PLAYING, GAME_OVER, WIN
let reqAnimFrame;

// Entities
let pacman;
let ghosts = [];
let grid = [];
let pelletsLeft = 0;

class Boundary {
    constructor({position}) {
        this.position = position;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw() {
        ctx.fillStyle = '#1919A6';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Pellet {
    constructor({position, isPower}) {
        this.position = position;
        this.radius = isPower ? 5 : 2;
        this.isPower = isPower;
        this.eaten = false;
    }
    draw() {
        if (this.eaten) return;
        ctx.beginPath();
        ctx.arc(this.position.x + cellSize/2, this.position.y + cellSize/2, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFB8AE';
        ctx.fill();
        ctx.closePath();
    }
}

class PacMan {
    constructor({position}) {
        this.position = position;
        this.velocity = {x: 0, y: 0};
        this.radius = 7;
        this.speed = 2;
        this.angle = 0;
        this.mouthOpen = 0;
        this.mouthDir = 1;
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x + cellSize/2, this.position.y + cellSize/2);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        let open = this.mouthOpen * 0.2;
        ctx.arc(0, 0, this.radius, open * Math.PI, (2 - open) * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        // Wrap around
        if (this.position.x < -cellSize) this.position.x = canvas.width;
        if (this.position.x > canvas.width) this.position.x = -cellSize;
        
        // Mouth animation
        this.mouthOpen += 0.1 * this.mouthDir;
        if(this.mouthOpen >= 1 || this.mouthOpen <= 0) this.mouthDir *= -1;
    }
}

class Ghost {
    constructor({position, color}) {
        this.position = position;
        this.velocity = {x: 0, y: -1}; // starts moving up
        this.radius = 7;
        this.color = color;
        this.speed = 1.5;
        this.scared = false;
        this.scaredTimer = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x + cellSize/2, this.position.y + cellSize/2, this.radius, Math.PI, 0);
        ctx.lineTo(this.position.x + cellSize/2 + this.radius, this.position.y + cellSize/2 + this.radius);
        
        // Wavy bottom
        ctx.lineTo(this.position.x + cellSize/2 + this.radius/2, this.position.y + cellSize/2 + this.radius - 2);
        ctx.lineTo(this.position.x + cellSize/2, this.position.y + cellSize/2 + this.radius);
        ctx.lineTo(this.position.x + cellSize/2 - this.radius/2, this.position.y + cellSize/2 + this.radius - 2);
        
        ctx.lineTo(this.position.x + cellSize/2 - this.radius, this.position.y + cellSize/2 + this.radius);
        ctx.fillStyle = this.scared ? 'blue' : this.color;
        ctx.fill();
        ctx.closePath();
        
        // Eyes
        ctx.beginPath();
        ctx.arc(this.position.x + cellSize/2 - 2.5, this.position.y + cellSize/2 - 1, 2, 0, Math.PI * 2);
        ctx.arc(this.position.x + cellSize/2 + 2.5, this.position.y + cellSize/2 - 1, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.position.x + cellSize/2 - 2.5, this.position.y + cellSize/2 - 1, 1, 0, Math.PI * 2);
        ctx.arc(this.position.x + cellSize/2 + 2.5, this.position.y + cellSize/2 - 1, 1, 0, Math.PI * 2);
        ctx.fillStyle = this.scared ? 'yellow' : 'black';
        ctx.fill();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
        
        // Wrap around
        if (this.position.x < -cellSize) this.position.x = canvas.width;
        if (this.position.x > canvas.width) this.position.x = -cellSize;
        
        if (this.scared) {
            this.scaredTimer--;
            if (this.scaredTimer <= 0) this.scared = false;
        }
    }
}

let boundaries = [];
let pellets = [];
let keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false}
};
let lastKey = '';

function createLevel() {
    boundaries = [];
    pellets = [];
    ghosts = [];
    pelletsLeft = 0;
    
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            let pos = {x: j * cellSize, y: i * cellSize};
            if (symbol === 1) {
                boundaries.push(new Boundary({position: pos}));
            } else if (symbol === 0 || symbol === 3) {
                let isPower = symbol === 3;
                pellets.push(new Pellet({position: pos, isPower: isPower}));
                pelletsLeft++;
            }
        });
    });
    
    pacman = new PacMan({position: {x: 14 * cellSize, y: 23 * cellSize}});
    
    const ghostColors = ['red', 'pink', 'cyan', 'orange'];
    for(let i=0; i<4; i++) {
        ghosts.push(new Ghost({
            position: {x: (12 + i%2 * 2) * cellSize, y: 14 * cellSize},
            color: ghostColors[i]
        }));
    }
    updateLivesUI();
}

function updateLivesUI() {
    livesContainer.innerHTML = '';
    for(let i=0; i<lives; i++) {
        livesContainer.innerHTML += '<div class="life-icon"></div>';
    }
}

function checkCollision(circle, rectangle) {
    const padding = circle.radius - 1;
    return (
        circle.position.y - padding + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + cellSize/2 - padding + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + cellSize/2 - padding + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - padding + circle.velocity.x <= rectangle.position.x + rectangle.width
    );
}

function loop() {
    if (gameState !== 'PLAYING') return;
    
    reqAnimFrame = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check direction
    let pacVelocity = {x: 0, y: 0};
    if (keys.w.pressed && lastKey === 'w') { pacVelocity.y = -pacman.speed; pacman.angle = -Math.PI/2; }
    else if (keys.a.pressed && lastKey === 'a') { pacVelocity.x = -pacman.speed; pacman.angle = Math.PI; }
    else if (keys.s.pressed && lastKey === 's') { pacVelocity.y = pacman.speed; pacman.angle = Math.PI/2; }
    else if (keys.d.pressed && lastKey === 'd') { pacVelocity.x = pacman.speed; pacman.angle = 0; }
    
    // Check wall collisions for PacMan
    let collides = false;
    let tempPacMan = { ...pacman, velocity: pacVelocity };
    for (let i = 0; i < boundaries.length; i++) {
        if (checkCollision(tempPacMan, boundaries[i])) {
            collides = true;
            break;
        }
    }
    
    if (!collides) {
        pacman.velocity = pacVelocity;
    } else {
        // Stop pacman if hits wall
        pacman.velocity = {x: 0, y: 0};
    }
    
    boundaries.forEach(b => b.draw());
    
    // Pellets logic
    pellets.forEach(pellet => {
        pellet.draw();
        
        if (!pellet.eaten) {
            let dx = pacman.position.x + cellSize/2 - (pellet.position.x + cellSize/2);
            let dy = pacman.position.y + cellSize/2 - (pellet.position.y + cellSize/2);
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < pellet.radius + pacman.radius) {
                pellet.eaten = true;
                score += pellet.isPower ? 50 : 10;
                scoreEl.innerText = score;
                pelletsLeft--;
                
                if (pellet.isPower) {
                    ghosts.forEach(g => {
                        g.scared = true;
                        g.scaredTimer = 400; // frames
                    });
                }
                
                if (pelletsLeft === 0) {
                    // Win state
                    gameState = 'WIN';
                    winScoreEl.innerText = score;
                    winScreen.classList.add('active');
                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem('pacman_highscore', highScore);
                    }
                }
            }
        }
    });
    
    pacman.update();
    
    // Ghost Logic
    ghosts.forEach((ghost, i) => {
        // Very basic AI: Choose random valid direction at intersections
        let collisions = [];
        const directions = [
            {x: 1, y: 0, name: 'right'},
            {x: -1, y: 0, name: 'left'},
            {x: 0, y: 1, name: 'down'},
            {x: 0, y: -1, name: 'up'}
        ];
        
        directions.forEach(dir => {
            let tempG = { ...ghost, velocity: dir };
            let hits = false;
            for (let j = 0; j < boundaries.length; j++) {
                if (checkCollision(tempG, boundaries[j])) {
                    hits = true;
                    break;
                }
            }
            if (!hits) collisions.push(dir);
        });
        
        // Prevent going strictly backwards unless blocked
        if (collisions.length > 1) {
            collisions = collisions.filter(dir => {
                return !(dir.x === -ghost.velocity.x && dir.y === -ghost.velocity.y);
            });
        }
        
        if (collisions.length > 0) {
            // Pick a random valid direction if we are centered on a cell
            if (ghost.position.x % cellSize === 0 && ghost.position.y % cellSize === 0) {
                let r = Math.floor(Math.random() * collisions.length);
                ghost.velocity = collisions[r];
            }
        } else {
            ghost.velocity = {x: 0, y: 0};
        }
        
        ghost.update();
        
        // Check collision with pacman
        let dx = pacman.position.x - ghost.position.x;
        let dy = pacman.position.y - ghost.position.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < pacman.radius + ghost.radius) {
            if (ghost.scared) {
                // Eat ghost
                score += 200;
                scoreEl.innerText = score;
                ghost.position = {x: 14 * cellSize, y: 14 * cellSize};
                ghost.scared = false;
            } else {
                // Lose life
                lives--;
                updateLivesUI();
                if (lives <= 0) {
                    gameState = 'GAME_OVER';
                    finalScoreEl.innerText = score;
                    gameOverScreen.classList.add('active');
                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem('pacman_highscore', highScore);
                    }
                } else {
                    // Reset positions
                    pacman.position = {x: 14 * cellSize, y: 23 * cellSize};
                    pacman.velocity = {x:0, y:0};
                    pacman.angle = 0;
                    for(let k=0; k<4; k++) {
                        ghosts[k].position = {x: (12 + k%2 * 2) * cellSize, y: 14 * cellSize};
                    }
                }
            }
        }
    });
}

// Controls
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowUp':
        case 'KeyW':
            keys.w.pressed = true; lastKey = 'w'; break;
        case 'ArrowLeft':
        case 'KeyA':
            keys.a.pressed = true; lastKey = 'a'; break;
        case 'ArrowDown':
        case 'KeyS':
            keys.s.pressed = true; lastKey = 's'; break;
        case 'ArrowRight':
        case 'KeyD':
            keys.d.pressed = true; lastKey = 'd'; break;
        case 'Space':
            if (gameState === 'START') {
                gameState = 'PLAYING';
                startScreen.classList.remove('active');
                createLevel();
                loop();
            }
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'ArrowUp':
        case 'KeyW': keys.w.pressed = false; break;
        case 'ArrowLeft':
        case 'KeyA': keys.a.pressed = false; break;
        case 'ArrowDown':
        case 'KeyS': keys.s.pressed = false; break;
        case 'ArrowRight':
        case 'KeyD': keys.d.pressed = false; break;
    }
});

restartBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.innerText = score;
    lives = 3;
    gameState = 'PLAYING';
    gameOverScreen.classList.remove('active');
    createLevel();
    loop();
});

nextBtn.addEventListener('click', () => {
    gameState = 'PLAYING';
    winScreen.classList.remove('active');
    createLevel();
    loop();
});

// Initial draw before start
createLevel();
boundaries.forEach(b => b.draw());
pellets.forEach(p => p.draw());
pacman.draw();
ghosts.forEach(g => g.draw());
