import React, { useState } from 'react';
import { Trophy, CalendarDays, Users, Swords, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Dados fictícios/preliminares para a Copa do Mundo 2026
const teams = [
  { id: 'BRA', name: 'Brasil', flag: 'https://flagcdn.com/w160/br.png', player: 'Vini Jr', playerImg: 'https://ui-avatars.com/api/?name=Vini+Jr&background=random' },
  { id: 'ARG', name: 'Argentina', flag: 'https://flagcdn.com/w160/ar.png', player: 'Lionel Messi', playerImg: 'https://ui-avatars.com/api/?name=Messi&background=random' },
  { id: 'FRA', name: 'França', flag: 'https://flagcdn.com/w160/fr.png', player: 'Kylian Mbappé', playerImg: 'https://ui-avatars.com/api/?name=Mbappe&background=random' },
  { id: 'ENG', name: 'Inglaterra', flag: 'https://flagcdn.com/w160/gb-eng.png', player: 'Jude Bellingham', playerImg: 'https://ui-avatars.com/api/?name=Bellingham&background=random' },
  { id: 'ESP', name: 'Espanha', flag: 'https://flagcdn.com/w160/es.png', player: 'Lamine Yamal', playerImg: 'https://ui-avatars.com/api/?name=Yamal&background=random' },
  { id: 'POR', name: 'Portugal', flag: 'https://flagcdn.com/w160/pt.png', player: 'Cristiano Ronaldo', playerImg: 'https://ui-avatars.com/api/?name=Ronaldo&background=random' },
  { id: 'GER', name: 'Alemanha', flag: 'https://flagcdn.com/w160/de.png', player: 'Jamal Musiala', playerImg: 'https://ui-avatars.com/api/?name=Musiala&background=random' },
  { id: 'ITA', name: 'Itália', flag: 'https://flagcdn.com/w160/it.png', player: 'Federico Chiesa', playerImg: 'https://ui-avatars.com/api/?name=Chiesa&background=random' }
];

const pastMatches = [
  { date: '2026-06-11', team1: 'BRA', score1: 3, team2: 'GER', score2: 1 },
  { date: '2026-06-12', team1: 'ARG', score1: 2, team2: 'ESP', score2: 2 },
];

const getTeam = (id) => teams.find(t => t.id === id) || { name: 'A Definir', flag: 'https://via.placeholder.com/60x40?text=?', player: '', playerImg: '' };

export default function App() {
  const [activeTab, setActiveTab] = useState('bracket');

  // Estados editáveis para o Bracket
  const [bracket, setBracket] = useState({
    quarters: [
      { t1: 'BRA', s1: '', t2: 'ENG', s2: '' },
      { t1: 'ARG', s1: '', t2: 'FRA', s2: '' },
      { t1: 'ESP', s1: '', t2: 'GER', s2: '' },
      { t1: 'POR', s1: '', t2: 'ITA', s2: '' }
    ],
    semis: [
      { t1: '', s1: '', t2: '', s2: '' },
      { t1: '', s1: '', t2: '', s2: '' }
    ],
    final: { t1: '', s1: '', t2: '', s2: '' }
  });

  const updateQuarter = (index, field, value) => {
    const newQuarters = [...bracket.quarters];
    newQuarters[index][field] = value;
    setBracket({ ...bracket, quarters: newQuarters });
  };

  const updateSemi = (index, field, value) => {
    const newSemis = [...bracket.semis];
    newSemis[index][field] = value;
    setBracket({ ...bracket, semis: newSemis });
  };

  const updateFinal = (field, value) => {
    setBracket({ ...bracket, final: { ...bracket.final, [field]: value } });
  };

  const renderMatchCard = (match, isEditable = false, onChange = null) => {
    const t1 = getTeam(match.t1 || match.team1);
    const t2 = getTeam(match.t2 || match.team2);
    
    return (
      <div className="card">
        {match.date && <p style={{textAlign: 'center', opacity: 0.7, margin: 0}}>{match.date}</p>}
        <div className="match-row">
          <div className="team">
            <img src={t1.flag} className="flag" alt={t1.name} />
            <span>{t1.name}</span>
            {isEditable && (
              <select value={match.t1} onChange={(e) => onChange('t1', e.target.value)}>
                <option value="">Selecione...</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
          </div>
          
          {isEditable ? (
            <div style={{display: 'flex', gap: '10px'}}>
              <input type="number" className="editable-score" value={match.s1} onChange={(e) => onChange('s1', e.target.value)} />
              <span>X</span>
              <input type="number" className="editable-score" value={match.s2} onChange={(e) => onChange('s2', e.target.value)} />
            </div>
          ) : (
            <div className="score">{match.score1} - {match.score2}</div>
          )}

          <div className="team">
            <img src={t2.flag} className="flag" alt={t2.name} />
            <span>{t2.name}</span>
            {isEditable && (
              <select value={match.t2} onChange={(e) => onChange('t2', e.target.value)}>
                <option value="">Selecione...</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="bg-animation"></div>
      
      <header>
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Copa do Mundo 2026
        </motion.h1>
        
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'bracket' ? 'active' : ''}`} onClick={() => setActiveTab('bracket')}>
            <Swords size={20} /> Oitavas até a Final (Simulador)
          </button>
          <button className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
            <Activity size={20} /> Resultados Atuais
          </button>
          <button className={`tab-btn ${activeTab === 'players' ? 'active' : ''}`} onClick={() => setActiveTab('players')}>
            <Users size={20} /> Destaques
          </button>
        </div>
      </header>

      <main className="content-container">
        <AnimatePresence mode="wait">
          {activeTab === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid-cards"
            >
              {pastMatches.map((m, i) => <div key={i}>{renderMatchCard(m)}</div>)}
            </motion.div>
          )}

          {activeTab === 'players' && (
            <motion.div 
              key="players"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid-cards"
            >
              {teams.map(t => (
                <div className="card" key={t.id} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <img src={t.playerImg} alt={t.player} className="player-img" />
                  <div>
                    <h3 style={{margin: '0 0 0.5rem 0', color: 'var(--primary-light)'}}>{t.player}</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8}}>
                      <img src={t.flag} alt={t.name} style={{width: '24px', borderRadius: '2px'}} />
                      <span>{t.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'bracket' && (
            <motion.div 
              key="bracket"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bracket-container"
            >
              <div className="bracket-round">
                <h2>Quartas de Final</h2>
                <div className="grid-cards">
                  {bracket.quarters.map((q, i) => (
                    <div key={i}>{renderMatchCard(q, true, (field, val) => updateQuarter(i, field, val))}</div>
                  ))}
                </div>
              </div>

              <div className="bracket-round">
                <h2>Semi Final</h2>
                <div className="grid-cards">
                  {bracket.semis.map((s, i) => (
                    <div key={i}>{renderMatchCard(s, true, (field, val) => updateSemi(i, field, val))}</div>
                  ))}
                </div>
              </div>

              <div className="bracket-round" style={{border: '2px solid var(--primary)'}}>
                <h2 style={{color: 'gold', textAlign: 'center'}}>GRANDE FINAL <Trophy size={24} style={{verticalAlign: 'middle'}}/></h2>
                <div style={{maxWidth: '500px', margin: '0 auto'}}>
                  {renderMatchCard(bracket.final, true, (field, val) => updateFinal(field, val))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
