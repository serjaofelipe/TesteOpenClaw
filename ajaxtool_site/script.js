// Simple smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mockup code animation
const timeElement = document.querySelector('.time');
if(timeElement) {
    setInterval(() => {
        const randomTime = Math.floor(Math.random() * 30) + 5;
        timeElement.textContent = randomTime + 'ms';
    }, 2000);
}
