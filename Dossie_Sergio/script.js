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

    // --- Media Gallery with AI Context Captions ---
    const mediaFiles = [
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240309_235704.jpg', caption: 'Lembranças da Ana Clara' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240310_143647.jpg', caption: 'Momentos com o Caramelinho' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240310_221602.jpg', caption: 'Treino de Muay Thai / Saúde' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240312_143732.jpg', caption: 'No Quartel (Exército Brasileiro)' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240313_153105.jpg', caption: 'Saudade eterna da Lassie' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240314_094200.jpg', caption: 'Triathlon e Superação' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240319_232322.jpg', caption: 'Programando na Madrugada (Organnact)' },
        { type: 'img', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240321_231447.jpg', caption: 'Família: Helena e Sergio' },
        { type: 'img', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220304_101226.jpg', caption: 'A mulher mais incrível do universo' },
        { type: 'video', src: 'file:///C:/SERGIO%20BACKUP%2025/Camera/20240322_235700.mp4', caption: 'Registro de Projeto ESP32 / IoT' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220618_172603.mp4', caption: 'Vídeo: Babi e Tobias' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220618_174540.mp4', caption: 'Vídeo: Codando o App da URBS' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220621_143829.mp4', caption: 'Vídeo: Jogando God of War' },
        { type: 'video', src: 'file:///D:/SERGIO%20BACKUP%2024/Aleatorio/20220621_144528.mp4', caption: 'Vídeo: Jogando Black Ops 2' }
    ];

    const mediaGrid = document.getElementById('media-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    mediaFiles.forEach(media => {
        const item = document.createElement('div');
        item.className = 'media-item';
        
        if (media.type === 'img') {
            item.innerHTML = `
                <img src="${media.src}" loading="lazy" alt="Acervo">
                <div class="item-caption">${media.caption}</div>
            `;
            item.addEventListener('click', () => openLightbox(media.src, 'img', media.caption));
        } else {
            item.innerHTML = `
                <video src="${media.src}" muted></video>
                <i class="fas fa-play play-icon"></i>
                <div class="item-caption">${media.caption}</div>
            `;
            item.addEventListener('click', () => openLightbox(media.src, 'video', media.caption));
        }
        
        mediaGrid.appendChild(item);
    });

    function openLightbox(src, type, caption) {
        lightbox.classList.add('active');
        lightboxCaption.innerText = caption;
        
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

    // --- Matrix Background Effect ---
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(6, 9, 19, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffcc';
        ctx.font = fontSize + 'px Orbitron';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

});
