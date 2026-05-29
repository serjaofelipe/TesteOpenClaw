const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");

function openModal(imageSrc, altText) {
    modal.style.display = "block";
    // Slight delay to allow display block to register before adding opacity class
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
    modalImg.src = imageSrc;
    captionText.innerHTML = altText;
}

function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Matches CSS transition duration
}

// Close when clicking outside image
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Close on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
