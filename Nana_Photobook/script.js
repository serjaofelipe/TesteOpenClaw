document.addEventListener('DOMContentLoaded', () => {
    
    // LÓGICA DAS TABS (ABAS)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.gallery-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active das outras tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active na clicada
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');

            // Esconde as outras seções e mostra a correta
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // LÓGICA DO MODAL (IMAGEM EXPANDIDA)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".close-modal");

    const polaroids = document.querySelectorAll('.polaroid');

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            const img = polaroid.querySelector('img');
            const caption = polaroid.querySelector('.caption').textContent;
            
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = caption;
        });
    });

    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
