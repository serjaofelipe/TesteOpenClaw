import { useState, useEffect } from 'react';
import moviesData from './data/allMoviesDB.json';
import charactersData from './data/charactersDB.json';
import { Skull, Ghost, Search, Star } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simula um carregamento dramático
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Efeito de Gotas de Sangue
  useEffect(() => {
    const bg = document.querySelector('.blood-background');
    if(bg && !document.querySelector('.drip')) {
      for(let i = 0; i < 30; i++) {
        const drop = document.createElement('div');
        drop.className = 'drip';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 4 + 2}s`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        bg.appendChild(drop);
      }
    }
  }, [isLoading]);

  const filteredMovies = moviesData.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    movie.story.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCharacters = charactersData.filter(char => 
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    char.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', color: 'var(--blood-red)', fontSize: '3rem', textAlign: 'center' }}>
          DESENTERRANDO MAIS DE 500 ARQUIVOS...
        </h1>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="blood-background"></div>
      <div className="fog"></div>
      
      <header>
        <h1>O NECRONOMICON DO CINEMA</h1>
        <nav>
          <button 
            className={`nav-btn ${activeTab === 'movies' ? 'active' : ''}`}
            onClick={() => { setActiveTab('movies'); setSearchTerm(''); }}
          >
            <Skull size={24} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }}/>
            FILMES ({moviesData.length})
          </button>
          <button 
            className={`nav-btn ${activeTab === 'characters' ? 'active' : ''}`}
            onClick={() => { setActiveTab('characters'); setSearchTerm(''); }}
          >
            <Ghost size={24} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }}/>
            PERSONAGENS ({charactersData.length})
          </button>
        </nav>
      </header>

      <main>
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input" 
            placeholder={activeTab === 'movies' ? "Busque por filmes, sinopses..." : "Busque por vilões, monstros..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {activeTab === 'movies' && (
          <section>
            <h2 className="section-title">A Biblioteca Sombria</h2>
            <div className="grid">
              {filteredMovies.map(movie => (
                <div key={movie.id} className="card" onClick={() => setSelectedMovie(movie)}>
                  <h3>
                    {movie.title} 
                    {movie.isRemake && <span className="remake-badge">REMAKE</span>}
                  </h3>
                  <div className="year">{movie.year}</div>
                  <div className="card-footer">
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      Clique para investigar...
                    </p>
                    <div className="score">
                      <Star size={16} fill="#ffd700" color="#ffd700" />
                      <span>{movie.score}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredMovies.length === 0 && <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--blood-red)' }}>Nenhum pesadelo encontrado.</p>}
          </section>
        )}

        {activeTab === 'characters' && (
          <section>
            <h2 className="section-title">A Galeria dos Pesadelos</h2>
            <div className="grid">
              {filteredCharacters.map((char, i) => (
                <div key={i} className="card" style={{ cursor: 'default' }}>
                  <h3 style={{ color: 'var(--blood-red)' }}>{char.name}</h3>
                  <div className="year" style={{ color: '#fff' }}>Origem: {char.source}</div>
                  <p style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                    <strong>Entidade:</strong> {char.type}
                  </p>
                  <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>{char.description}</p>
                </div>
              ))}
            </div>
            {filteredCharacters.length === 0 && <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--blood-red)' }}>Esta criatura ainda não despertou.</p>}
          </section>
        )}
      </main>

      {/* MODAL DO FILME */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>X</button>
            <h2 className="modal-title">{selectedMovie.title} {selectedMovie.isRemake && <span className="remake-badge" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>REMAKE</span>}</h2>
            
            <div className="modal-meta">
              <span className="meta-badge highlight">Ano: {selectedMovie.year}</span>
              <span className="meta-badge highlight"><Star size={14} fill="#ffd700" style={{ display: 'inline', marginRight: '4px' }}/> Crítica: {selectedMovie.score}/10</span>
              <span className="meta-badge">Censura: {selectedMovie.ageRating}</span>
              <span className="meta-badge">Público: {selectedMovie.audience}</span>
            </div>

            <div className="modal-grid">
              <div className="col">
                <div className="modal-section">
                  <h4>O Enredo</h4>
                  <p>{selectedMovie.story}</p>
                </div>

                <div className="modal-section">
                  <h4>Origem Macabra</h4>
                  <p>{selectedMovie.inspiration}</p>
                </div>
              </div>
              
              <div className="col">
                <div className="modal-section">
                  <h4>Arquivos Mortos (Curiosidades)</h4>
                  <ul>
                    {selectedMovie.curiosities.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>Vítimas & Algozes (Personagens)</h4>
                  <ul>
                    {selectedMovie.characters.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>A escuridão não tem fim. Apenas aguarde.</p>
      </footer>
    </div>
  );
}

export default App;
