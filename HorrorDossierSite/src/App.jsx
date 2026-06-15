import { useState, useEffect } from 'react';
import moviesData from './data/allMoviesDB.json';
import charactersData from './data/charactersDB.json';
import { Skull, Ghost, Search, Star, Film, Flame } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  // Extrair categorias únicas dos filmes
  const allCategories = ['Todas', ...new Set(moviesData.map(m => m.category || 'Desconhecido'))];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

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

  // Filtros combinados de pesquisa e categoria
  const filteredMovies = moviesData.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          movie.story.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || movie.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredCharacters = charactersData.filter(char => 
    char.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    char.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quizQuestions = [
    {
      id: "fear",
      question: "Qual é o seu maior medo?",
      options: [
        { label: "Assassinos implacáveis e brutais", tags: ["Slasher / Serial Killer"] },
        { label: "O sobrenatural e coisas que não posso ver", tags: ["Sobrenatural / Fantasmas", "Demônios / Possessão"] },
        { label: "Violência extrema e sofrimento", tags: ["Gore / Tortura"] },
        { label: "A perda da minha própria sanidade", tags: ["Terror Psicológico"] },
        { label: "Monstros, bruxas e criaturas", tags: ["Monstros Clássicos / Bruxaria", "Aliens / Sci-Fi Horror"] }
      ]
    },
    {
      id: "era",
      question: "Qual é a sua época favorita para o terror?",
      options: [
        { label: "Clássicos Cults e Origens (Antes de 1980)", yearRange: [1900, 1979] },
        { label: "A Era de Ouro do Slasher e Efeitos Práticos (1980 - 1999)", yearRange: [1980, 1999] },
        { label: "O Renascimento Sangrento e Assombrações (2000 - 2014)", yearRange: [2000, 2014] },
        { label: "O Terror Moderno, Indie e A24 (2015 em diante)", yearRange: [2015, 2025] },
        { label: "Qualquer época, desde que me dê pesadelos!", yearRange: [1900, 2025] }
      ]
    },
    {
      id: "style",
      question: "O que NÃO PODE faltar no seu filme perfeito?",
      options: [
        { label: "Banho de sangue e mortes criativas.", tags: ["Gore / Tortura", "Slasher / Serial Killer"], boost: 2 },
        { label: "Sustos repentinos que me façam gritar (Jump Scares).", tags: ["Sobrenatural / Fantasmas", "Demônios / Possessão"], boost: 2 },
        { label: "Uma história perturbadora que me deixe pensando depois.", tags: ["Terror Psicológico", "Suspense Macabro"], boost: 2 },
        { label: "Câmeras tremidas e realismo assustador.", tags: ["Found Footage"], boost: 3 }
      ]
    }
  ];

  const handleAnswer = (questionId, option) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: option }));
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      calculateRecommendations({ ...quizAnswers, [questionId]: option });
      setQuizStep(prev => prev + 1); // Move to results
    }
  };

  const calculateRecommendations = (answers) => {
    const scoredMovies = moviesData.map(movie => {
      let score = 0;
      
      // Checar Medo
      if (answers.fear.tags.includes(movie.category)) score += 3;
      
      // Checar Era
      const [minY, maxY] = answers.era.yearRange;
      if (movie.year >= minY && movie.year <= maxY) score += 2;
      
      // Checar Estilo
      if (answers.style.tags.includes(movie.category)) {
        score += answers.style.boost;
      }
      
      // Bônus para filmes melhores avaliados (0 a 1)
      score += (movie.score / 10);
      
      return { ...movie, matchScore: score };
    });
    
    // Sort descending
    scoredMovies.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scoredMovies.slice(0, 3));
  };

  const restartQuiz = () => {
    setQuizAnswers({});
    setQuizStep(0);
    setRecommendations([]);
  };

  if (isLoading) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', color: 'var(--blood-red)', fontSize: '3rem', textAlign: 'center' }}>
          ORGANIZANDO OS ARQUIVOS DO MAL...
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
            <Film size={24} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }}/>
            ACERVO
          </button>
          <button 
            className={`nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => { setActiveTab('categories'); setSearchTerm(''); }}
          >
            <Skull size={24} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }}/>
            CATEGORIAS
          </button>
          <button 
            className={`nav-btn ${activeTab === 'characters' ? 'active' : ''}`}
            onClick={() => { setActiveTab('characters'); setSearchTerm(''); }}
          >
            <Ghost size={24} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }}/>
            VILÕES
          </button>
          <button 
            className={`nav-btn ${activeTab === 'myhorror' ? 'active' : ''}`}
            onClick={() => { setActiveTab('myhorror'); setSearchTerm(''); }}
            style={{ border: '1px solid var(--blood-red)' }}
          >
            <Flame size={24} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px', color: 'var(--blood-red)' }}/>
            MY HORROR
          </button>
        </nav>
      </header>

      <main>
        {(activeTab === 'movies' || activeTab === 'categories') && (
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Busque pelo seu pesadelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {activeTab === 'movies' && (
          <section>
            <h2 className="section-title">Todos os Filmes (Ordem de Lançamento)</h2>
            <div className="grid">
              {filteredMovies.map(movie => (
                <div key={movie.id} className="card" onClick={() => setSelectedMovie(movie)}>
                  <h3>
                    {movie.title} 
                    {movie.isRemake && <span className="remake-badge">REMAKE</span>}
                  </h3>
                  <div className="year">{movie.year} | {movie.category}</div>
                  <div className="card-footer">
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontStyle: 'italic' }}>Investigar...</p>
                    <div className="score">
                      <Star size={16} fill="#ffd700" color="#ffd700" />
                      <span>{movie.score}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredMovies.length === 0 && <p className="empty-msg">Nenhum pesadelo encontrado.</p>}
          </section>
        )}

        {activeTab === 'categories' && (
          <section>
            <h2 className="section-title">Navegar por Maldições (Categorias)</h2>
            <div className="cat-filters">
              {allCategories.map(cat => (
                <button 
                  key={cat} 
                  className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid">
              {filteredMovies.map(movie => (
                <div key={movie.id} className="card" onClick={() => setSelectedMovie(movie)}>
                  <h3>{movie.title} {movie.isRemake && <span className="remake-badge">REMAKE</span>}</h3>
                  <div className="year">{movie.year}</div>
                  <div className="card-footer">
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontStyle: 'italic' }}>Investigar...</p>
                    <div className="score">
                      <Star size={16} fill="#ffd700" color="#ffd700" />
                      <span>{movie.score}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredMovies.length === 0 && <p className="empty-msg">Nenhum pesadelo encontrado nesta categoria.</p>}
          </section>
        )}

        {activeTab === 'characters' && (
          <section>
            <h2 className="section-title">A Galeria dos Pesadelos (Ordem de Surgimento)</h2>
            <div className="grid">
              {filteredCharacters.map((char, i) => (
                <div key={i} className="card" style={{ cursor: 'default' }}>
                  <h3 style={{ color: 'var(--blood-red)' }}>{char.name}</h3>
                  <div className="year" style={{ color: '#fff' }}>Ano: {char.year} | Origem: {char.source}</div>
                  <p style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                    <strong>Entidade:</strong> {char.type}
                  </p>
                  <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>{char.description}</p>
                </div>
              ))}
            </div>
            {filteredCharacters.length === 0 && <p className="empty-msg">Esta criatura ainda não despertou.</p>}
          </section>
        )}

        {activeTab === 'myhorror' && (
          <section className="quiz-section">
            <h2 className="section-title" style={{ textAlign: 'center', fontSize: '3rem', textShadow: '0 0 20px var(--blood-red)' }}>MY HORROR</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-dim)' }}>Não sabe o que assistir? Deixe a escuridão escolher o filme perfeito para você.</p>
            
            <div className="quiz-container">
              {quizStep < quizQuestions.length ? (
                <div className="quiz-question-box">
                  <h3>Pergunta {quizStep + 1} de {quizQuestions.length}</h3>
                  <h2>{quizQuestions[quizStep].question}</h2>
                  <div className="quiz-options">
                    {quizQuestions[quizStep].options.map((opt, i) => (
                      <button key={i} className="quiz-btn" onClick={() => handleAnswer(quizQuestions[quizStep].id, opt)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="quiz-results-box">
                  <h2 style={{ color: 'var(--blood-red)', marginBottom: '2rem' }}>SUAS RECOMENDAÇÕES MALDITAS</h2>
                  <div className="recommendations-grid">
                    {recommendations.map((movie, index) => (
                      <div key={movie.id} className={`card rec-card rank-${index + 1}`} onClick={() => setSelectedMovie(movie)}>
                        <div className="rank-badge">{index + 1}º LUGAR</div>
                        <h3 style={{ marginTop: '2rem' }}>{movie.title} {movie.isRemake && <span className="remake-badge">REMAKE</span>}</h3>
                        <div className="year">{movie.year} | {movie.category}</div>
                        <p style={{ color: 'var(--text-dim)', marginTop: '1rem' }}>
                          Match Rating: {(movie.matchScore * 10).toFixed(0)}%
                        </p>
                        <div className="score" style={{ marginTop: '1rem' }}>
                          <Star size={16} fill="#ffd700" color="#ffd700" />
                          <span>{movie.score}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="quiz-btn" style={{ marginTop: '3rem', width: 'auto', padding: '1rem 3rem' }} onClick={restartQuiz}>
                    INVOCAR NOVAMENTE
                  </button>
                </div>
              )}
            </div>
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
              <span className="meta-badge highlight" style={{ border: '1px solid #7c3aed' }}>{selectedMovie.category}</span>
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
