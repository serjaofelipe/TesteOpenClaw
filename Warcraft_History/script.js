const charData = {
    "w1": [
        { name: "Anduin Lothar", lore: "O Leão de Azeroth. Liderou as tropas humanas de Stormwind durante a Primeira Guerra contra a invasão Orc. É uma lenda incontestável na história da Aliança.", img: "images/w1_lothar.png" },
        { name: "Llane Wrynn", lore: "O benevolente Rei de Stormwind durante a Primeira Guerra. Ele tentou defender seu reino, mas acabou sendo assassinado pela meia-orc Garona Halforcen, que estava sob o controle de Gul'dan.", img: "images/w1_llane.png" },
        { name: "Orgrim Doomhammer", lore: "O destemido Chefe Guerreiro da Horda. Ele tomou o poder de Blackhand quando descobriu a corrupção do Shadow Council de Gul'dan, buscando restaurar a honra dos Orcs.", img: "images/w1_orgrim.png" },
        { name: "Gul'dan", lore: "O primeiro orc bruxo (Warlock). Traiu seu próprio povo em troca do poder demoníaco da Legião Ardente, foi o fundador da Horda Orc e instigador da invasão a Azeroth.", img: "images/w1_guldan.png" }
    ],
    "w2": [
        { name: "Turalyon", lore: "Um dos primeiros Paladinos. Assumiu o comando da Aliança de Lordaeron após a queda de Lothar, garantindo a vitória contra a Horda Orc. Ele liderou a expedição pelo Dark Portal e desapareceu em Outland.", img: "images/w2_turalyon.png" },
        { name: "Uther the Lightbringer", lore: "O primeiro Paladino dos Cavaleiros da Mão de Prata. Um grande líder e conselheiro da Aliança, e posteriormente mestre de Arthas Menethil.", img: "images/w2_uther.png" },
        { name: "Grommash Hellscream", lore: "Líder do clã Warsong. Conhecido por seu machado Gorehowl, Grom foi o primeiro a beber o sangue de Mannoroth, mas sua lenda vive como o Orc mais temido da batalha.", img: "images/w2_grommash.png" },
        { name: "Cho'gall", lore: "O Ogre Mago de duas cabeças e aprendiz de Gul'dan. Liderou o Twilight's Hammer e abraçou o caos dos Deuses Antigos (Old Gods).", img: "images/w2_chogall.png" }
    ],
    "w3roc": [
        { name: "Arthas Menethil", lore: "Príncipe coroado de Lordaeron e Paladino. Na sua busca obcecada para salvar seu povo, ele tomou a espada maldita Frostmourne, matando o próprio pai e destruindo seu reino como um Cavaleiro da Morte do Flagelo (Scourge).", img: "images/w3_arthas.png" },
        { name: "Thrall", lore: "Filho de Durotan. Escapou da escravidão humana, uniu os Orcs renegados, formou a nova Horda e os levou para a liberdade nas terras áridas de Kalimdor (Durotar).", img: "images/w3_thrall.png" },
        { name: "Jaina Proudmoore", lore: "Uma das feiticeiras mais poderosas de Dalaran. Após ver Arthas se corromper, Jaina seguiu os conselhos do Profeta e guiou os sobreviventes humanos para Kalimdor.", img: "images/w3_jaina.png" },
        { name: "Tyrande Whisperwind", lore: "A Alta Sacerdotisa de Elune. Despertou os druidas, incluindo seu amor Malfurion, para combater o combater o retorno da Legião Ardente após 10.000 anos.", img: "images/w3_tyrande.png" }
    ],
    "w3tft": [
        { name: "Illidan Stormrage", lore: "O Traidor. Caçador de Demônios exilado pelos Elfos Noturnos, ele consumiu o Crânio de Gul'dan para salvar a floresta, virando um meio-demônio. Ele fugiu para Outland e governou o Black Temple.", img: "images/w3_illidan.png" },
        { name: "Sylvanas Windrunner", lore: "A outrora General Patrulheira de Quel'Thalas, Sylvanas foi morta por Arthas e ressuscitada como uma banshee. Após se libertar do controle do Rei Lich, ela liderou os Forsaken em Lordaeron.", img: "images/w3_sylvanas.png" },
        { name: "Kael'thas Sunstrider", lore: "Príncipe de Quel'Thalas. Com o reino dos Altos Elfos destruído pelo Flagelo, os sobreviventes viraram os Blood Elves (Elfos Sangrentos) viciados em magia. Kael'thas buscou aliança com Illidan para saciar a sede de magia de seu povo.", img: "images/w3_kaelthas.png" },
        { name: "Maiev Shadowsong", lore: "Carcereira de Illidan. Com uma fúria incontrolável e desejo de vingança absoluta, Maiev caçou Illidan incansavelmente pelos confins do mundo até Outland.", img: "images/w3_maiev.png" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza Personagens
    function renderGrid(containerId, dataKey) {
        const container = document.getElementById(containerId);
        if(!container) return;

        charData[dataKey].forEach(char => {
            const card = document.createElement('div');
            card.className = 'char-card';
            card.innerHTML = `
                <img src="${char.img}" alt="${char.name}" onerror="this.src='https://via.placeholder.com/100/000000/d4af37?text=WC'">
                <p>${char.name}</p>
            `;
            card.addEventListener('click', () => openModal(char));
            container.appendChild(card);
        });
    }

    renderGrid('char-grid-w1', 'w1');
    renderGrid('char-grid-w2', 'w2');
    renderGrid('char-grid-w3roc', 'w3roc');
    renderGrid('char-grid-w3tft', 'w3tft');

    // Lógica das Tabs (Menu Vertical)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const bgLayer = document.getElementById('dynamic-bg');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            
            // Ativa o botão
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Exibe o conteúdo correto
            tabContents.forEach(c => c.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // Muda o background
            bgLayer.className = `bg-${targetId}`;

            // Adiciona classe de Gelo se for o Frozen Throne
            if(targetId === 'warcraft3-tft') {
                document.body.classList.add('theme-frost');
            } else {
                document.body.classList.remove('theme-frost');
            }
        });
    });

    // Lógica do Modal
    const modal = document.getElementById('char-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImg = document.getElementById('modal-char-img');
    const modalName = document.getElementById('modal-char-name');
    const modalLore = document.getElementById('modal-char-lore');

    function openModal(char) {
        modalImg.src = char.img;
        modalName.textContent = char.name;
        modalLore.textContent = char.lore;
        modal.classList.add('show');
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
