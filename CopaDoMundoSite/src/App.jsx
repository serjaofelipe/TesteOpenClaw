import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Trophy, Edit3, Check, Star } from 'lucide-react';
import './index.css';

// Base data
const COUNTRIES = [
  { id: 'BRA', name: 'Brasil', flag: 'https://flagcdn.com/w160/br.png' },
  { id: 'ARG', name: 'Argentina', flag: 'https://flagcdn.com/w160/ar.png' },
  { id: 'FRA', name: 'França', flag: 'https://flagcdn.com/w160/fr.png' },
  { id: 'ENG', name: 'Inglaterra', flag: 'https://flagcdn.com/w160/gb-eng.png' },
  { id: 'POR', name: 'Portugal', flag: 'https://flagcdn.com/w160/pt.png' },
  { id: 'ESP', name: 'Espanha', flag: 'https://flagcdn.com/w160/es.png' },
  { id: 'GER', name: 'Alemanha', flag: 'https://flagcdn.com/w160/de.png' },
  { id: 'USA', name: 'Estados Unidos', flag: 'https://flagcdn.com/w160/us.png' },
  { id: 'MEX', name: 'México', flag: 'https://flagcdn.com/w160/mx.png' },
  { id: 'CAN', name: 'Canadá', flag: 'https://flagcdn.com/w160/ca.png' }
];

const INITIAL_PAST_MATCHES = [
  { id: 1, phase: 'Fase de Grupos', date: '11 Jun 2026', location: 'Estádio Azteca, MEX', team1: 'MEX', team2: 'GER', score1: 1, score2: 1 },
  { id: 2, phase: 'Fase de Grupos', date: '12 Jun 2026', location: 'SoFi Stadium, USA', team1: 'USA', team2: 'FRA', score1: 0, score2: 2 },
  { id: 3, phase: 'Fase de Grupos', date: '13 Jun 2026', location: 'BMO Field, CAN', team1: 'BRA', team2: 'CAN', score1: 3, score2: 0 }
];

const INITIAL_KNOCKOUT_MATCHES = [
  { id: 4, phase: 'Oitavas de Final', date: '28 Jun 2026', location: 'MetLife Stadium, USA', team1: 'BRA', team2: 'POR', score1: 0, score2: 0 },
  { id: 5, phase: 'Quartas de Final', date: '04 Jul 2026', location: 'AT&T Stadium, USA', team1: 'ARG', team2: 'ENG', score1: 0, score2: 0 },
  { id: 6, phase: 'Semifinal', date: '14 Jul 2026', location: 'Mercedes-Benz Stadium, USA', team1: 'FRA', team2: 'ESP', score1: 0, score2: 0 },
  { id: 7, phase: 'Final', date: '19 Jul 2026', location: 'MetLife Stadium, USA', team1: 'BRA', team2: 'FRA', score1: 0, score2: 0 }
];

const STANDOUT_PLAYERS = [
  { id: 1, name: 'Vinícius Júnior', country: 'Brasil' },
  { id: 2, name: 'Kylian Mbappé', country: 'França' },
  { id: 3, name: 'Lionel Messi', country: 'Argentina' },
  { id: 4, name: 'Jude Bellingham', country: 'Inglaterra' },
  { id: 5, name: 'Christian Pulisic', country: 'Estados Unidos' }
];

const getCountry = (id) => COUNTRIES.find(c => c.id === id) || COUNTRIES[0];

const MatchCard = ({ match, isEditable, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [localMatch, setLocalMatch] = useState(match);

  const t1 = getCountry(localMatch.team1);
  const t2 = getCountry(localMatch.team2);

  const handleSave = () => {
    setEditing(false);
    onUpdate(localMatch);
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="match-header">
        <span>{match.phase}</span>
        {isEditable && (
          <button className="tab-btn" style={{ padding: '0.3rem 0.6rem' }} onClick={editing ? handleSave : () => setEditing(true)}>
            {editing ? <Check size={16} /> : <Edit3 size={16} />}
          </button>
        )}
      </div>

      <div className="teams">
        <div className="team">
          <img src={t1.flag} alt={t1.name} className="flag" />
          {editing ? (
            <select className="team-select" value={localMatch.team1} onChange={e => setLocalMatch({...localMatch, team1: e.target.value})}>
              {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          ) : (
            <span className="team-name">{t1.id}</span>
          )}
        </div>

        <div className="score-box">
          {editing ? (
            <>
              <input type="number" className="score-input" value={localMatch.score1} onChange={e => setLocalMatch({...localMatch, score1: parseInt(e.target.value) || 0})} />
              <span className="score-divider">-</span>
              <input type="number" className="score-input" value={localMatch.score2} onChange={e => setLocalMatch({...localMatch, score2: parseInt(e.target.value) || 0})} />
            </>
          ) : (
            <>
              <span className="score">{localMatch.score1}</span>
              <span className="score-divider">-</span>
              <span className="score">{localMatch.score2}</span>
            </>
          )}
        </div>

        <div className="team">
          <img src={t2.flag} alt={t2.name} className="flag" />
          {editing ? (
            <select className="team-select" value={localMatch.team2} onChange={e => setLocalMatch({...localMatch, team2: e.target.value})}>
              {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          ) : (
            <span className="team-name">{t2.id}</span>
          )}
        </div>
      </div>

      <div className="details">
        <div className="detail-item">
          <Calendar size={16} className="detail-icon" />
          <span>{match.date}</span>
        </div>
        <div className="detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>{match.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('past');
  const [knockoutMatches, setKnockoutMatches] = useState(INITIAL_KNOCKOUT_MATCHES);

  const updateKnockoutMatch = (updatedMatch) => {
    setKnockoutMatches(prev => prev.map(m => m.id === updatedMatch.id ? updatedMatch : m));
  };

  return (
    <>
      <div className="bg-animation"></div>
      <div className="app-container">
        <header className="hero">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Copa do Mundo 2026
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A maior edição da história. Canadá, México e Estados Unidos.
          </motion.p>
        </header>

        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>
            Jogos Realizados
          </button>
          <button className={`tab-btn ${activeTab === 'knockout' ? 'active' : ''}`} onClick={() => setActiveTab('knockout')}>
            Mata-Mata (Simulador)
          </button>
          <button className={`tab-btn ${activeTab === 'players' ? 'active' : ''}`} onClick={() => setActiveTab('players')}>
            Destaques
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'past' && (
            <motion.div key="past" className="grid">
              {INITIAL_PAST_MATCHES.map(match => (
                <MatchCard key={match.id} match={match} isEditable={false} />
              ))}
            </motion.div>
          )}

          {activeTab === 'knockout' && (
            <motion.div key="knockout" className="grid">
              {knockoutMatches.map(match => (
                <MatchCard key={match.id} match={match} isEditable={true} onUpdate={updateKnockoutMatch} />
              ))}
            </motion.div>
          )}

          {activeTab === 'players' && (
            <motion.div key="players" className="grid" style={{ display: 'block', maxWidth: '600px', margin: '0 auto' }}>
              <div className="card">
                <div className="match-header" style={{ marginBottom: '1rem', color: '#fff' }}>
                  <Trophy size={20} color="var(--gold)" />
                  <span>Estrelas do Mundial</span>
                  <Star size={20} color="var(--gold)" />
                </div>
                <ul className="player-list">
                  {STANDOUT_PLAYERS.map(player => (
                    <li key={player.id} className="player-item">
                      <span className="player-name">{player.name}</span>
                      <span className="player-country">{player.country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
