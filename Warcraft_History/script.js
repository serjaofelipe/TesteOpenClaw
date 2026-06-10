// Base de dados mockada de personagens de cada jogo. Usando avatares genéricos de warcraft da internet
const charData = {
    "w1": [
        { name: "Anduin Lothar", lore: "O Leão de Azeroth. Liderou as tropas humanas de Stormwind durante a Primeira Guerra contra a invasão Orc. É uma lenda incontestável na história da Aliança.", img: "https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/3z/3ZR2A6XYW3Y01540866504543.png" },
        { name: "Llane Wrynn", lore: "O benevolente Rei de Stormwind durante a Primeira Guerra. Ele tentou defender seu reino, mas acabou sendo assassinado pela meia-orc Garona Halforcen, que estava sob o controle de Gul'dan.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/2b/2BTHZKVB0P081541011166415.png" },
        { name: "Orgrim Doomhammer", lore: "O destemido Chefe Guerreiro da Horda. Ele tomou o poder de Blackhand quando descobriu a corrupção do Shadow Council de Gul'dan, buscando restaurar a honra dos Orcs.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/3t/3T0T082T8U7W1541011166416.png" },
        { name: "Gul'dan", lore: "O primeiro orc bruxo (Warlock). Traiu seu próprio povo em troca do poder demoníaco da Legião Ardente, foi o fundador da Horda Orc e instigador da invasão a Azeroth.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/T7EMR8XXD4ZJ1541011166417.png" }
    ],
    "w2": [
        { name: "Turalyon", lore: "Um dos primeiros Paladinos. Assumiu o comando da Aliança de Lordaeron após a queda de Lothar, garantindo a vitória contra a Horda Orc. Ele liderou a expedição pelo Dark Portal e desapareceu em Outland.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/Z72J2GTY3E401541011166418.png" },
        { name: "Uther the Lightbringer", lore: "O primeiro Paladino dos Cavaleiros da Mão de Prata. Um grande líder e conselheiro da Aliança, e posteriormente mestre de Arthas Menethil.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/0I4OHTE0Z5U91541011166419.png" },
        { name: "Grommash Hellscream", lore: "Líder do clã Warsong. Conhecido por seu machado Gorehowl, Grom foi o primeiro a beber o sangue de Mannoroth, mas sua lenda vive como o Orc mais temido da batalha.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/N6V8V3U9H5H31541011166420.png" },
        { name: "Cho'gall", lore: "O Ogre Mago de duas cabeças e aprendiz de Gul'dan. Liderou o Twilight's Hammer e abraçou o caos dos Deuses Antigos (Old Gods).", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/L5W7Q4F6F6J81541011166421.png" }
    ],
    "w3roc": [
        { name: "Arthas Menethil", lore: "Príncipe coroado de Lordaeron e Paladino. Na sua busca obcecada para salvar seu povo, ele tomou a espada maldita Frostmourne, matando o próprio pai e destruindo seu reino como um Cavaleiro da Morte do Flagelo (Scourge).", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/64/64M0G66WUX431541011166422.png" },
        { name: "Thrall", lore: "Filho de Durotan. Escapou da escravidão humana, uniu os Orcs renegados, formou a nova Horda e os levou para a liberdade nas terras áridas de Kalimdor (Durotar).", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/O8/O8L7F8J3D5H31541011166423.png" },
        { name: "Jaina Proudmoore", lore: "Uma das feiticeiras mais poderosas de Dalaran. Após ver Arthas se corromper, Jaina seguiu os conselhos do Profeta e guiou os sobreviventes humanos para Kalimdor.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/1Q/1QU8U5X3A2H61541011166424.png" },
        { name: "Tyrande Whisperwind", lore: "A Alta Sacerdotisa de Elune. Despertou os druidas, incluindo seu amor Malfurion, para combater o retorno da Legião Ardente após 10.000 anos.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/3H/3H5C4U2N4S8G1541011166425.png" }
    ],
    "w3tft": [
        { name: "Illidan Stormrage", lore: "O Traidor. Caçador de Demônios exilado pelos Elfos Noturnos, ele consumiu o Crânio de Gul'dan para salvar a floresta, virando um meio-demônio. Ele fugiu para Outland e governou o Black Temple.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/5W/5WW8J8H7C6F51541011166426.png" },
        { name: "Sylvanas Windrunner", lore: "A outrora General Patrulheira de Quel'Thalas, Sylvanas foi morta por Arthas e ressuscitada como uma banshee. Após se libertar do controle do Rei Lich, ela liderou os Forsaken em Lordaeron.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/9F/9F7B3L6G4K2H1541011166427.png" },
        { name: "Kael'thas Sunstrider", lore: "Príncipe de Quel'Thalas. Com o reino dos Altos Elfos destruído pelo Flagelo, os sobreviventes viraram os Blood Elves (Elfos Sangrentos) viciados em magia. Kael'thas buscou aliança com Illidan para saciar a sede de magia de seu povo.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/2G/2GV6N8M3J6J41541011166428.png" },
        { name: "Maiev Shadowsong", lore: "Carcereira de Illidan. Com uma fúria incontrolável e desejo de vingança absoluta, Maiev caçou Illidan incansavelmente pelos confins do mundo até Outland.", img: "https://bnetcmsus-a.akamaihd.net/cms/page_media/1A/1A8N3B6V7C5X1541011166429.png" }
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
