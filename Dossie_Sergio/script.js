document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Navigation ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    // --- Media Gallery ---
    const mediaFiles = [
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240309_235704.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240310_143647.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240310_221602.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240312_143732.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240313_153105.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240314_094200.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240319_232322.jpg' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240321_231447.jpg' },
        { type: 'img', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220304_101226.jpg' },
        { type: 'video', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240322_235700.mp4' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220618_172603.mp4' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220618_174540.mp4' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220621_143829.mp4' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220621_144528.mp4' }
    ];

    const mediaGrid = document.getElementById('media-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    mediaFiles.forEach(media => {
        const item = document.createElement('div');
        item.className = 'media-item';
        
        if (media.type === 'img') {
            item.innerHTML = `<img src="${media.src}" loading="lazy">`;
            item.addEventListener('click', () => openLightbox(media.src, 'img'));
        } else {
            item.innerHTML = `<video src="${media.src}" muted></video><i class="fas fa-play"></i>`;
            item.addEventListener('click', () => openLightbox(media.src, 'video'));
        }
        
        mediaGrid.appendChild(item);
    });

    function openLightbox(src, type) {
        lightbox.classList.add('active');
        if (type === 'img') {
            lightboxImg.src = src;
            lightboxImg.classList.add('active');
            lightboxVideo.classList.remove('active');
            lightboxVideo.pause();
        } else {
            lightboxVideo.src = src;
            lightboxVideo.classList.add('active');
            lightboxImg.classList.remove('active');
            lightboxVideo.play();
        }
    }

    closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            lightboxVideo.pause();
        }
    });

    // --- Snake Game ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    
    const box = 20;
    let snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    
    let food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    
    let score = 0;
    let d;
    
    document.addEventListener('keydown', direction);
    
    function direction(event) {
        if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
        else if (event.keyCode == 38 && d != "DOWN") d = "UP";
        else if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
        else if (event.keyCode == 40 && d != "UP") d = "DOWN";
    }
    
    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "#00ffcc" : "#00aa88";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        
        ctx.fillStyle = "#7a00ff";
        ctx.fillRect(food.x, food.y, box, box);
        
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;
        
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            scoreElement.innerHTML = score;
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
        } else {
            snake.pop();
        }
        
        let newHead = { x: snakeX, y: snakeY };
        
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "red";
            ctx.font = "30px Orbitron";
            ctx.fillText("GAME OVER", 110, 200);
            ctx.font = "15px Orbitron";
            ctx.fillStyle = "white";
            ctx.fillText("Recarregue a página para jogar de novo.", 40, 240);
        }
        
        snake.unshift(newHead);
    }
    
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }
    
    let game = setInterval(draw, 100);

});
