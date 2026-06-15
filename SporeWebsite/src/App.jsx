import { useState } from 'react';
import { Gamepad2, Info, Dna, Users } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const curiosities = [
    "O jogo foi inicialmente apelidado de 'SimEverything'.",
    "Will Wright se inspirou no 'Drake Equation' para criar a escala galáctica.",
    "O gerador procedural permite trilhões de criaturas únicas.",
    "Muitos sons de criaturas foram feitos manipulando vozes humanas.",
    "Spore utiliza animação processual, então o jogo não possui animações pré-gravadas para as caminhadas.",
    "A fase 'Cidade' foi cortada do jogo final, mesclada à fase Civilização.",
    "Robin Williams foi convidado para testar e demonstrar o jogo em 2006.",
    "O motor do jogo calcula em tempo real o centro de gravidade da sua criatura.",
    "Existem sistemas solares ocultos no jogo que se assemelham ao nosso (Sol, Terra, Marte).",
    "A trilha sonora generativa foi concebida por Brian Eno.",
    "O jogo demorou mais de 8 anos para ser totalmente desenvolvido.",
    "O centro da galáxia abriga o Grox, uma espécie hostil cibernética.",
    "Chegar ao centro da galáxia recompensa o jogador com o Cajado da Vida.",
    "A fase Célula é amplamente inspirada no jogo clássico 'Pac-Man'.",
    "Spore foi um dos jogos mais pirateados de todos os tempos devido ao seu polêmico DRM (SecuROM).",
    "Você pode abduzir criaturas na fase Espacial, assim como nos jogos clássicos de OVNIs.",
    "A flora do jogo também é procedural, mas menos personalizável.",
    "O Spore Creature Creator foi lançado meses antes do jogo oficial como uma 'demo'.",
    "Há um easter egg onde o rosto de Will Wright aparece girando no menu se você clicar nos galáxias rapidamente.",
    "Fãs ainda mantêm servidores e mods vivos mais de 15 anos após o lançamento."
  ];

  return (
    <div className="app-container">
      <header>
        <h1 className="logo-title">SPORE UNIVERSE</h1>
        <p>A Jornada da Célula ao Espaço</p>
        <nav>
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Gamepad2 size={20} /> O Jogo
          </button>
          <button 
            className={`nav-btn ${activeTab === 'evolution' ? 'active' : ''}`}
            onClick={() => setActiveTab('evolution')}
          >
            <Dna size={20} /> A Evolução
          </button>
          <button 
            className={`nav-btn ${activeTab === 'creators' ? 'active' : ''}`}
            onClick={() => setActiveTab('creators')}
          >
            <Users size={20} /> Criadores e Franquia
          </button>
          <button 
            className={`nav-btn ${activeTab === 'curiosities' ? 'active' : ''}`}
            onClick={() => setActiveTab('curiosities')}
          >
            <Info size={20} /> 20 Curiosidades
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'home' && (
          <div className="section-container">
            <h2>Sobre Spore</h2>
            <div className="card">
              <h3>O que é Spore?</h3>
              <p>
                Spore é um jogo de "simulação de deus" desenvolvido pela Maxis e publicado pela Electronic Arts em 2008. 
                Concebido pelo lendário designer Will Wright (criador de The Sims e SimCity), o jogo permite que o jogador controle 
                o desenvolvimento de uma espécie desde seus primórdios como um organismo microscópico até se tornar uma civilização 
                intergaláctica avançada.
              </p>
              <br/>
              <p>
                O grande destaque de Spore é a sua engine de geração procedural, que permite aos jogadores desenharem 
                suas próprias criaturas, veículos e edifícios. O jogo então anima essas criações magicamente, entendendo 
                onde estão as pernas, braços e o peso da criatura, criando uma experiência verdadeiramente única e personalizada para cada jogador.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'evolution' && (
          <div className="section-container">
            <h2>A História da Evolução (As 5 Fases)</h2>
            
            <div className="evolution-stage">
              <div className="evolution-icon"><Dna size={40} color="var(--primary-color)"/></div>
              <div className="evolution-content">
                <h3>1. Fase Célula</h3>
                <p>A jornada começa em uma poça primordial. Você controla um microrganismo (carnívoro, herbívoro ou onívoro), fugindo de predadores maiores e comendo para evoluir e ganhar novas partes como espinhos e flagelos.</p>
              </div>
            </div>

            <div className="evolution-stage">
              <div className="evolution-icon"><Dna size={40} color="var(--primary-color)"/></div>
              <div className="evolution-content">
                <h3>2. Fase Criatura</h3>
                <p>Sua espécie cria pernas e vai para a terra firme. Aqui o jogo se torna um RPG em terceira pessoa, onde você deve fazer alianças com outras espécies ou extingui-las para ganhar DNA e evoluir seu cérebro.</p>
              </div>
            </div>

            <div className="evolution-stage">
              <div className="evolution-icon"><Users size={40} color="var(--primary-color)"/></div>
              <div className="evolution-content">
                <h3>3. Fase Tribal</h3>
                <p>Sua espécie alcança a senciência. Em vez de controlar uma única criatura, você comanda uma tribo inteira, utilizando ferramentas, armas e instrumentos musicais para dominar a região.</p>
              </div>
            </div>

            <div className="evolution-stage">
              <div className="evolution-icon"><Users size={40} color="var(--primary-color)"/></div>
              <div className="evolution-content">
                <h3>4. Fase Civilização</h3>
                <p>Sua tribo funda a primeira cidade. A visão muda para um macro-gerenciamento de RTS global, onde você deve conquistar o planeta inteiro por meio de diplomacia, religião ou força militar bruta.</p>
              </div>
            </div>

            <div className="evolution-stage">
              <div className="evolution-icon"><Gamepad2 size={40} color="var(--primary-color)"/></div>
              <div className="evolution-content">
                <h3>5. Fase Espacial</h3>
                <p>Com o planeta unificado, você constrói uma nave e viaja para as estrelas. Esta fase não tem fim; você pode explorar uma galáxia inteira, colonizar planetas, terraformar, interagir com alienígenas criados por outros jogadores e buscar o centro da galáxia.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'creators' && (
          <div className="section-container">
            <h2>Criadores e Franquia</h2>
            <div className="card">
              <h3>A Mente por trás: Will Wright e a Maxis</h3>
              <p>
                Spore foi o último grande projeto de <strong>Will Wright</strong> antes de deixar a Maxis e a Electronic Arts. 
                Sua visão era criar uma "caixa de brinquedos universal". O conceito de misturar tantas mecânicas diferentes 
                (Pac-Man, Diablo, Populous, Civilization e Master of Orion) foi um marco na indústria.
              </p>
            </div>
            <div className="card">
              <h3>A Franquia e Expansões</h3>
              <p>Spore recebeu algumas expansões e spin-offs oficiais:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li><strong>Spore Creepy & Cute Parts Pack (2008):</strong> Adicionou partes focadas em terror e fofura.</li>
                <li><strong>Spore Galactic Adventures (2009):</strong> Uma expansão massiva que permitia aos jogadores criarem suas próprias missões (como um criador de níveis em 3D) para seus capitães espaciais.</li>
                <li><strong>Spore Hero (Wii) e Hero Arena (DS):</strong> Spin-offs mais focados em aventura e luta de criaturas.</li>
                <li><strong>Darkspore (2011):</strong> Um ARPG isométrico focado em combate, que infelizmente teve seus servidores desligados e não é mais jogável.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Haverá um "Spore 2"?</h3>
              <p>
                Atualmente, não há planos oficiais da Electronic Arts para um "Spore 2". A Maxis foi reestruturada ao longo 
                dos anos, focando primariamente na franquia The Sims. No entanto, a comunidade ativa de modificadores (modders) 
                ainda cria novas partes de criaturas e melhorias gráficas. Além disso, jogos independentes como <i>Elysian Eclipse</i> 
                e <i>Thrive</i> estão atualmente em desenvolvimento por fãs, tentando reviver o conceito evolutivo de Spore de forma moderna.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'curiosities' && (
          <div className="section-container">
            <h2>20 Curiosidades sobre Spore</h2>
            <div className="curiosities-grid">
              {curiosities.map((text, index) => (
                <div key={index} className="curiosity-card">
                  <div className="curiosity-number">{index + 1}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Desenvolvido para os fãs de <span className="text-gradient">SPORE</span>.</p>
      </footer>
    </div>
  );
}

export default App;
