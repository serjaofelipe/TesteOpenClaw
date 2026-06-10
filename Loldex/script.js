const grid = document.getElementById('champion-grid');
const searchInput = document.getElementById('search-input');
const loading = document.getElementById('loading');

// Modal elements
const modal = document.getElementById('champion-modal');
const closeBtn = document.querySelector('.close-btn');
const modalHeader = document.getElementById('modal-header');
const champNameEl = document.getElementById('champ-name');
const champTitleEl = document.getElementById('champ-title');
const champLoreEl = document.getElementById('champ-lore');
const champAbilitiesEl = document.getElementById('champ-abilities');
const buildLinksEl = document.getElementById('build-links');
const genericTipsEl = document.getElementById('generic-tips');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

let currentVersion = '14.10.1'; // Fallback version
let championsData = {};
let championsArray = [];

// Inicialização
async function init() {
    try {
        // 1. Pega a versão mais recente da API
        const versionRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await versionRes.json();
        currentVersion = versions[0];
        
        // 2. Busca a lista de campeões
        const champsRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/pt_BR/champion.json`);
        const champsJson = await champsRes.json();
        championsData = champsJson.data;
        
        // Converte o objeto em array e ordena alfabeticamente
        championsArray = Object.values(championsData).sort((a, b) => a.name.localeCompare(b.name));
        
        loading.style.display = 'none';
        renderChampions(championsArray);
        
    } catch (error) {
        console.error("Erro ao carregar dados da Riot API:", error);
        loading.textContent = "Erro ao carregar os dados. Verifique sua conexão.";
    }
}

// Renderiza a grade de campeões
function renderChampions(champs) {
    grid.innerHTML = '';
    
    champs.forEach(champ => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.dataset.id = champ.id;
        
        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champ.image.full}`;
        
        card.innerHTML = `
            <img src="${iconUrl}" alt="${champ.name}" loading="lazy">
            <div class="champion-name">${champ.name}</div>
        `;
        
        card.addEventListener('click', () => openChampionDetails(champ.id));
        grid.appendChild(card);
    });
}

// Filtro de Busca
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = championsArray.filter(champ => 
        champ.name.toLowerCase().includes(term) || 
        champ.title.toLowerCase().includes(term)
    );
    renderChampions(filtered);
});

// Abre o Modal com os Detalhes Completos (fazendo um novo fetch pro endpoint especifico do champ)
async function openChampionDetails(championId) {
    // Reseta abas
    setActiveTab('lore');
    
    try {
        // Busca os dados completos do campeão específico (que contem habilidades, lore completa, etc)
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/pt_BR/champion/${championId}.json`);
        const json = await res.json();
        const champ = json.data[championId];
        
        // Preenche Cabeçalho
        const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;
        modalHeader.style.backgroundImage = `url('${splashUrl}')`;
        champNameEl.textContent = champ.name;
        champTitleEl.textContent = champ.title;
        
        // Preenche Lore
        champLoreEl.innerHTML = champ.lore.replace(/\n/g, '<br><br>');
        
        // Preenche Habilidades
        champAbilitiesEl.innerHTML = '';
        
        // Passiva
        const passiveIcon = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/passive/${champ.passive.image.full}`;
        champAbilitiesEl.innerHTML += `
            <div class="ability-item">
                <img src="${passiveIcon}" class="ability-icon" alt="${champ.passive.name}">
                <div class="ability-info">
                    <span class="ability-key">PASSIVA</span>
                    <h4>${champ.passive.name}</h4>
                    <p>${champ.passive.description}</p>
                </div>
            </div>
        `;
        
        // Q, W, E, R
        const keys = ['Q', 'W', 'E', 'R'];
        champ.spells.forEach((spell, index) => {
            const spellIcon = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${spell.image.full}`;
            champAbilitiesEl.innerHTML += `
                <div class="ability-item">
                    <img src="${spellIcon}" class="ability-icon" alt="${spell.name}">
                    <div class="ability-info">
                        <span class="ability-key">${keys[index]}</span>
                        <h4>${spell.name}</h4>
                        <p>${spell.description}</p>
                    </div>
                </div>
            `;
        });
        
        // Preenche Builds/Runas (Links dinâmicos + Dicas por classe)
        const champSlug = champ.name.toLowerCase().replace(/[^a-z0-9]/g, ''); // Simplificado
        buildLinksEl.innerHTML = `
            <a href="https://op.gg/champions/${champSlug}/build" target="_blank" class="build-link-btn">Ver no OP.GG</a>
            <a href="https://u.gg/lol/champions/${champSlug}/build" target="_blank" class="build-link-btn ugg">Ver no U.GG</a>
        `;
        
        // Dica genérica baseada nas tags do campeão (Fighter, Tank, Mage, Assassin, Support, Marksman)
        const tags = champ.tags;
        let tipsHtml = `<h4>Dicas Gerais para ${tags.join(' / ')}:</h4><ul>`;
        
        if (tags.includes('Marksman')) {
            tipsHtml += `<li><strong>Itens:</strong> Foco em Dano de Ataque (AD), Velocidade de Ataque e Acerto Crítico (ex: Mata-Cráquens, Gume do Infinito).</li>
                         <li><strong>Runas comuns:</strong> Ritmo Fatal, Pressione o Ataque ou Agilidade nos Pés.</li>`;
        }
        if (tags.includes('Mage')) {
            tipsHtml += `<li><strong>Itens:</strong> Foco em Poder de Habilidade (AP), Mana e Penetração Mágica (ex: Companheiro de Luden, Chama Sombria).</li>
                         <li><strong>Runas comuns:</strong> Eletrocutar, Cometa Arcano ou Ímpeto Gradual.</li>`;
        }
        if (tags.includes('Assassin')) {
            tipsHtml += `<li><strong>Itens:</strong> Foco em Letalidade ou AP Burst, dependendo do tipo do assassino (ex: Lâmina Fantasma de Youmuu, Ampulheta de Zhonya).</li>
                         <li><strong>Runas comuns:</strong> Eletrocutar, Colheita Sombria ou Primeiro Ataque.</li>`;
        }
        if (tags.includes('Tank')) {
            tipsHtml += `<li><strong>Itens:</strong> Foco em Vida, Armadura e Resistência Mágica (ex: Égide de Fogo Solar, Coração Congelado).</li>
                         <li><strong>Runas comuns:</strong> Aperto dos Mortos-Vivos, Pós-choque.</li>`;
        }
        if (tags.includes('Fighter')) {
            tipsHtml += `<li><strong>Itens:</strong> Mistura de Dano e Sobrevivência (ex: Força da Trindade, Sinal de Sterak, Céu Dividido).</li>
                         <li><strong>Runas comuns:</strong> Conquistador.</li>`;
        }
        if (tags.includes('Support')) {
            tipsHtml += `<li><strong>Itens:</strong> Foco em utilidade, cura, escudos ou visão (ex: Regenerador de Pedra Lunar, Juramento do Cavaleiro).</li>
                         <li><strong>Runas comuns:</strong> Invocar Aery, Guardião ou Aprimoramento Glacial.</li>`;
        }
        tipsHtml += '</ul>';
        genericTipsEl.innerHTML = tipsHtml;
        
        // Mostra o Modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Evita scroll do body
        
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        alert("Erro ao carregar os detalhes do campeão.");
    }
}

// Fechar Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Lógica de Abas
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setActiveTab(btn.dataset.tab);
    });
});

function setActiveTab(tabId) {
    // Remove active de todos
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Adiciona active no alvo
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const targetContent = document.getElementById(`tab-${tabId}`);
    
    if (targetBtn && targetContent) {
        targetBtn.classList.add('active');
        targetContent.classList.add('active');
    }
}

// Inicia
init();
