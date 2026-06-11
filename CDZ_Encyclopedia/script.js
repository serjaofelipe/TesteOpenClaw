document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles.js
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ffffff", "#d4af37"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#d4af37", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // 2. Tab Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const tabs = document.querySelectorAll('.tab-content');
    const btnExplore = document.getElementById('btn-explore');

    function switchTab(targetId) {
        // Update Nav
        navLinks.forEach(link => {
            if(link.dataset.target === targetId) link.classList.add('active');
            else link.classList.remove('active');
        });
        // Update Sections
        tabs.forEach(tab => {
            if(tab.id === targetId) tab.classList.add('active');
            else tab.classList.remove('active');
        });
        window.scrollTo(0,0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(e.target.dataset.target);
        });
    });

    if(btnExplore) {
        btnExplore.addEventListener('click', () => switchTab('personagens'));
    }

    // 3. Render Characters
    const grid = document.getElementById('character-grid');
    const catBtns = document.querySelectorAll('.cat-btn');

    function formatImageName(name) {
        return name.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + '.jpg';
    }

    function renderCharacters(category) {
        grid.innerHTML = '';
        const chars = cdzData.personagens[category] || [];
        
        chars.forEach(char => {
            const card = document.createElement('div');
            card.className = 'char-card';
            
            const imgName = formatImageName(char.nome);
            const imgSrc = `images/${imgName}`;
            
            card.innerHTML = `
                <div class="char-img-wrap">
                    <img src="${imgSrc}" alt="${char.nome}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'><rect width=\\'200\\' height=\\'200\\' fill=\\'%231a1a3a\\'/><text x=\\'50%\\' y=\\'50%\\' font-family=\\'Arial\\' font-size=\\'20\\' fill=\\'%23D4AF37\\' text-anchor=\\'middle\\' dy=\\'.3em\\'>SEM FOTO</text></svg>'">
                </div>
                <h3>${char.nome}</h3>
                <p>${char.constelacao}</p>
            `;
            
            card.addEventListener('click', () => openModal(char, imgSrc));
            grid.appendChild(card);
        });
    }

    catBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            catBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderCharacters(e.target.dataset.cat);
        });
    });

    // Initial render
    renderCharacters('bronze');

    // 4. Modal Logic
    const modal = document.getElementById('character-modal');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(char, imgSrc) {
        document.getElementById('modal-name').textContent = char.nome;
        document.getElementById('modal-constellation').textContent = char.constelacao;
        document.getElementById('modal-bio').textContent = char.biografia;
        document.getElementById('modal-armor').textContent = char.armadura;
        
        const imgEl = document.getElementById('modal-img');
        imgEl.src = imgSrc;
        imgEl.onerror = () => {
             imgEl.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'><rect width='300' height='400' fill='%231a1a3a'/><text x='50%' y='50%' font-family='Arial' font-size='20' fill='%23D4AF37' text-anchor='middle' dy='.3em'>SEM FOTO</text></svg>";
        };

        const attacksUl = document.getElementById('modal-attacks');
        attacksUl.innerHTML = char.ataques.map(a => `<li>${a}</li>`).join('');

        const curiositiesUl = document.getElementById('modal-curiosities');
        curiositiesUl.innerHTML = char.curiosidades.map(c => `<li>${c}</li>`).join('');

        modal.style.display = 'block';
    }

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; }

    // 5. Render Arcs
    const timeline = document.getElementById('timeline');
    cdzData.arcos.forEach(arco => {
        timeline.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3 class="gold-text">${arco.titulo}</h3>
                    <p style="margin-top: 1rem; line-height: 1.5; color: #ccc;">${arco.descricao}</p>
                </div>
            </div>
        `;
    });

    // 6. Render Curiosities
    const curGrid = document.getElementById('curiosities-grid');
    cdzData.curiosidades.forEach(cur => {
        curGrid.innerHTML += `
            <div class="curiosity-card">
                <h3 class="gold-text" style="margin-bottom: 1rem;">${cur.titulo}</h3>
                <p style="line-height: 1.6; color: #ccc;">${cur.texto}</p>
            </div>
        `;
    });
});
