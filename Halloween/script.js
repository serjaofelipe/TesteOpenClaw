// Tilt effect on cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    });
});

// Play background audio on first interaction
let audioPlayed = false;
document.addEventListener('click', () => {
    if(!audioPlayed) {
        const audio = document.getElementById('bg-music');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio autoplay blocked", e));
        audioPlayed = true;
    }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Glitch sound effect on hero hover
const hero = document.getElementById('hero');
hero.addEventListener('mouseenter', () => {
    if(audioPlayed) {
        // Optional: Play a short scare sound or glitch sound here
    }
});