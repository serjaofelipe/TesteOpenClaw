// Lógica do Modal Viewer

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("expanded-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];
    
    // Seleciona todas as imagens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').innerText;
            
            modal.style.display = "block";
            // Timeout para permitir transição do opacity
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            modalImg.src = img.src;
            captionText.innerHTML = title;
        });
    });
    
    // Fechar modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // Tempo da transição CSS
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });
});