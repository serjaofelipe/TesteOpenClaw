import { useState, useEffect } from 'react';
import moviesData from './data/allMoviesDB.json';
import charactersData from './data/charactersDB.json';
import { rootQuestion, branchQuestions } from './data/quizDB.js';
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
  const [quizPath, setQuizPath] = useState(null); // 'slasher', 'sobrenatural', etc.
  const [quizAnswers, setQuizAnswers] = useState([]);
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

  const handleAnswer = (option) => {
    const newAnswers = [...quizAnswers, option];
    setQuizAnswers(newAnswers);

    if (quizStep === 0) {
      setQuizPath(option.path);
      setQuizStep(1);
    } else {
      const currentBranch = branchQuestions[quizPath];
      if (quizStep < currentBranch.length) {
        setQuizStep(prev => prev + 1);
      } else {
        // Acabou as perguntas (1 root + 4 branches = 5)
        calculateRecommendations(newAnswers);
        setQuizStep(prev => prev + 1); // Move to results
      }
    }
  };

  const calculateRecommendations = (answers) => {
    const scoredMovies = moviesData.map(movie => {
      let score = 0;
      
      answers.forEach(ans => {
        if (!ans.boost) return;
        
        if (ans.boost.category && movie.category === ans.boost.category) score += 5;
        if (ans.boost.title && movie.title.toLowerCase().includes(ans.boost.title.toLowerCase())) score += 10;
        if (ans.boost.era) {
          const [min, max] = ans.boost.era;
          if (movie.year >= min && movie.year <= max) score += 3;
        }
        if (ans.boost.audience && movie.audience.toLowerCase().includes(ans.boost.audience.toLowerCase())) score += 3;
      });
      
      // Bônus base da avaliação crítica do filme (0 a 1 ponto extra)
      score += (movie.score / 10);
      
      return { ...movie, matchScore: score };
    });
    
    // Sort descending by match score, then random to mix ties
    scoredMovies.sort((a, b) => b.matchScore - a.matchScore || Math.random() - 0.5);
    setRecommendations(scoredMovies.slice(0, 3));
  };

  const restartQuiz = () => {
    setQuizAnswers([]);
    setQuizStep(0);
    setQuizPath(null);
    setRecommendations([]);
  };

  // Determine current question to show
  let currentQuestion = null;
  let totalQuestionsCount = 5; // 1 root + 4 branch
  if (quizStep === 0) {
    currentQuestion = rootQuestion;
  } else if (quizPath && quizStep <= branchQuestions[quizPath].length) {
    currentQuestion = branchQuestions[quizPath][quizStep - 1];
  }

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
            onClick={() => { setActiveTab('myhorror'); setSearchTerm(''); restartQuiz(); }}
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
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-dim)' }}>Caminhos interligados. Sua primeira escolha define sua jornada para o inferno...</p>
            
            <div className="quiz-container">
              {currentQuestion ? (
                <div className="quiz-question-box">
                  <h3>Pergunta {quizStep + 1} de {totalQuestionsCount}</h3>
                  <div className="progress-bar-bg" style={{ background: '#333', height: '4px', marginBottom: '2rem', borderRadius: '2px' }}>
                     <div className="progress-fill" style={{ background: 'var(--blood-red)', height: '100%', width: `${((quizStep) / totalQuestionsCount) * 100}%`, transition: 'width 0.3s' }}></div>
                  </div>

                  <h2>{currentQuestion.text}</h2>
                  <div className="quiz-options">
                    {currentQuestion.options.map((opt, i) => (
                      <button key={i} className="quiz-btn" onClick={() => handleAnswer(opt)}>
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="quiz-results-box">
                  <h2 style={{ color: 'var(--blood-red)', marginBottom: '2rem', textAlign: 'center' }}>SUAS RECOMENDAÇÕES MALDITAS</h2>
                  <div className="recommendations-grid">
                    {recommendations.map((movie, index) => (
                      <div key={movie.id} className={`card rec-card rank-${index + 1}`} onClick={() => setSelectedMovie(movie)}>
                        <div className="rank-badge">{index + 1}º LUGAR</div>
                        <h3 style={{ marginTop: '2rem' }}>{movie.title} {movie.isRemake && <span className="remake-badge">REMAKE</span>}</h3>
                        <div className="year">{movie.year} | {movie.category}</div>
                        <p style={{ color: 'var(--text-dim)', marginTop: '1rem' }}>
                          Intensidade: {(movie.matchScore * 10).toFixed(0)}%
                        </p>
                        <div className="score" style={{ marginTop: '1rem' }}>
                          <Star size={16} fill="#ffd700" color="#ffd700" />
                          <span>{movie.score}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <button className="quiz-btn" style={{ marginTop: '3rem', width: 'auto', padding: '1rem 3rem' }} onClick={restartQuiz}>
                      TENTAR SOBREVIVER OUTRA VEZ
                    </button>
                  </div>
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
