const charactersData = [
    {
        "id": "gon",
        "name": "Gon Freecss",
        "nen_type": "Reforço",
        "affiliation": "Associação Hunter",
        "image": "./images/gon.jpg",
        "hatsu": "Jajanken (Pedra, Papel, Tesoura)",
        "stats": { "power": 85, "speed": 80, "intelligence": 70, "nen": 90 }
    },
    {
        "id": "killua",
        "name": "Killua Zoldyck",
        "nen_type": "Transformação",
        "affiliation": "Família Zoldyck",
        "image": "./images/killua.jpg",
        "hatsu": "Velocidade Divina (Kanmuru)",
        "stats": { "power": 80, "speed": 98, "intelligence": 85, "nen": 85 }
    },
    {
        "id": "kurapika",
        "name": "Kurapika",
        "nen_type": "Materialização (Especialista com Olhos Escarlates)",
        "affiliation": "Zodíacos / Família Nostrade",
        "image": "./images/kurapika.jpg",
        "hatsu": "Tempo do Imperador / Corrente do Julgamento",
        "stats": { "power": 82, "speed": 85, "intelligence": 95, "nen": 90 }
    },
    {
        "id": "leorio",
        "name": "Leorio Paradinight",
        "nen_type": "Emissão",
        "affiliation": "Zodíacos",
        "image": "./images/leorio.jpg",
        "hatsu": "Soco Remoto",
        "stats": { "power": 75, "speed": 70, "intelligence": 80, "nen": 60 }
    },
    {
        "id": "hisoka",
        "name": "Hisoka Morow",
        "nen_type": "Transformação",
        "affiliation": "Trupe Fantasma (Ex-membro)",
        "image": "./images/hisoka.jpg",
        "hatsu": "Bungee Gum / Textura Surpresa",
        "stats": { "power": 90, "speed": 92, "intelligence": 90, "nen": 95 }
    },
    {
        "id": "chrollo",
        "name": "Chrollo Lucilfer",
        "nen_type": "Especialização",
        "affiliation": "Trupe Fantasma",
        "image": "./images/chrollo.jpg",
        "hatsu": "Caçador de Habilidades (Segredo do Bandido)",
        "stats": { "power": 88, "speed": 90, "intelligence": 98, "nen": 98 }
    },
    {
        "id": "meruem",
        "name": "Meruem",
        "nen_type": "Especialização",
        "affiliation": "Formigas Quimera",
        "image": "./images/meruem.jpg",
        "hatsu": "Síntese de Aura",
        "stats": { "power": 100, "speed": 100, "intelligence": 100, "nen": 100 }
    },
    {
        "id": "netero",
        "name": "Isaac Netero",
        "nen_type": "Reforço",
        "affiliation": "Associação Hunter",
        "image": "./images/netero.jpg",
        "hatsu": "Bodhisattva Guanyin de 100 Tipos",
        "stats": { "power": 98, "speed": 99, "intelligence": 95, "nen": 100 }
    }
];

const arcsData = [
    {
        "arc": "Exame Hunter",
        "synopsis": "Gon deixa a Ilha da Baleia para prestar o rigoroso Exame Hunter, esperando encontrar pistas sobre seu pai, Ging. No caminho, ele conhece Killua, Kurapika e Leorio.",
        "image": "./images/arc_exam.jpg",
        "characters_involved": ["gon", "killua", "kurapika", "leorio", "hisoka", "netero"]
    },
    {
        "arc": "Família Zoldyck",
        "synopsis": "Após Killua ser forçado a voltar para casa, Gon, Kurapika e Leorio viajam para a perigosa Montanha Kukuroo para resgatar seu amigo de sua família de assassinos mortais.",
        "image": "./images/arc_zoldyck.jpg",
        "characters_involved": ["gon", "killua", "kurapika", "leorio"]
    },
    {
        "arc": "Torre Celestial",
        "synopsis": "Gon e Killua seguem para a Torre Celestial para treinar e ganhar dinheiro. Lá eles conhecem Wing, que os ensina os princípios fundamentais do Nen, a técnica da energia vital.",
        "image": "./images/arc_arena.jpg",
        "characters_involved": ["gon", "killua", "hisoka"]
    },
    {
        "arc": "Leilão de Yorknew",
        "synopsis": "O elenco principal se reúne na Cidade de Yorknew para o maior leilão da máfia do mundo. Kurapika caça a Trupe Fantasma para vingar o Clã Kurta.",
        "image": "./images/arc_yorknew.jpg",
        "characters_involved": ["gon", "killua", "kurapika", "leorio", "hisoka", "chrollo"]
    },
    {
        "arc": "Greed Island",
        "synopsis": "Gon e Killua entram no mortal videogame do mundo real criado por Ging. Eles treinam com Biscuit Krueger para dominar seu Nen e completar o jogo.",
        "image": "./images/arc_greed.jpg",
        "characters_involved": ["gon", "killua", "hisoka"]
    },
    {
        "arc": "Formigas Quimera",
        "synopsis": "Uma espécie de formiga altamente adaptável e aterrorizante começa a devorar humanos e evoluir. A Associação Hunter mobiliza seus membros mais fortes para parar o Rei das Formigas.",
        "image": "./images/arc_chimera.jpg",
        "characters_involved": ["gon", "killua", "netero", "meruem"]
    },
    {
        "arc": "13ª Eleição Presidencial Hunter",
        "synopsis": "Após a morte de Netero, os Zodíacos se reúnem para eleger um novo presidente. Enquanto isso, Killua corre contra o tempo com sua irmã Alluka para salvar um Gon moribundo.",
        "image": "./images/arc_election.jpg",
        "characters_involved": ["killua", "leorio", "hisoka"]
    },
    {
        "arc": "Expedição ao Continente Negro (Mangá)",
        "synopsis": "Além do mundo conhecido, encontra-se o Continente Negro, um lugar de perigo extremo e recursos inimagináveis. Beyond Netero lidera uma expedição não autorizada, forçando a ação dos Zodíacos.",
        "image": "./images/arc_dark.jpg",
        "characters_involved": ["kurapika", "leorio", "hisoka", "chrollo"]
    },
    {
        "arc": "Guerra de Sucessão (Atual no Mangá)",
        "synopsis": "A bordo da Baleia Negra a caminho do Continente Negro, os 14 príncipes do Império Kakin iniciam um brutal battle royale pelo trono. Kurapika é envolvido no meio disso.",
        "image": "./images/arc_succession.jpg",
        "characters_involved": ["kurapika", "hisoka", "chrollo"]
    }
];

const tracksData = [
    {
        "id": "departure",
        "title": "Departure!",
        "artist": "Masatoshi Ono",
        "youtube_id": "faqmNf_fZlE"
    },
    {
        "id": "hunting",
        "title": "Hunting for Your Dream",
        "artist": "Galneryus",
        "youtube_id": "wXJ1vLpAEXI"
    },
    {
        "id": "reason",
        "title": "Reason",
        "artist": "Yuzu",
        "youtube_id": "F5vD2V0Nl9E"
    },
    {
        "id": "hyori",
        "title": "Hyōri Ittai",
        "artist": "Yuzu",
        "youtube_id": "8T_b1sA1N2U"
    },
    {
        "id": "kingdom",
        "title": "Kingdom of Predators",
        "artist": "Yoshihisa Hirano",
        "youtube_id": "kXzP4L0g45s"
    },
    {
        "id": "adventurers",
        "title": "The World of Adventurers",
        "artist": "Yoshihisa Hirano",
        "youtube_id": "Oebp7tI73K4"
    }
];
