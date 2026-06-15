export const questionPool = [
  // 1. MACRO-GENRE
  {
    id: "q_root",
    tag: "root",
    text: "O que espreita nas sombras do seu pesadelo mais profundo?",
    options: [
      { text: "Um assassino mascarado com sede de sangue.", boostTags: ["slasher", "serial_killer"] },
      { text: "Espíritos rancorosos e assombrações de casas.", boostTags: ["sobrenatural", "fantasma", "casa_assombrada"] },
      { text: "A possessão demoníaca e rituais do inferno.", boostTags: ["demonio", "possessao", "exorcismo"] },
      { text: "Aberrações da natureza, aliens ou zumbis famintos.", boostTags: ["monstro", "alien", "zumbi"] },
      { text: "A quebra da mente humana e paranóia psicológica.", boostTags: ["psicologico", "loucura"] },
      { text: "Tortura agonizante, armadilhas cruéis e sadismo.", boostTags: ["gore", "tortura"] }
    ]
  },
  
  // 2. ERA
  {
    id: "q_era",
    tag: "era",
    text: "Em qual época esse pesadelo se desenrola?",
    options: [
      { text: "No preto e branco ou cores saturadas dos Clássicos (Pré-1980).", boostTags: ["classico"] },
      { text: "Na nostálgica era dos anos 80, com efeitos práticos.", boostTags: ["anos_80"] },
      { text: "No tom irônico, adolescente e grunge dos anos 90.", boostTags: ["anos_90"] },
      { text: "Nas câmeras tremidas e remakes sombrios dos anos 2000.", boostTags: ["anos_2000"] },
      { text: "Num terror estético, hiper-realista ou moderno (A24 vibes).", boostTags: ["moderno"] },
      { text: "O tempo não importa, apenas o medo e a morte importam.", boostTags: [] }
    ]
  },

  // 3. SETTING
  {
    id: "q_setting",
    tag: "setting",
    text: "Onde ocorre o massacre ou a assombração?",
    options: [
      { text: "Em uma cabana isolada na floresta escura.", boostTags: ["cabana", "floresta"] },
      { text: "No confinamento claustrofóbico de um quarto ou casa.", boostTags: ["casa_assombrada", "confinamento"] },
      { text: "No vazio silencioso e mortal do espaço sideral.", boostTags: ["espaco_sideral"] },
      { text: "Nas ruas caóticas da cidade, entre cidadãos comuns.", boostTags: ["cidade"] },
      { text: "Em um hospital psiquiátrico, asilo ou convento isolado.", boostTags: ["asilo", "hospital", "igreja"] },
      { text: "Em um labirinto, prisão ou armadilha inescapável.", boostTags: ["jogos_mortais"] }
    ]
  },

  // 4. SLASHER/WEAPON
  {
    id: "q_weapon",
    tag: "slasher",
    text: "Como o antagonista executa suas vítimas de forma brutal?",
    options: [
      { text: "Rasgando carne com motosserras, machados ou facões rústicos.", boostTags: ["slasher", "forca_bruta"] },
      { text: "Com lâminas silenciosas, como facas de cozinha perfeitamente polidas.", boostTags: ["slasher", "faca", "halloween"] },
      { text: "Manipulando dispositivos letais onde a vítima deve se mutilar.", boostTags: ["tortura", "armadilha"] },
      { text: "Atacando nos sonhos, usando garras ou manipulação da realidade.", boostTags: ["psicologico", "luva_lamina"] },
      { text: "De forma inumana, arrancando membros com força bestial.", boostTags: ["monstro", "lobisomem"] },
      { text: "Não executa. A vítima apenas se contorce sofrendo internamente.", boostTags: ["possessao", "fantasma"] }
    ]
  },

  // 5. GHOST MANIFESTATION
  {
    id: "q_paranormal",
    tag: "sobrenatural",
    text: "Como a entidade paranormal avisa que está no ambiente?",
    options: [
      { text: "Objetos levitam, portas batem e cadeiras se empilham sozinhas.", boostTags: ["poltergeist", "casa_assombrada"] },
      { text: "Através da tela de uma TV antiga, estática ou ligações macabras.", boostTags: ["tecnologia_maldita", "telefone"] },
      { text: "O próprio rosto do familiar se contorce com um sorriso demoníaco.", boostTags: ["possessao", "sorriso"] },
      { text: "Fitas de vídeo encontradas mostram coisas que você não deveria ver.", boostTags: ["found_footage", "fita_maldita"] },
      { text: "Sussurros nas paredes e figuras de pessoas que morreram ali.", boostTags: ["fantasma", "espirito"] },
      { text: "Um boneco de porcelana pisca os olhos quando você não olha.", boostTags: ["boneco", "artefato_maldito"] }
    ]
  },

  // 6. CREATURE/MONSTER
  {
    id: "q_monster",
    tag: "monstro",
    text: "A aberração que te caça no escuro se parece com:",
    options: [
      { text: "Um morto-vivo putrefato rastejando ou correndo furioso.", boostTags: ["zumbi", "virus"] },
      { text: "Um xenomorfo esguio com sangue ácido no espaço.", boostTags: ["alien", "espaco_sideral"] },
      { text: "Um lorde das trevas sugador de sangue e hipnótico.", boostTags: ["vampiro", "dracula"] },
      { text: "Uma besta de duas toneladas coberta de pelos e garras sob a lua.", boostTags: ["lobisomem", "natureza"] },
      { text: "Um inseto ou parasita gigante tentando te assimilar.", boostTags: ["mutacao", "animal"] },
      { text: "Um ser cósmico de tentáculos com tamanho indescritível.", boostTags: ["horror_cosmico", "lovecraft"] }
    ]
  },

  // 7. CRITICAL SCORE / QUALITY
  {
    id: "q_score",
    tag: "root",
    text: "Qual é o nível da arte cinematográfica do seu pesadelo?",
    options: [
      { text: "Uma obra-prima incontestável, um marco absoluto do cinema (Score 8+).", boostTags: ["obra_prima"] },
      { text: "Um filme visceral e tenso, muito elogiado pela crítica (Score 7+).", boostTags: ["aclamado"] },
      { text: "Um terror divertido, que entrega exatamente o que promete (Mediano).", boostTags: ["pipoca"] },
      { text: "B-Movie maravilhoso, atuações toscas e baldes de sangue falso (Score <6).", boostTags: ["trash_b_movie"] },
      { text: "Gore exagerado com humor negro, pra rir com os amigos (Trash cômico).", boostTags: ["comedia_terror"] },
      { text: "Uma adaptação brilhante e lenta da literatura (Stephen King vibes).", boostTags: ["stephen_king"] }
    ]
  },

  // 8. FINAL FATE
  {
    id: "q_twist",
    tag: "plot",
    text: "O que acontece nos cinco minutos finais do filme perfeito?",
    options: [
      { text: "O vilão senta, e a câmera afasta revelando que a maldição continua.", boostTags: ["franquia", "slasher"] },
      { text: "O protagonista percebe num espelho que ELE era o vilão o tempo todo.", boostTags: ["psicologico", "plot_twist"] },
      { text: "O padre grita o último feitiço e a fumaça preta é expurgada (Temporariamente).", boostTags: ["exorcismo"] },
      { text: "A última mulher viva explode tudo e foge rindo/chorando em transe.", boostTags: ["gore", "vinganca", "final_girl"] },
      { text: "A bateria da câmera pisca 'Sem Carga' e a tela corta para o preto.", boostTags: ["found_footage"] },
      { text: "A humanidade é obliterada e monstros tomam a tela.", boostTags: ["zumbi", "alien"] }
    ]
  },

  // 9. RELIGION / OCCULT
  {
    id: "q_occult",
    tag: "demonio",
    text: "De onde surgiu a maldição ancestral que afeta a sua casa?",
    options: [
      { text: "Um culto de bruxas isoladas que sacrificam bebês ou animais.", boostTags: ["bruxaria", "culto"] },
      { text: "Punição cristã divina. Um padre precisa enfrentar um príncipe do inferno.", boostTags: ["exorcismo", "padre", "igreja"] },
      { text: "Fomos brincar com o tabuleiro Ouija/cartas e abrimos um portal.", boostTags: ["fantasma", "jogo_oculto"] },
      { text: "Lemos um livro feito de pele humana encontrado no porão do avô.", boostTags: ["necronomicon", "evocacao"] },
      { text: "Não é maldição. É um surto psicológico gerado por luto materno.", boostTags: ["psicologico", "drama_familiar"] },
      { text: "Um rito milenar feito por aristocratas vampiros da era Vitoriana.", boostTags: ["vampiro", "classico"] }
    ]
  },

  // 10. HUMAN FLAW
  {
    id: "q_human",
    tag: "vitima",
    text: "Por que você está morrendo? Qual foi o seu erro?",
    options: [
      { text: "Eu transei, fumei maconha ou fiz bullying num acampamento (O Trope).", boostTags: ["anos_80", "slasher", "vinganca"] },
      { text: "Meu marido me traiu e mudamos para uma casa barata, mas assombrada.", boostTags: ["drama_familiar", "casa_assombrada"] },
      { text: "Paguei por férias sexuais/turísticas no Leste Europeu e me sequestraram.", boostTags: ["tortura", "gore", "sociedade"] },
      { text: "Apertei o botão que desligou os escudos da nave de contenção alienígena.", boostTags: ["alien", "espaco_sideral"] },
      { text: "Acessei a Deep Web sem saber quem eu estava assistindo.", boostTags: ["found_footage", "tecnologia_maldita"] },
      { text: "Não errei. Fui escolhido aleatoriamente por um psicopata niilista.", boostTags: ["serial_killer", "violencia_gratuita"] }
    ]
  },

  // 11. ZOMBIE/INFECTION
  {
    id: "q_zombie",
    tag: "zumbi",
    text: "No apocalipse dos mortos, a sua prioridade seria:",
    options: [
      { text: "Correr loucamente (Os infectados correm e espumam de raiva).", boostTags: ["infeccao", "moderno"] },
      { text: "Trancar-se num shopping (Os zumbis são lentos e burros).", boostTags: ["zumbi", "classico", "anos_70"] },
      { text: "Dar risada enquanto arranca cabeças com um cortador de grama.", boostTags: ["comedia_terror", "trash_b_movie", "gore"] },
      { text: "Desconfiar mais dos humanos do acampamento do que dos mortos.", boostTags: ["apocalipse", "sociedade"] },
      { text: "Usar tecnologia militar sofisticada que não adianta nada contra eles.", boostTags: ["virus", "scifi"] },
      { text: "Curar o vírus geneticamente modificado em um laboratório branco.", boostTags: ["virus", "medico"] }
    ]
  },

  // 12. FOUND FOOTAGE / TECH
  {
    id: "q_tech",
    tag: "found_footage",
    text: "Como você está filmando sua própria morte?",
    options: [
      { text: "Com a webcam do meu laptop presa no Zoom/Skype com meus amigos.", boostTags: ["tecnologia_maldita", "amigos", "moderno"] },
      { text: "Com uma câmera de fita analógica no meio de uma floresta fria.", boostTags: ["found_footage", "bruxaria", "anos_90"] },
      { text: "Apertando o celular na mão enquanto transmito live para redes sociais.", boostTags: ["moderno", "sociedade"] },
      { text: "Através das Câmeras de Segurança lentas instaladas no meu quarto.", boostTags: ["atividade_paranormal", "fantasma"] },
      { text: "Encontrei cassetes amaldiçoados (V/H/S) num porão cheirando a mofo.", boostTags: ["fita_maldita", "gore"] },
      { text: "Através da TV estática com uma garotinha falando com fantasmas.", boostTags: ["classico", "sobrenatural"] }
    ]
  },

  // 13. PSYCHO / MIND
  {
    id: "q_mind",
    tag: "psicologico",
    text: "Se você perder a sanidade, o que vai fazer com os outros?",
    options: [
      { text: "Isolar a mim mesmo e escrever a mesma frase 10.000 vezes na neve.", boostTags: ["loucura", "confinamento", "stephen_king"] },
      { text: "Alimentar os segredos sombrios de um culto rural à luz do sol (Midsommar).", boostTags: ["culto", "natureza", "moderno"] },
      { text: "Ter uma dupla personalidade que mata durante apagões.", boostTags: ["plot_twist", "mente"] },
      { text: "Cortar meu próprio rosto acreditando que há insetos debaixo da pele.", boostTags: ["paranoia", "gore", "body_horror"] },
      { text: "Enxergar os meus familiares como impostores que querem me destruir.", boostTags: ["drama_familiar", "psicologico"] },
      { text: "Sequestrar minha atriz favorita e amarrá-la na cama para mim.", boostTags: ["serial_killer", "obsessao"] }
    ]
  },

  // 14. GORE / TORTURE
  {
    id: "q_gore",
    tag: "gore",
    text: "Na pior sala do inferno, você deve escolher seu castigo:",
    options: [
      { text: "Serrar a própria perna com um arco de serra oxidado.", boostTags: ["jogos_mortais", "armadilha"] },
      { text: "Ter agulhas inseridas em cada terminação nervosa pela glória divina.", boostTags: ["cenobita", "hellraiser", "sadismo"] },
      { text: "Ser comido vivo, pedaço por pedaço, por canibais em uma ilha.", boostTags: ["canibal", "trash_b_movie", "anos_70"] },
      { text: "Cair no covil da aranha alienígena gigante em outro planeta.", boostTags: ["alien", "espaco_sideral", "mutacao"] },
      { text: "Participar do expurgo, onde a morte é um negócio estatal.", boostTags: ["sociedade", "vinganca"] },
      { text: "Ser esfolado lentamente por caipiras sádicos em uma fazenda.", boostTags: ["serial_killer", "interior", "texas"] }
    ]
  },

  // 15. AESTHETIC
  {
    id: "q_aesthetic",
    tag: "root",
    text: "Feche os olhos. Qual é a paleta de cores do seu pesadelo ideal?",
    options: [
      { text: "Monocromático, sombras expressionistas alemãs.", boostTags: ["classico", "preto_e_branco"] },
      { text: "Vermelho sangue e texturas úmidas, banhado a neon barato.", boostTags: ["anos_80", "giallo"] },
      { text: "Tons de verde e azul frios de fita VHS estourada.", boostTags: ["found_footage", "anos_90"] },
      { text: "Tudo cinza e morto, a verdadeira melancolia em alta definição.", boostTags: ["psicologico", "anos_2000"] },
      { text: "Cores solares e vívidas escondendo sacrifícios bizarros (A24 vibes).", boostTags: ["moderno", "culto"] },
      { text: "O breu absoluto. Tela preta com apenas sons agoniantes.", boostTags: ["suspense_sonoro", "indie"] }
    ]
  }
];
