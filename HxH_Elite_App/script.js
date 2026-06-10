// --- Tab Switcher Logic ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
});

// --- State ---
let charactersData = [];
let arcsData = [];
let tracksData = [];

// --- Initialize App ---
async function initApp() {
    try {
        const [charRes, arcsRes, trackRes] = await Promise.all([
            fetch('./characters.json'),
            fetch('./arcs.json'),
            fetch('./soundtrack.json')
        ]);

        charactersData = await charRes.json();
        arcsData = await arcsRes.json();
        tracksData = await trackRes.json();

        renderCharacters(charactersData);
        renderArcs();
        renderTracks();

    } catch (error) {
        console.error("Error loading JSON data:", error);
        // Fallback or error UI can go here. For Local File:// protocol in some browsers, fetch might fail.
        // The prompt dictates Vanilla JS fetch from local .json files without server.
    }
}

// --- Render Characters ---
function renderCharacters(data) {
    const grid = document.getElementById('char-grid');
    grid.innerHTML = '';

    data.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card glass-panel';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" onerror="this.src='https://via.placeholder.com/120/121212/D4AF37?text=HxH'">
            <h3>${char.name}</h3>
            <p>${char.nen_type}</p>
        `;
        card.addEventListener('click', () => openModal(char));
        grid.appendChild(card);
    });
}

// --- Filtering Logic ---
const filterNen = document.getElementById('filter-nen');
const filterAffil = document.getElementById('filter-affiliation');

function applyFilters() {
    const nen = filterNen.value;
    const affil = filterAffil.value;

    const filtered = charactersData.filter(char => {
        const matchNen = nen === 'all' || char.nen_type.includes(nen);
        const matchAffil = affil === 'all' || char.affiliation.includes(affil);
        return matchNen && matchAffil;
    });

    renderCharacters(filtered);
}

filterNen.addEventListener('change', applyFilters);
filterAffil.addEventListener('change', applyFilters);

// --- Modal Logic ---
const modal = document.getElementById('char-modal');
const closeBtn = document.querySelector('.close-btn');

function openModal(char) {
    document.getElementById('modal-img').src = char.image;
    document.getElementById('modal-name').textContent = char.name;
    document.getElementById('modal-nen').textContent = `Nen: ${char.nen_type}`;
    document.getElementById('modal-affiliation').textContent = `Affiliation: ${char.affiliation}`;
    document.getElementById('modal-hatsu').textContent = char.hatsu;

    // Reset and animate bars
    const stats = ['power', 'speed', 'intel', 'nen'];
    stats.forEach(s => {
        const bar = document.getElementById(`bar-${s}`);
        bar.style.width = '0%';
        setTimeout(() => {
            let statVal = char.stats[s === 'intel' ? 'intelligence' : s];
            bar.style.width = `${statVal}%`;
        }, 100);
    });

    modal.classList.add('show');
}

closeBtn.addEventListener('click', () => modal.classList.remove('show'));
window.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('show');
});

// --- Render Arcs ---
function renderArcs() {
    const container = document.getElementById('arcs-container');
    container.innerHTML = '';

    arcsData.forEach(arc => {
        // Find character icons for this arc
        const iconsHtml = arc.characters_involved.map(charId => {
            const c = charactersData.find(ch => ch.id === charId);
            if(c) {
                return `<img src="${c.image}" class="arc-char-icon" title="${c.name}" onerror="this.src='https://via.placeholder.com/40/121212/D4AF37?text=HxH'">`;
            }
            return '';
        }).join('');

        const arcEl = document.createElement('div');
        arcEl.className = 'arc-item glass-panel';
        arcEl.style.padding = '20px';
        arcEl.innerHTML = `
            <h2>${arc.arc}</h2>
            <p>${arc.synopsis}</p>
            <div class="arc-chars">
                ${iconsHtml}
            </div>
        `;
        container.appendChild(arcEl);
    });
}

// --- YouTube Player Logic ---
let ytPlayer;
let currentTrackId = null;

// This function is called by the YouTube IFrame API once it's loaded
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('yt-player-container', {
        height: '0',
        width: '0',
        videoId: '', // Will be loaded dynamically
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'rel': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event) {
    // If video ends, we could play next track
    if (event.data === YT.PlayerState.ENDED) {
        // Implement auto-next if desired
    }
}

function renderTracks() {
    const list = document.getElementById('track-list');
    list.innerHTML = '';

    tracksData.forEach(track => {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.innerHTML = `<strong>${track.title}</strong> - ${track.artist}`;
        
        item.addEventListener('click', () => {
            document.querySelectorAll('.track-item').forEach(i => i.classList.remove('playing'));
            item.classList.add('playing');
            
            document.getElementById('track-title').textContent = track.title;
            document.getElementById('track-artist').textContent = track.artist;
            
            playTrack(track.youtube_id);
        });

        list.appendChild(item);
    });
}

function playTrack(videoId) {
    if (!ytPlayer || !ytPlayer.loadVideoById) return;
    ytPlayer.loadVideoById(videoId);
    ytPlayer.playVideo();
}

document.getElementById('btn-play').addEventListener('click', () => {
    if (ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
});

document.getElementById('btn-pause').addEventListener('click', () => {
    if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
});

// Start app
initApp();
