export const rootQuestion = {
  id: "root",
  text: "A noite cai e a energia acaba. Qual som faz o seu sangue gelar de imediato?",
  options: [
    { text: "O ruído mecânico de uma serra elétrica ou faca afiando.", path: "slasher", boost: { category: "Slasher / Serial Killer" } },
    { text: "Sussurros invisíveis ecoando do teto e portas batendo sozinhas.", path: "sobrenatural", boost: { category: "Sobrenatural / Fantasmas" } },
    { text: "Gritos de dor agonizante e cheiro de ferrugem/sangue.", path: "gore", boost: { category: "Gore / Tortura" } },
    { text: "Sua própria voz, rindo histericamente de um cômodo vazio.", path: "psicologico", boost: { category: "Terror Psicológico" } },
    { text: "Passos pesados, garras arranhando o assoalho e rugidos inumanos.", path: "monstros", boost: { category: "Monstros Clássicos / Bruxaria" } }
  ]
};

export const branchQuestions = {
  slasher: [
    {
      text: "O assassino arrombou a porta. Onde você se esconde?",
      options: [
        { text: "No armário de madeira antigo (Clássicos Anos 80)", boost: { era: [1970, 1989] } },
        { text: "Corro para o bosque escuro (Slasher rural/Acampamentos)", boost: { title: "Sexta-Feira 13" } },
        { text: "Tranco-me no banheiro com o celular (Slasher Teen Anos 90)", boost: { era: [1990, 2005] } },
        { text: "Enfrento ele na cozinha com uma panela (Humor/Trash)", boost: { audience: "Gore divertido" } },
        { text: "No porão, onde as ferramentas estão (Violência pesada)", boost: { category: "Gore / Tortura" } }
      ]
    },
    {
      text: "O assassino possui uma característica inconfundível. Qual?",
      options: [
        { text: "Ele usa uma máscara branca sem expressões.", boost: { title: "Halloween" } },
        { text: "Ele ataca através dos seus próprios sonhos.", boost: { title: "A Hora do Pesadelo" } },
        { text: "Ele corre insanamente rápido e nunca cansa.", boost: { title: "O Massacre da Serra Elétrica" } },
        { text: "Ele liga para você antes de atacar.", boost: { title: "Pânico" } },
        { text: "É uma boneca ou brinquedo inofensivo.", boost: { title: "Brinquedo Assassino" } }
      ]
    },
    {
      text: "Sua arma de defesa improvisada é:",
      options: [
        { text: "Um machado de lenhador.", boost: { title: "O Iluminado" } },
        { text: "Uma espingarda antiga enferrujada.", boost: { category: "Slasher / Serial Killer" } },
        { text: "Apenas correr o mais rápido possível.", boost: { category: "Found Footage" } },
        { text: "Uma faca de cozinha furtada.", boost: { title: "Psicose" } },
        { text: "Armadilhas preparadas pela casa (Esqueceram de Mim sombrio).", boost: { title: "Jogos Mortais" } }
      ]
    },
    {
      text: "O filme perfeito termina com:",
      options: [
        { text: "A Final Girl coberta de sangue sobrevivendo sozinha.", boost: { category: "Slasher / Serial Killer" } },
        { text: "O assassino levantando no fundo, revelando que é imortal.", boost: { era: [1980, 1999] } },
        { text: "Todos morrem. O mal vence.", boost: { category: "Terror Psicológico" } },
        { text: "Uma explicação traumática sobre o passado do vilão.", boost: { category: "Suspense Macabro" } },
        { text: "A polícia chegando tarde demais.", boost: { audience: "Slasher clássico" } }
      ]
    }
  ],
  sobrenatural: [
    {
      text: "Como o além começa a se manifestar na sua casa?",
      options: [
        { text: "Cadeiras se movem sozinhas e portas batem fortemente.", boost: { title: "Invocação do Mal" } },
        { text: "Através da estática da TV e ruídos brancos.", boost: { title: "Poltergeist" } },
        { text: "O cachorro late para o vazio da escada.", boost: { era: [2000, 2015] } },
        { text: "Câmeras de segurança flagram vultos enquanto eu durmo.", boost: { title: "Atividade Paranormal" } },
        { text: "Marcas roxas e cortes aparecem no meu corpo de manhã.", boost: { title: "A Entidade" } }
      ]
    },
    {
      text: "Quem você chama para investigar o fenômeno?",
      options: [
        { text: "Um padre veterano especializado em Exorcismo.", boost: { title: "O Exorcista" } },
        { text: "Um casal de demonologistas charlatões... ou não.", boost: { title: "Invocação do Mal" } },
        { text: "Ninguém. Eu compro dezenas de câmeras.", boost: { category: "Found Footage" } },
        { text: "Uma médium vidente idosa.", boost: { title: "Sobrenatural" } },
        { text: "A polícia local, que não acredita em mim.", boost: { category: "Suspense Macabro" } }
      ]
    },
    {
      text: "A verdadeira face da entidade finalmente é revelada. Ela parece...",
      options: [
        { text: "Uma figura religiosa deturpada (Freira/Padre profano).", boost: { title: "A Freira" } },
        { text: "Uma criança macabra de cabelos longos.", boost: { title: "O Chamado" } },
        { text: "Um demônio de rosto vermelho brilhante e cascos.", boost: { title: "Sobrenatural" } },
        { text: "Uma sombra abstrata que espreita nos cantos.", score: 1 },
        { text: "Alguém idêntico a mim, sorrindo maliciosamente.", boost: { title: "Nós" } }
      ]
    },
    {
      text: "O desfecho do fenômeno espiritual deve culminar em:",
      options: [
        { text: "Um exorcismo brutal onde a cama levita e ossos quebram.", boost: { category: "Demônios / Possessão" } },
        { text: "O fantasma descansa em paz ao encontrar os ossos ocultos.", boost: { title: "O Sexto Sentido" } },
        { text: "A família abandona a casa correndo sem levar nada.", boost: { title: "Horror em Amityville" } },
        { text: "O demônio é transferido para uma boneca de porcelana.", boost: { title: "Annabelle" } },
        { text: "Eles percebem que a assombração não era a casa, eram eles.", boost: { title: "Os Outros" } }
      ]
    }
  ],
  gore: [
    {
      text: "Você acorda amarrado. Qual o dispositivo à sua frente?",
      options: [
        { text: "Uma armadilha mecânica enferrujada com contagem regressiva.", boost: { title: "Jogos Mortais" } },
        { text: "Ferramentas cirúrgicas num porão sujo no leste europeu.", boost: { title: "O Albergue" } },
        { text: "Uma fita cassete deprimente explicando as regras.", boost: { category: "Gore / Tortura" } },
        { text: "Membros do seu próprio grupo armados até os dentes.", boost: { title: "Uma Noite de Crime" } },
        { text: "Centenas de caixas interdimensionais brilhantes.", boost: { title: "Hellraiser" } }
      ]
    },
    {
      text: "O mestre da tortura te oferece uma saída em troca de:",
      options: [
        { text: "Cortar fora seu próprio membro.", boost: { title: "Jogos Mortais" } },
        { text: "Não há saída. Apenas a descoberta da dor divina.", boost: { title: "Mártires" } },
        { text: "Você deve matar o seu melhor amigo.", boost: { category: "Gore / Tortura" } },
        { text: "Resolver um enigma sombrio antes de sangrar.", boost: { title: "O Cubo" } },
        { text: "Agir como um cão e devorar os restos.", boost: { title: "A Centopeia Humana" } }
      ]
    },
    {
      text: "O nível de sanguinolência do seu filme perfeito é:",
      options: [
        { text: "100% Extremo, perturbador, banimento em 50 países.", boost: { title: "A Serbian Film" } },
        { text: "Médio. Sangue realista para passar o choque.", boost: { category: "Gore / Tortura" } },
        { text: "Tarantinesco! Sangue jorrando que nem chafariz cômico.", boost: { title: "Planeta Terror" } },
        { text: "Sofro mais pelo psicológico do que pelo sangue.", boost: { category: "Terror Psicológico" } },
        { text: "Corpos virados do avesso por demônios dimensionais.", boost: { title: "Hellraiser" } }
      ]
    },
    {
      text: "O castigo da sua história é aplicado a quem?",
      options: [
        { text: "Adolescentes irresponsáveis que entraram na casa errada.", boost: { title: "O Massacre da Serra Elétrica" } },
        { text: "Pessoas hipócritas que não dão valor à própria vida.", boost: { title: "Jogos Mortais" } },
        { text: "Criminosos na noite anual do expurgo.", boost: { title: "Uma Noite de Crime" } },
        { text: "Turistas americanos ricos em um país estranho.", boost: { title: "O Albergue" } },
        { text: "Cientistas que queriam brincar de Deus.", boost: { title: "A Mosca" } }
      ]
    }
  ],
  psicologico: [
    {
      text: "Onde o terror psicológico se desenrola na sua mente?",
      options: [
        { text: "Num hotel imenso no meio da neve e completamente vazio.", boost: { title: "O Iluminado" } },
        { text: "Em um farol isolado com um velho capitão que cheira a rum.", boost: { title: "O Farol" } },
        { text: "Num culto bizarro à luz do dia em um país distante.", boost: { title: "Midsommar" } },
        { text: "Na minha própria família cheia de segredos genéticos.", boost: { title: "Hereditário" } },
        { text: "Nas ruas, onde todas as pessoas começam a me olhar sorrindo.", boost: { title: "Sorria" } }
      ]
    },
    {
      text: "Qual é o grande plot twist perturbador que destrói a sua sanidade?",
      options: [
        { text: "Descobrir que todas as mortes foram causadas por você mesmo (Personalidade Dupla).", boost: { title: "Fragmentado" } },
        { text: "Descobrir que não há monstro, é apenas luto não tratado tomando forma.", boost: { title: "O Babadook" } },
        { text: "Perceber que todo o culto e as mentiras foram arquitetados pelos seus pais.", boost: { title: "Corra!" } },
        { text: "Descobrir que você já estava morto desde o começo.", boost: { title: "O Sexto Sentido" } },
        { text: "A revelação do trauma de infância ser a raiz do mal.", boost: { title: "A Entidade" } }
      ]
    },
    {
      text: "Como você percebe que perdeu o contato com a realidade?",
      options: [
        { text: "Objetos de casa aparecem no teto e as paredes pulsam.", boost: { category: "Sobrenatural / Fantasmas" } },
        { text: "O monstro tem exatamente a aparência da minha mãe.", boost: { title: "Boa Noite, Mamãe" } },
        { text: "Eu passo a conversar com um coelho gigante e perturbador.", boost: { title: "Donnie Darko" } },
        { text: "Fitas de vídeo antigas revelam eu matando minha família.", boost: { title: "A Entidade" } },
        { text: "Começo a achar sacrifícios humanos fascinantes.", boost: { title: "Midsommar" } }
      ]
    },
    {
      text: "No fim das contas, a pior parte da mente humana é:",
      options: [
        { text: "O Isolamento, que devora qualquer um sem avisar.", boost: { title: "O Iluminado" } },
        { text: "O Racismo estrutural enraizado e velado.", boost: { title: "Corra!" } },
        { text: "A Depressão, que se manifesta como um bicho-papão.", boost: { title: "O Babadook" } },
        { text: "A Maldade inata da inveja pelas vidas dos outros.", boost: { title: "Nós" } },
        { text: "O Fanatismo Religioso cego e impiedoso.", boost: { title: "A Bruxa" } }
      ]
    }
  ],
  monstros: [
    {
      text: "Qual é a origem da besta que assola a sua cidade?",
      options: [
        { text: "Uma estação de pesquisa na gélida Antártida (Alien metamorfo).", boost: { title: "A Coisa" } },
        { text: "Laboratórios secretos manipulando genética.", boost: { title: "A Mosca" } },
        { text: "O fundo mais abissal do oceano.", boost: { title: "Cloverfield" } },
        { text: "Um pacto satânico nas florestas escuras (A Bruxa/O Bode).", boost: { title: "A Bruxa" } },
        { text: "Uma mordida infectada sob a luz da lua cheia.", boost: { title: "Um Lobisomem Americano em Londres" } }
      ]
    },
    {
      text: "O ciclo de vida da criatura envolve...",
      options: [
        { text: "Colocar ovos no peito dos hospedeiros para explodir.", boost: { title: "Alien" } },
        { text: "Assimilar células e imitar a vítima perfeitamente.", boost: { title: "A Coisa" } },
        { text: "Devorar carne para ganhar tamanho e massa.", boost: { title: "A Bolha Assassina" } },
        { text: "Apenas se levantar como um cadáver purulento e morder outros.", boost: { title: "Madrugada dos Mortos" } },
        { text: "Transformar a pessoa lentamente, como dentes caindo e muco.", boost: { title: "A Mosca" } }
      ]
    },
    {
      text: "A pior desvantagem humana frente ao monstro é:",
      options: [
        { text: "Nós precisamos fazer barulho, eles escutam tudo.", boost: { title: "Um Lugar Silencioso" } },
        { text: "Nós precisamos olhar, se olhar você enlouquece ou morre.", boost: { title: "Bird Box" } },
        { text: "Eles se camuflam exatamente como nós.", boost: { title: "A Coisa" } },
        { text: "Eles são rápidos, formam hordas e são incansáveis.", boost: { title: "Guerra Mundial Z" } },
        { text: "O sangue deles é ácido e derrete aço.", boost: { title: "Alien" } }
      ]
    },
    {
      text: "Para derrotar a fera na cena épica final, você usaria:",
      options: [
        { text: "Lança-chamas, purificando tudo com fogo.", boost: { title: "A Coisa" } },
        { text: "Ser ejetado por uma câmara de ar para o espaço.", boost: { title: "Alien" } },
        { text: "Uma bala de prata abençoada de perto.", boost: { title: "Bala de Prata" } },
        { text: "Apenas aceitar a transformação e voar para longe.", boost: { title: "A Mosca" } },
        { text: "Bater na criatura com frequência de áudio ultrassônica.", boost: { title: "Um Lugar Silencioso" } }
      ]
    }
  ]
};
