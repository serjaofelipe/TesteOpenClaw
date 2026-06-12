document.addEventListener("DOMContentLoaded", () => {
    const exploreBtn = document.getElementById("exploreBtn");
    
    if(exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            const histSection = document.getElementById("historia");
            histSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Parallax simples
    window.addEventListener("scroll", () => {
        const overlay = document.querySelector(".overlay");
        const scrollVal = window.scrollY;
        overlay.style.transform = `translateY(${scrollVal * 0.3}px)`;
    });
});
