import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Skull, Flame, Globe2, Sparkles, EyeOff, Search } from 'lucide-react';

const currentReligions = [
  { name: 'Cristianismo', followers: '2.4 Bilhões', origin: 'Oriente Médio (Séc I)', core: 'Fé em Jesus Cristo como filho de Deus e salvador. Monoteísta.' },
  { name: 'Islamismo', followers: '1.9 Bilhão', origin: 'Península Arábica (Séc VII)', core: 'Submissão a Alá e aos ensinamentos do profeta Maomé. Monoteísta.' },
  { name: 'Hinduísmo', followers: '1.2 Bilhão', origin: 'Índia (Vale do Indo, ~1500 a.C.)', core: 'Ciclo de reencarnação (Samsara), Karma e Dharma. Politeísta/Panteísta.' },
  { name: 'Budismo', followers: '500 Milhões', origin: 'Índia (Séc VI a.C.)', core: 'Busca pelo Nirvana através do desapego (As Quatro Nobres Verdades). Não teísta.' },
  { name: 'Sikhismo', followers: '30 Milhões', origin: 'Região de Punjab (Séc XV)', core: 'Devoção a um Deus sem forma e ensinamentos dos Dez Gurus.' },
  { name: 'Judaísmo', followers: '15 Milhões', origin: 'Canaã / Oriente Médio (~2000 a.C.)', core: 'Pacto de Deus com o povo de Israel revelado na Torá. Monoteísta.' }
];

const extinctReligions = [
  { name: 'Religião Suméria', era: '~3500 a.C. - 2000 a.C.', gods: 'Anu, Enlil, Enki, Inanna', desc: 'A primeira grande mitologia registrada. Seus mitos de criação e dilúvio influenciaram pesadamente as religiões abraâmicas.' },
  { name: 'Religião Egípcia Antiga', era: '~3150 a.C. - 30 a.C.', gods: 'Rá, Osíris, Ísis, Hórus', desc: 'Centrada no faraó como divino e na vida após a morte (O Livro dos Mortos).' },
  { name: 'Mitologia Grega e Romana', era: '~1200 a.C. - 500 d.C.', gods: 'Zeus/Júpiter, Atena/Minerva', desc: 'Deuses antropomórficos governando as forças da natureza e do destino.' },
  { name: 'Religião Nórdica Antiga', era: '~Séc VIII - Séc XII', gods: 'Odin, Thor, Freyja', desc: 'Crenças dos povos germânicos do norte, fatalista, culminando no Ragnarök.' },
  { name: 'Religião Inca, Maia e Asteca', era: '~250 d.C. - 1500 d.C.', gods: 'Quetzalcoatl, Inti, Huitzilopochtli', desc: 'Religiões mesoamericanas e andinas focadas no ciclo do sol, agricultura e sacrifícios.' }
];

const coincidences = [
  {
    topic: 'O Grande Dilúvio',
    description: 'Quase todas as antigas civilizações possuem um mito de um dilúvio global enviado pelos deuses para destruir a humanidade imperfeita.',
    connections: 'Arca de Noé (Cristianismo/Judaísmo), Épico de Gilgamesh - Utnapishtim (Sumérios), Deucalião (Grega), Manu (Hinduísmo).',
    unmasked: 'Antigas civilizações cresciam ao redor de grandes rios (Tigre, Eufrates, Nilo, Indo). Enchentes catastróficas locais eram eventos reais de extinção em massa para eles, gerando um trauma cultural que evoluiu para mito.'
  },
  {
    topic: 'O Nascimento Virginal',
    description: 'Heróis e deuses salvadores nascidos de virgens ou concepções divinas.',
    connections: 'Jesus Cristo, Hórus (Egito - nascido de Ísis), Mitra (Persa), Krishna (Hinduísmo).',
    unmasked: 'A pureza e o nascimento miraculoso eram tropos literários na antiguidade para designar que uma figura era de origem divina ou destinada à grandeza desde o início, não algo exclusivo de uma crença.'
  },
  {
    topic: 'Ressurreição / Renascimento em 3 Dias',
    description: 'Um deus que morre, desce ao submundo e retorna à vida, frequentemente associado ao sol ou à colheita.',
    connections: 'Jesus, Osíris (Egito), Adônis (Grécia), Tammuz/Dumuzi (Suméria).',
    unmasked: 'Antigamente, as religiões eram agrário-solares. A "morte" e "ressurreição" representam o ciclo das estações: o inverno (morte) e a primavera (renascimento das colheitas), vital para a sobrevivência humana.'
  },
  {
    topic: 'O Messias / O Salvador Prometido',
    description: 'A figura de um salvador que virá no fim dos tempos para destruir o mal e restaurar a paz universal.',
    connections: 'Cristo na Segunda Vinda, Kalki (Hinduísmo), Saoshyant (Zoroastrismo), Mahdi (Islamismo).',
    unmasked: 'A promessa de um salvador no futuro distante é um mecanismo psicológico humano coletivo para lidar com a opressão política, guerra e sofrimento no presente.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('first');

  return (
    <div className="app-container">
      <div className="bg-animation"></div>
      
      <header>
        <h1 className="title-main">OmniReligions</h1>
        <p className="subtitle">A Origem, as Crenças e os Mitos Desmascarados</p>
        
        <div className="nav-tabs">
          <button className={`tab-btn ${activeTab === 'first' ? 'active' : ''}`} onClick={() => setActiveTab('first')}><Flame size={18} /> A Primeira</button>
          <button className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`} onClick={() => setActiveTab('current')}><Globe2 size={18} /> Atuais</button>
          <button className={`tab-btn ${activeTab === 'extinct' ? 'active' : ''}`} onClick={() => setActiveTab('extinct')}><Skull size={18} /> Extintas</button>
          <button className={`tab-btn ${activeTab === 'coincidences' ? 'active' : ''}`} onClick={() => setActiveTab('coincidences')}><EyeOff size={18} /> Mitos & Coincidências</button>
        </div>
      </header>

      <main className="content-container">
        <AnimatePresence mode="wait">
          
          {activeTab === 'first' && (
            <motion.div key="first" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div className="card" style={{ maxWidth: '800px', margin: '0 auto', borderTopColor: '#d4af37' }}>
                <span className="badge">Gênese da Crença</span>
                <h2 className="card-title">Animismo e a Religião Suméria</h2>
                <p>
                  Antes de qualquer estrutura organizada, existia o <strong>Animismo</strong> (dezenas de milhares de anos atrás), a crença de que tudo no universo (animais, rios, pedras, clima) possuía um espírito. Era uma tentativa primitiva de explicar os fenômenos naturais.
                </p>
                <p>
                  Quando os humanos formaram civilizações, nasceu a primeira religião estruturada e escrita: a <strong>Religião da Mesopotâmia (Suméria)</strong>, por volta de 3500 a.C.
                </p>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <h3 style={{ color: '#d4af37', marginTop: 0 }}><Sparkles size={18} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> Legado Sumério</h3>
                  <p>Os sumérios inventaram conceitos que foram herdados pelas religiões modernas:</p>
                  <ul>
                    <li>A criação do homem a partir do barro (argila).</li>
                    <li>O Jardim do Éden (baseado no paraíso sumério de Dilmun).</li>
                    <li>O Grande Dilúvio (A história de Utnapishtim é quase idêntica à de Noé e foi escrita milênios antes).</li>
                    <li>A separação entre os céus (morada divina) e o submundo.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'current' && (
            <motion.div key="current" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="grid-cards">
              {currentReligions.map((rel, idx) => (
                <motion.div className="card" key={idx} whileHover={{ scale: 1.02 }}>
                  <span className="badge">{rel.followers}</span>
                  <h2 className="card-title">{rel.name}</h2>
                  <p><strong>Origem:</strong> {rel.origin}</p>
                  <p><strong>Crença Central:</strong> {rel.core}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'extinct' && (
            <motion.div key="extinct" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="grid-cards">
              {extinctReligions.map((rel, idx) => (
                <motion.div className="card" key={idx} style={{ borderTopColor: '#8b0000' }} whileHover={{ scale: 1.02 }}>
                  <span className="badge" style={{ color: '#8b0000', background: 'rgba(139,0,0,0.1)' }}>{rel.era}</span>
                  <h2 className="card-title" style={{ color: '#ff6b6b' }}>{rel.name}</h2>
                  <p><strong>Deuses Principais:</strong> {rel.gods}</p>
                  <p>{rel.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'coincidences' && (
            <motion.div key="coincidences" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div style={{ marginBottom: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
                <p>Ao analisar a história de forma acadêmica, descobrimos que religiões distantes geograficamente e temporalmente compartilham mitos quase idênticos. Isso não significa que um copiou o outro (embora o plágio cultural ocorresse), mas sim que o cérebro humano, exposto aos mesmos padrões naturais, produz as mesmas histórias mitológicas para explicar a realidade.</p>
              </div>

              <div className="grid-cards" style={{ gridTemplateColumns: '1fr' }}>
                {coincidences.map((coin, idx) => (
                  <motion.div className="card myth-card" key={idx} whileHover={{ x: 5 }}>
                    <h2 className="card-title" style={{ color: '#fff' }}><Search size={22} style={{ color: 'var(--secondary)' }} /> {coin.topic}</h2>
                    <p><strong>O Mito:</strong> {coin.description}</p>
                    <p><strong>Aparece em:</strong> <span style={{ color: '#a8a8b3' }}>{coin.connections}</span></p>
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(94, 23, 235, 0.1)', borderLeft: '3px solid var(--accent)' }}>
                      <p style={{ margin: 0 }}><span className="truth-highlight">A Verdade Desmascarada:</span> {coin.unmasked}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
