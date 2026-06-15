// AKINATOR DATABASE v3
// Perguntas agora possuem um 'domain' (global, slasher, sobrenatural, gore, psicologico, monstro).

export const questionPool = [
  // ---------------- GLOBAL DOMAIN ----------------
  {
    id: "q_root",
    domain: "root",
    text: "Em qual reino o seu pesadelo habita?",
    options: [
      { text: "Assassinos cruéis, perseguições e facas (Slasher).", boostTags: ["slasher", "serial_killer"] },
      { text: "Espíritos, entidades invisíveis e exorcismos (Sobrenatural).", boostTags: ["sobrenatural", "fantasma", "demonio"] },
      { text: "Loucura, paranóia e quebra de sanidade (Psicológico).", boostTags: ["psicologico"] },
      { text: "Monstros, zumbis, alienígenas e criaturas físicas (Monstros).", boostTags: ["monstro", "zumbi", "alien"] },
      { text: "Tortura agoniante, jogos sádicos e mutilações (Gore).", boostTags: ["gore", "tortura"] },
      { text: "Mistério com fitas caseiras ou câmeras escondidas (Found Footage).", boostTags: ["found_footage"] }
    ]
  },
  {
    id: "g_era",
    domain: "global",
    text: "O visual e a época do filme são marcados por...",
    options: [
      { text: "Preto e branco ou charme antigo dos anos 70 para baixo.", boostTags: ["classico"] },
      { text: "Sintetizadores, jaquetas e efeitos práticos gloriosos dos anos 80.", boostTags: ["anos_80"] },
      { text: "Visual limpo adolescente com estética grunge/pop dos anos 90.", boostTags: ["anos_90"] },
      { text: "Filtros escuros, CGI inicial e remakes dos anos 2000.", boostTags: ["anos_2000"] },
      { text: "Câmeras modernas, redes sociais e ritmo artístico (Pós-2010).", boostTags: ["moderno"] },
      { text: "A época não é relevante para essa história.", boostTags: [] }
    ]
  },
  {
    id: "g_setting",
    domain: "global",
    text: "Onde as vítimas encontram a desgraça?",
    options: [
      { text: "Em uma floresta, acampamento de verão ou cabana rural.", boostTags: ["isolamento_natureza"] },
      { text: "Presos dentro de uma casa, apartamento ou quarto específico.", boostTags: ["casa_assombrada", "confinamento"] },
      { text: "Em um ambiente urbano, subúrbio ou cidade cheia de pessoas.", boostTags: ["suburbio"] },
      { text: "Em um hospital, asilo, ou base científica isolada.", boostTags: ["medico"] },
      { text: "Viajando para longe de casa (Leste Europeu, espaço sideral, viagem).", boostTags: ["viagem", "espaco_sideral"] },
      { text: "Trancados em um porão, armadilha ou labirinto.", boostTags: ["armadilha"] }
    ]
  },
  {
    id: "g_protagonist",
    domain: "global",
    text: "Quem está sofrendo o ataque principal?",
    options: [
      { text: "Um grupo de jovens, adolescentes virgens ou festeiros.", boostTags: ["adolescente"] },
      { text: "Uma família tentando recomeçar a vida ou salvar os filhos.", boostTags: ["drama_familiar", "crianca"] },
      { text: "Profissionais (policiais, padres, astronautas, médicos).", boostTags: ["padre"] },
      { text: "Uma única mulher lutando sozinha (A clássica Final Girl).", boostTags: ["baba", "slasher"] },
      { text: "Pessoas ruins sendo punidas por seus pecados ou ignorância.", boostTags: ["vinganca"] },
      { text: "Turistas, curiosos ou jornalistas se intrometendo.", boostTags: ["found_footage", "viagem"] }
    ]
  },
  {
    id: "g_score",
    domain: "global",
    text: "A crítica diz que este filme é...",
    options: [
      { text: "Uma Obra-Prima universal que definiu o gênero.", boostTags: ["obra_prima", "classico"] },
      { text: "Fantástico, perturbador e altamente recomendado.", boostTags: ["aclamado", "moderno"] },
      { text: "Divertido, cumpre a proposta e assusta na medida.", boostTags: [] },
      { text: "Trash total: péssimas atuações, mas excelente pelo sangue.", boostTags: ["trash_b_movie", "comedia_terror"] },
      { text: "Difícil de engolir, divisivo, ritmo lento (A24 vibes).", boostTags: ["a24"] },
      { text: "Baseado no livro brilhante do Rei do Terror (Stephen King).", boostTags: ["stephen_king"] }
    ]
  },

  // ---------------- SLASHER DOMAIN ----------------
  {
    id: "s_mask",
    domain: "slasher",
    text: "O Assassino usa alguma coisa para esconder o rosto?",
    options: [
      { text: "Sim, uma máscara branca e sem expressão assustadora.", boostTags: ["mascara", "halloween"] },
      { text: "Sim, uma máscara de hóquei, pano ou couro humano.", boostTags: ["mascara", "texas"] },
      { text: "Não. O rosto dele é desfigurado ou queimado.", boostTags: ["queimado"] },
      { text: "Não. É um assassino aparentemente comum ou misterioso.", boostTags: ["misterio"] },
      { text: "É um brinquedo assassino ou objeto inanimado.", boostTags: ["boneco"] },
      { text: "Ele usa fantasias cômicas ou de animais (como um palhaço).", boostTags: ["palhaco"] }
    ]
  },
  {
    id: "s_weapon",
    domain: "slasher",
    text: "A principal ferramenta de morte do Assassino é:",
    options: [
      { text: "Uma faca de cozinha perfeitamente limpa e brilhante.", boostTags: ["faca", "halloween", "adolescente"] },
      { text: "Um facão de acampamento sujo de sangue.", boostTags: ["machete"] },
      { text: "Uma motosserra barulhenta e desesperadora.", "boostTags": ["motosserra", "texas"] },
      { text: "Uma luva com lâminas para rasgar a carne.", boostTags: ["luva_lamina"] },
      { text: "O telefone. Ele liga e atormenta a vítima antes.", boostTags: ["telefone", "misterio"] },
      { text: "Qualquer coisa ao redor, ele é criativo e brutal.", boostTags: ["gore"] }
    ]
  },

  // ---------------- SUPERNATURAL DOMAIN ----------------
  {
    id: "su_entity",
    domain: "sobrenatural",
    text: "A entidade paranormal se apresenta como:",
    options: [
      { text: "Um demônio milenar que toma o corpo de alguém.", boostTags: ["demonio", "possessao"] },
      { text: "Uma criança assustadora com cabelos molhados/compridos.", boostTags: ["menina", "agua"] },
      { text: "Um poltergeist que move móveis e portas sozinho.", boostTags: ["fantasma"] },
      { text: "Uma presença amarrada a um objeto maldito (boneca, caixa).", boostTags: ["boneca"] },
      { text: "Bruxas realizando rituais e sacrifícios na floresta.", boostTags: ["bruxaria"] },
      { text: "Não conseguimos ver com os olhos, apenas nas fitas ou no espelho.", boostTags: ["camera", "fita_maldita"] }
    ]
  },
  {
    id: "su_defeat",
    domain: "sobrenatural",
    text: "Qual é a tentativa desesperada para parar o mal?",
    options: [
      { text: "Chamar um padre veterano para um Exorcismo perigoso.", boostTags: ["exorcismo", "padre", "igreja"] },
      { text: "Investigadores paranormais (os Warren) trazendo equipamentos.", boostTags: ["investigadores"] },
      { text: "Encontrar o cadáver escondido e queimar os ossos.", boostTags: ["espirito", "fantasma"] },
      { text: "Tentar sobreviver 7 dias até que o prazo acabe.", boostTags: ["fita_maldita", "menina"] },
      { text: "Sair correndo da casa de vez (mas a casa não é o problema).", boostTags: ["casa_assombrada"] },
      { text: "Não tem salvação. O mal arrasta eles para o inferno.", boostTags: ["demonio"] }
    ]
  },

  // ---------------- GORE DOMAIN ----------------
  {
    id: "g_trap",
    domain: "gore",
    text: "Qual é o motivo do sadismo neste filme?",
    options: [
      { text: "Um assassino dá lições de moral fazendo as vítimas se cortarem.", boostTags: ["jogos_mortais", "armadilha"] },
      { text: "Turistas ricos pagam para torturar pobres inocentes viajantes.", boostTags: ["hostel", "viagem"] },
      { text: "Abre-se uma caixa/portal e demônios ensinam prazer extremo via dor.", boostTags: ["body_horror", "cenobita"] },
      { text: "Um experimento médico doentio unindo os corpos das vítimas.", boostTags: ["body_horror", "medico", "nojento"] },
      { text: "Pessoas são jogadas num labirinto mortal sem explicação.", boostTags: ["puzzle", "armadilha"] },
      { text: "Canibais deformados simplesmente precisam se alimentar no Texas.", boostTags: ["familia_canibal", "texas"] }
    ]
  },

  // ---------------- PSYCHOLOGICAL DOMAIN ----------------
  {
    id: "p_trauma",
    domain: "psicologico",
    text: "Qual o trauma central que move a loucura do personagem?",
    options: [
      { text: "Isolamento absoluto na neve, afetando o cérebro.", boostTags: ["isolamento", "neve", "stephen_king"] },
      { text: "Luto materno, tragédia em família ou culpa.", boostTags: ["drama_familiar", "trauma", "a24"] },
      { text: "A descoberta de racismo estrutural através de rituais e hipnose.", boostTags: ["racismo", "hipnose"] },
      { text: "A quebra de confiança num relacionamento (viagem bizarra ao sol).", boostTags: ["luz_do_dia", "culto"] },
      { text: "O personagem já estava morto e não percebeu (Plot Twist clássico).", boostTags: ["plot_twist", "anos_90"] },
      { text: "Forte repressão religiosa ou sexual no passado.", boostTags: ["religioso", "bruxaria"] }
    ]
  },

  // ---------------- MONSTER DOMAIN ----------------
  {
    id: "m_origin",
    domain: "monstro",
    text: "Qual é a origem da fera que ataca os humanos?",
    options: [
      { text: "O espaço sideral, uma nave vazia ou planeta distante.", boostTags: ["alien", "espaco_sideral"] },
      { text: "Um vírus pandêmico que se espalhou por sangue e saliva.", boostTags: ["virus", "apocalipse", "zumbi"] },
      { text: "Uma maldição milenar europeia da aristocracia romena (Drácula).", boostTags: ["vampiro", "classico"] },
      { text: "A lua cheia desencadeando a natureza primitiva humana.", boostTags: ["lobisomem", "natureza"] },
      { text: "Desenterrada do gelo, assimilando suas vítimas perfeitamente.", boostTags: ["metamorfo", "paranoia"] },
      { text: "Ciência que deu errado (mutação de moscas ou insetos gigantes).", boostTags: ["mutacao", "scifi"] }
    ]
  }
];
