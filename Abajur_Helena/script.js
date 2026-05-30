document.addEventListener('DOMContentLoaded', () => {
    // Scroll Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito na Navbar ao rolar a página
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 12, 16, 0.95)';
            navbar.style.padding = '15px 50px';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(11, 12, 16, 0.8)';
            navbar.style.padding = '20px 50px';
            navbar.style.boxShadow = 'none';
        }
    });

    // Botão de Comprar (Apenas efeito visual para o mockup)
    const btnBuy = document.querySelector('.cta-btn');
    if (btnBuy) {
        btnBuy.addEventListener('click', () => {
            btnBuy.textContent = 'Processando...';
            btnBuy.style.opacity = '0.8';
            setTimeout(() => {
                btnBuy.textContent = 'Adicionado ao Carrinho! ✓';
                btnBuy.style.backgroundColor = '#10b981'; // Verde sucesso
                btnBuy.style.color = '#fff';
            }, 1500);
        });
    }
});
