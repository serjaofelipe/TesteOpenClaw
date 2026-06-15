import { useState, useEffect } from 'react';
import './index.css';

const moviesDB = [
  {
    id: 1,
    title: "Nosferatu",
    year: 1922,
    story: "O corretor de imóveis Hutter precisa vender um castelo cujo proprietário é o excêntrico conde Graf Orlock. Ao chegar ao local, Hutter descobre que Orlock é um vampiro milenar que espalha o terror e a peste na região de Bremen, na Alemanha.",
    curiosities: [
      "Primeira adaptação não oficial do livro 'Drácula' de Bram Stoker.",
      "A viúva de Bram Stoker processou o estúdio por direitos autorais e ganhou, ordenando a destruição de todas as cópias. Algumas sobreviveram, salvando o filme.",
      "O visual de Max Schreck (Conde Orlok) inspirou inúmeros vampiros monstruosos modernos."
    ],
    characters: ["Conde Orlok", "Thomas Hutter", "Ellen Hutter"],
    inspiration: "O livro 'Drácula' de Bram Stoker.",
    ageRating: "12 Anos",
    audience: "Fãs de expressionismo alemão e clássicos mudos."
  },
  {
    id: 2,
    title: "O Exorcista",
    year: 1973,
    story: "Uma atriz percebe comportamentos assustadores e inexplicáveis em sua filha de 12 anos. Quando os médicos não encontram uma explicação científica para os sintomas da menina, ela pede ajuda a dois padres, que determinam que a jovem está possuída por uma entidade demoníaca.",
    curiosities: [
      "Foi o primeiro filme de terror a ser indicado ao Oscar de Melhor Filme.",
      "A voz do demônio Pazuzu foi feita pela atriz de rádio Mercedes McCambridge, que bebeu whisky, fumou e comeu ovos crus para rasgar a voz.",
      "O set de gravação do quarto de Regan era mantido a temperaturas abaixo de zero para que a respiração dos atores ficasse visível."
    ],
    characters: ["Regan MacNeil", "Padre Merrin", "Padre Karras", "Pazuzu"],
    inspiration: "O livro homônimo de William Peter Blatty, supostamente baseado em um caso real de exorcismo em 1949 (o caso de Roland Doe).",
    ageRating: "18 Anos",
    audience: "Fãs de terror psicológico e possessões demoníacas viscerais."
  },
  {
    id: 3,
    title: "O Iluminado",
    year: 1980,
    story: "Jack Torrance se torna zelador de inverno do isolado Hotel Overlook, nas montanhas do Colorado. Ele leva sua esposa e seu filho, que possui habilidades telepáticas. À medida que o isolamento e as forças sobrenaturais do hotel começam a afetar a sanidade de Jack, a família entra em perigo.",
    curiosities: [
      "Stephen King (autor do livro original) notoriamente detesta esta adaptação de Stanley Kubrick.",
      "Kubrick fez Shelley Duvall refazer a cena do taco de beisebol 127 vezes, quebrando um recorde mundial.",
      "A famosa fala 'Here's Johnny!' foi improvisada por Jack Nicholson, inspirada na introdução do programa The Tonight Show."
    ],
    characters: ["Jack Torrance", "Wendy Torrance", "Danny Torrance", "Dick Hallorann"],
    inspiration: "O livro 'The Shining' de Stephen King.",
    ageRating: "16 Anos",
    audience: "Amantes de terror psicológico, tensão crescente e cinema autoral."
  },
  {
    id: 4,
    title: "A Hora do Pesadelo",
    year: 1984,
    story: "Adolescentes de uma vizinhança pacata de Springwood começam a ser perseguidos em seus pesadelos por um homem com o rosto desfigurado, usando um suéter listrado e uma luva com lâminas. Eles descobrem que se morrerem no sonho, morrem na vida real.",
    curiosities: [
      "O conceito de morrer em pesadelos foi inspirado em uma série de artigos de jornal sobre refugiados do Camboja que morriam inexplicavelmente enquanto dormiam.",
      "Foi o filme de estreia de Johnny Depp no cinema.",
      "Para a cena em que uma das vítimas é puxada para dentro da cama e uma fonte de sangue espirra para o teto, o quarto inteiro foi construído de cabeça para baixo."
    ],
    characters: ["Freddy Krueger", "Nancy Thompson", "Glen Lantz"],
    inspiration: "Artigos do LA Times sobre as 'Mortes Noturnas Súbitas Inesperadas'.",
    ageRating: "16 Anos",
    audience: "Fãs de slasher, anos 80 e terror sobrenatural."
  },
  {
    id: 5,
    title: "Sexta-Feira 13",
    year: 1980,
    story: "Conselheiros adolescentes são brutalmente assassinados um a um por um assassino misterioso enquanto tentam reabrir o Acampamento Crystal Lake, um local que tem a fama de ser amaldiçoado após o afogamento de um garoto chamado Jason anos atrás.",
    curiosities: [
      "Neste primeiro filme, o assassino não é o famoso Jason Voorhees, mas sim sua mãe, Pamela Voorhees.",
      "Foi criado independentemente para pegar carona no sucesso financeiro de Halloween (1978).",
      "O icônico som 'ki ki ki, ma ma ma' do filme foi criado pelo compositor Harry Manfredini."
    ],
    characters: ["Pamela Voorhees", "Jason Voorhees (Criança)", "Alice Hardy"],
    inspiration: "Inspirado diretamente pelo formato slasher estabelecido por Halloween.",
    ageRating: "18 Anos",
    audience: "Fãs de filmes Slasher clássicos, sangue e sustos."
  },
  {
    id: 6,
    title: "Pânico",
    year: 1996,
    story: "Um ano após a morte de sua mãe, a estudante Sidney Prescott e seus amigos tornam-se alvos de um serial killer mascarado, conhecido como Ghostface, que usa filmes de terror como parte de seu jogo sádico.",
    curiosities: [
      "Revitalizou o gênero Slasher nos anos 90 introduzindo a metalinguagem, onde os próprios personagens conhecem as 'regras' dos filmes de terror.",
      "O título original do roteiro era 'Scary Movie' (título depois usado na paródia 'Todo Mundo em Pânico').",
      "A máscara de Ghostface foi descoberta acidentalmente durante a busca por locações."
    ],
    characters: ["Sidney Prescott", "Ghostface", "Gale Weathers", "Dewey Riley"],
    inspiration: "Os assassinatos de Gainesville Ripper nos anos 90.",
    ageRating: "16 Anos",
    audience: "Fãs de mistério, metalinguagem e suspense adolescente."
  },
  {
    id: 7,
    title: "Invocação do Mal",
    year: 2013,
    story: "Os investigadores paranormais renomados Ed e Lorraine Warren são chamados para ajudar uma família aterrorizada por uma presença obscura em uma fazenda isolada.",
    curiosities: [
      "O filme gerou o universo cinematográfico de terror de maior sucesso financeiro da história (O Universo Conjuring).",
      "A verdadeira Lorraine Warren atuou como consultora e chegou a fazer uma breve participação no filme.",
      "A famosa boneca Annabelle existe de verdade, mas na vida real é uma boneca de pano da marca Raggedy Ann, não a boneca de porcelana assustadora dos filmes."
    ],
    characters: ["Ed Warren", "Lorraine Warren", "Bathsheba Sherman", "A Família Perron"],
    inspiration: "Arquivos de casos reais do casal de demonologistas Ed e Lorraine Warren.",
    ageRating: "14 Anos",
    audience: "Fãs de suspense paranormal intenso, jump-scares e casas mal-assombradas."
  },
  {
    id: 8,
    title: "Hereditário",
    year: 2018,
    story: "Após a morte da reclusa avó, a família Graham começa a desvendar segredos terríveis sobre seus ancestrais, descobrindo que herdaram um destino sinistro que não podem evitar.",
    curiosities: [
      "A atuação de Toni Collette foi tão intensa que muitos críticos pediram sua indicação ao Oscar, o que, polemicamente, não aconteceu.",
      "O diretor Ari Aster construiu a casa do filme como um estúdio no estilo casa-de-bonecas para permitir o posicionamento livre da câmera pelas paredes.",
      "Aster descreve o filme primeiramente como uma tragédia familiar antes de ser um filme de terror."
    ],
    characters: ["Annie Graham", "Peter Graham", "Charlie Graham", "Paimon"],
    inspiration: "Medos pessoais do diretor sobre traumas familiares, cultos e tragédia irreversível.",
    ageRating: "18 Anos",
    audience: "Fãs de terror psicológico moderno (A24), drama familiar e terror cult/indie."
  }
];

const charactersDB = [
  { name: "Drácula / Orlok", source: "Nosferatu (1922) / Drácula (1931)", type: "Vampiro", description: "A personificação da fome noturna e praga." },
  { name: "Michael Myers", source: "Halloween (1978)", type: "Slasher (O Bicho-Papão)", description: "A encarnação do mal puro; mudo e imparável." },
  { name: "Jason Voorhees", source: "Sexta-Feira 13 (1980-)", type: "Slasher", description: "O garoto que se afogou, usando uma máscara de hóquei e empunhando um facão." },
  { name: "Freddy Krueger", source: "A Hora do Pesadelo (1984)", type: "Entidade dos Sonhos", description: "O assassino brincalhão que ataca onde você está mais vulnerável: dormindo." },
  { name: "Leatherface", source: "O Massacre da Serra Elétrica (1974)", type: "Slasher Canibal", description: "Usa uma serra elétrica e máscaras feitas de pele humana." },
  { name: "Pinhead", source: "Hellraiser (1987)", type: "Cenobita", description: "Explorador das fronteiras extremas do prazer e da dor através da Configuração do Lamento." },
  { name: "Ghostface", source: "Pânico (1996)", type: "Serial Killer Humano", description: "Sempre uma ou mais pessoas diferentes se escondendo atrás da máscara, motivados por vingança e fama." },
  { name: "Pennywise", source: "IT: A Coisa (1990/2017)", type: "Entidade Cósmica Mimetista", description: "Uma criatura cósmica antiga que se alimenta de medo, assumindo frequentemente a forma de um palhaço dançarino." }
];

function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Animação de gotas de sangue
  useEffect(() => {
    const bg = document.querySelector('.blood-background');
    if(bg) {
      for(let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'drip';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 3 + 2}s`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        bg.appendChild(drop);
      }
    }
  }, []);

  return (
    <div className="app-container">
      <div className="blood-background"></div>
      
      <header>
        <h1>DOSSIÊ DO TERROR</h1>
        <nav>
          <button 
            className={`nav-btn ${activeTab === 'movies' ? 'active' : ''}`}
            onClick={() => setActiveTab('movies')}
          >
            FILMES MACABROS
          </button>
          <button 
            className={`nav-btn ${activeTab === 'characters' ? 'active' : ''}`}
            onClick={() => setActiveTab('characters')}
          >
            ÍCONES DO HORROR
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'movies' && (
          <section>
            <h2 className="section-title">O Arquivo Obscuro</h2>
            <div className="grid">
              {moviesDB.map(movie => (
                <div key={movie.id} className="card" onClick={() => setSelectedMovie(movie)}>
                  <h3>{movie.title}</h3>
                  <div className="year">{movie.year}</div>
                  <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Clique para abrir o dossiê completo...</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'characters' && (
          <section>
            <h2 className="section-title">A Galeria dos Pesadelos</h2>
            <div className="grid">
              {charactersDB.map((char, i) => (
                <div key={i} className="card" style={{ cursor: 'default' }}>
                  <h3>{char.name}</h3>
                  <div className="year">Origem: {char.source}</div>
                  <p style={{ marginBottom: '1rem', color: 'var(--blood-red)' }}><strong>Tipo:</strong> {char.type}</p>
                  <p>{char.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL DO FILME */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>X</button>
            <h2 className="modal-title">{selectedMovie.title}</h2>
            
            <div className="modal-meta">
              <span className="meta-badge">Lançamento: {selectedMovie.year}</span>
              <span className="meta-badge">Censura: {selectedMovie.ageRating}</span>
              <span className="meta-badge" style={{ background: '#333' }}>Para: {selectedMovie.audience}</span>
            </div>

            <div className="modal-section">
              <h4>A História</h4>
              <p>{selectedMovie.story}</p>
            </div>

            <div className="modal-section">
              <h4>A Inspiração Macabra</h4>
              <p>{selectedMovie.inspiration}</p>
            </div>

            <div className="modal-section">
              <h4>Curiosidades Sangrentas</h4>
              <ul>
                {selectedMovie.curiosities.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            <div className="modal-section">
              <h4>Personagens Notáveis</h4>
              <ul>
                {selectedMovie.characters.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Desenvolvido das profundezas do submundo. Não olhe para trás.</p>
      </footer>
    </div>
  );
}

export default App;
