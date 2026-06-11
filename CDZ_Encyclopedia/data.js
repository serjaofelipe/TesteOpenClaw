const cdzData = {
    personagens: {
        bronze: [
            {
                nome: "Seiya",
                constelacao: "Pégaso",
                biografia: "O protagonista da série. Seiya é um jovem impulsivo, de grande coração e determinação inabalável. Ele foi treinado no Santuário, na Grécia, por Marin de Águia. Sua principal motivação no início era reencontrar sua irmã Seika, mas logo assume a missão de proteger a deusa Athena.",
                ataques: ["Meteoro de Pégaso", "Cometa de Pégaso", "Turbilhão de Pégaso"],
                armadura: "Armadura de Bronze de Pégaso. Evoluiu diversas vezes graças ao sangue dos Cavaleiros de Ouro e da própria Athena.",
                curiosidades: ["Seiya e os outros Cavaleiros de Bronze são meio-irmãos no mangá (filhos de Mitsumasa Kido), mas isso foi alterado no anime.", "Apesar de ser de Bronze, já vestiu a Armadura de Ouro de Sagitário em momentos de crise."]
            },
            {
                nome: "Shiryu",
                constelacao: "Dragão",
                biografia: "Treinado nos Cinco Picos Antigos de Rozan pelo Mestre Ancião (Dohko de Libra). Shiryu é o mais sábio e equilibrado do grupo, conhecido por sua grande honra e sacrifício, frequentemente cegando-se ou arriscando a vida pelos amigos.",
                ataques: ["Cólera do Dragão", "Dragão Voador", "Último Dragão", "Excalibur", "Cólera dos Cem Dragões"],
                armadura: "Armadura de Bronze de Dragão, famosa por ter o escudo e o punho mais resistentes (embora sejam frequentemente quebrados).",
                curiosidades: ["Possui uma tatuagem de dragão nas costas que só aparece quando ele queima seu cosmo.", "Herdou a técnica Excalibur de Shura de Capricórnio."]
            },
            {
                nome: "Hyoga",
                constelacao: "Cisne",
                biografia: "Treinado nas terras geladas da Sibéria. No mangá, seu mestre é Camus de Aquário, enquanto no anime seu mestre inicial foi o Cavaleiro de Cristal (discípulo de Camus). Hyoga tem um profundo apego emocional à sua mãe, cujo navio afundou no mar gelado.",
                ataques: ["Pó de Diamante", "Trovão Aurora Ataque", "Execução Aurora", "Círculo de Gelo"],
                armadura: "Armadura de Bronze de Cisne.",
                curiosidades: ["A cruz que ele usa foi uma lembrança de sua mãe.", "Sua técnica máxima, a Execução Aurora, atinge o zero absoluto (-273,15 °C)."]
            },
            {
                nome: "Shun",
                constelacao: "Andrômeda",
                biografia: "O irmão mais novo de Ikki. Shun é pacífico e odeia lutar, preferindo se sacrificar a ferir seus inimigos. Ele foi treinado na Ilha de Andrômeda. Apesar de sua natureza gentil, possui um cosmo imensamente poderoso.",
                ataques: ["Corrente de Andrômeda", "Onda Relâmpago", "Defesa Circular", "Tempestade Nebulosa"],
                armadura: "Armadura de Bronze de Andrômeda, que possui correntes com habilidades ofensivas e defensivas próprias.",
                curiosidades: ["No arco de Hades, é revelado que ele é o hospedeiro escolhido pelo Deus do Submundo.", "A Tempestade Nebulosa é seu ataque mais forte, usado apenas quando ele tira a armadura e libera seu poder real."]
            },
            {
                nome: "Ikki",
                constelacao: "Fênix",
                biografia: "O Cavaleiro de Fênix é o 'lobo solitário' do grupo. Treinado na Ilha da Rainha da Morte, onde passou por um treinamento infernal que o fez odiar tudo no início. Ikki frequentemente aparece no último momento para salvar seu irmão Shun.",
                ataques: ["Ave Fênix", "Golpe Fantasma de Fênix"],
                armadura: "Armadura de Bronze de Fênix. A única armadura com a habilidade de se restaurar completamente das próprias cinzas.",
                curiosidades: ["Foi o primeiro homem na história a ser digno de vestir a Armadura de Fênix.", "O Golpe Fantasma destrói a mente do oponente mostrando seus piores pesadelos."]
            }
        ],
        ouro: [
            {
                nome: "Mu",
                constelacao: "Áries",
                biografia: "Protetor da primeira casa zodiacal e o único no mundo atual capaz de consertar Armaduras. Mu é calmo, pacífico e dono da telecinese mais poderosa do Santuário.",
                ataques: ["Muralha de Cristal", "Revolução Estelar", "Extinção Estelar", "Rede de Cristal"],
                armadura: "Armadura de Ouro de Áries.",
                curiosidades: ["É discípulo de Shion, o antigo Grande Mestre e antigo Cavaleiro de Áries."]
            },
            {
                nome: "Aldebaran",
                constelacao: "Touro",
                biografia: "O guardião da Casa de Touro. Conhecido por sua força física inigualável e sua postura inabalável de braços cruzados (posição de Iaijutsu).",
                ataques: ["Grande Chifre"],
                armadura: "Armadura de Ouro de Touro.",
                curiosidades: ["Deixou Seiya cortar o chifre de sua armadura como prova de que o cavaleiro de bronze alcançou o Sétimo Sentido."]
            },
            {
                nome: "Saga",
                constelacao: "Gêmeos",
                biografia: "O Cavaleiro de Gêmeos que sofria de dupla personalidade. Ele assassinou o Grande Mestre Shion, tomou seu lugar e governou o Santuário com mãos de ferro por 13 anos.",
                ataques: ["Explosão Galáctica", "Outra Dimensão", "Satã Imperial"],
                armadura: "Armadura de Ouro de Gêmeos.",
                curiosidades: ["A Explosão Galáctica é dita ter o poder de esmagar as estrelas.", "Tem um irmão gêmeo chamado Kanon, que mais tarde herda sua armadura."]
            },
            {
                nome: "Máscara da Morte",
                constelacao: "Câncer",
                biografia: "Um cavaleiro cruel que acredita que a justiça é decidida pelo mais forte. Ele decorou a Casa de Câncer com os rostos das pessoas que assassinou.",
                ataques: ["Ondas do Inferno (Seki Shiki Meikai Ha)"],
                armadura: "Armadura de Ouro de Câncer.",
                curiosidades: ["Durante a luta contra Shiryu, sua própria armadura de ouro o abandonou por não considerá-o digno de usá-la."]
            },
            {
                nome: "Aiolia",
                constelacao: "Leão",
                biografia: "Irmão mais novo de Aiolos (Sagitário). Cresceu sofrendo o estigma de ser irmão de um traidor, o que o tornou um cavaleiro focado e impetuoso. Seu cosmo é baseado em raios.",
                ataques: ["Cápsula do Poder", "Relâmpago de Plasma"],
                armadura: "Armadura de Ouro de Leão.",
                curiosidades: ["O Relâmpago de Plasma dispara cem milhões de golpes por segundo na velocidade da luz."]
            },
            {
                nome: "Shaka",
                constelacao: "Virgem",
                biografia: "Considerado o homem mais próximo de Deus. Mantém seus olhos fechados para acumular seu cosmo, liberando um poder devastador quando os abre.",
                ataques: ["Tesouro do Céu", "Rendição Divina", "Seis Caminhos de Samsara", "Invocação dos Espíritos Malignos", "Kahn"],
                armadura: "Armadura de Ouro de Virgem.",
                curiosidades: ["É a reencarnação de Buda na série.", "Foi o primeiro a despertar o Oitavo Sentido (Arayashiki)."]
            },
            {
                nome: "Dohko",
                constelacao: "Libra",
                biografia: "O Mestre Ancião e mestre de Shiryu. É o único sobrevivente da Guerra Santa anterior (ao lado de Shion) e vigiava o selo de Hades nos Cinco Picos.",
                ataques: ["Cólera dos Cem Dragões", "Cólera do Dragão"],
                armadura: "Armadura de Ouro de Libra. Contém 12 armas douradas (espadas, escudos, tonfas, etc).",
                curiosidades: ["Recebeu a técnica Misopetha-Menos de Athena, permitindo que seu coração batesse 100 mil vezes por ano, vivendo 243 anos como se fossem 243 dias."]
            },
            {
                nome: "Milo",
                constelacao: "Escorpião",
                biografia: "Amigo de Camus de Aquário. Milo é um cavaleiro impulsivo, apaixonado e muito orgulhoso. Suas técnicas se assemelham ao veneno e picada de um escorpião.",
                ataques: ["Agulha Escarlate", "Antares", "Restrição"],
                armadura: "Armadura de Ouro de Escorpião.",
                curiosidades: ["Sua técnica exige 15 agulhadas (as 15 estrelas de escorpião) para matar o inimigo, dando-lhe a chance de se arrepender antes da última, Antares."]
            },
            {
                nome: "Aiolos",
                constelacao: "Sagitário",
                biografia: "O herói injustiçado. Salvou a bebê Athena das mãos de Saga, sendo gravemente ferido e considerado um traidor. Sua vontade continuou viva em sua armadura, que muitas vezes protegeu Seiya.",
                ataques: ["Trovão Atômico", "Flecha da Justiça"],
                armadura: "Armadura de Ouro de Sagitário.",
                curiosidades: ["No mangá clássico não vimos o golpe Trovão Atômico (foi criado no anime e detalhado em Episode G).", "Seu testamento na Casa de Sagitário inspirou os Cavaleiros de Bronze a continuarem."]
            },
            {
                nome: "Shura",
                constelacao: "Capricórnio",
                biografia: "Um cavaleiro leal a Athena, cujos braços e pernas são tão afiados quanto uma espada sagrada. Acreditava que o Grande Mestre era a justiça.",
                ataques: ["Excalibur", "Pedras Saltitantes"],
                armadura: "Armadura de Ouro de Capricórnio.",
                curiosidades: ["Foi o responsável pelos ferimentos letais em Aiolos de Sagitário 13 anos atrás.", "Passou a técnica da Excalibur para o braço direito de Shiryu."]
            },
            {
                nome: "Camus",
                constelacao: "Aquário",
                biografia: "O mestre de gelo (mestre de Hyoga no mangá, mestre do Cavaleiro de Cristal no anime). Frio e estoico, ensinou que para ser um guerreiro perfeito não se deve demonstrar emoção.",
                ataques: ["Execução Aurora", "Pó de Diamante", "Esquife de Gelo"],
                armadura: "Armadura de Ouro de Aquário.",
                curiosidades: ["Prendeu Hyoga no Esquife de Gelo para salvá-lo da morte nas outras casas, mas os outros de Bronze o libertaram."]
            },
            {
                nome: "Afrodite",
                constelacao: "Peixes",
                biografia: "O mais belo dos 88 cavaleiros e guardião da última casa zodiacal. Acreditava que o poder é a verdadeira justiça. Luta usando rosas diabólicas.",
                ataques: ["Rosas Diabólicas Reais", "Rosas Piranhas", "Rosa Sangrenta"],
                armadura: "Armadura de Ouro de Peixes.",
                curiosidades: ["Foi o assassino do mestre de Shun (Daidalos/Albion de Cefeu).", "A Rosa Sangrenta (branca) drena todo o sangue do oponente ao atingir o coração."]
            }
        ],
        prata_deuses: [
            {
                nome: "Saori Kido (Athena)",
                constelacao: "Deusa",
                biografia: "A reencarnação terrena da Deusa da Sabedoria e da Guerra Justa. Saori era uma garota mimada inicialmente, mas abraça seu destino divino liderando seus cavaleiros para proteger a paz na Terra.",
                ataques: ["Cosmo de Athena", "Báculo Sagrado", "Selo de Athena"],
                armadura: "Armadura Divina de Athena (Kamui).",
                curiosidades: ["No mangá, Saori é apenas neta adotiva de Mitsumasa Kido (assim não tendo laços de sangue com os Cavaleiros)."]
            },
            {
                nome: "Hades",
                constelacao: "Deus do Submundo",
                biografia: "O soberano do Mundo dos Mortos. Tem como objetivo criar o 'Grande Eclipse', para que a Terra mergulhe em trevas e congele, exterminando a humanidade.",
                ataques: ["Espada do Submundo", "Grande Eclipse", "Maldição de Hades"],
                armadura: "Sobrepeliz (Surplice) de Hades.",
                curiosidades: ["Hades odeia ferir seu corpo original e o mantém escondido nos Elíseos desde as eras mitológicas, sempre possuindo o humano mais puro da época (como Shun)."]
            },
            {
                nome: "Shaina",
                constelacao: "Ofiúco (Cobra)",
                biografia: "Cavaleira de Prata e mestre de Cassios. Inicialmente queria matar Seiya por ele ter visto seu rosto sem a máscara (lei das Amazonas: amar ou matar quem ver o rosto), mas acabou se apaixonando por ele.",
                ataques: ["Garras de Trovão"],
                armadura: "Armadura de Prata de Ofiúco.",
                curiosidades: ["A constelação de Ofiúco (Serpentário) mais tarde ganhou uma Armadura de Ouro na saga Next Dimension."]
            },
            {
                nome: "Marin",
                constelacao: "Águia",
                biografia: "A mentora rígida e carinhosa de Seiya. Ela o treinou na Grécia e sempre o ajudou nas sombras.",
                ataques: ["Meteoro", "Lampejo da Águia", "Punho Vazio"],
                armadura: "Armadura de Prata de Águia.",
                curiosidades: ["Por muito tempo acreditou-se que Marin fosse a irmã perdida de Seiya (Seika), o que Kurumada usou como distração."]
            }
        ]
    },
    arcos: [
        {
            titulo: "Saga do Santuário (Clássico)",
            descricao: "O arco inicial que engloba a Guerra Galáctica, os Cavaleiros Negros, os Cavaleiros de Prata e a épica Batalha das 12 Casas. Seiya e seus amigos precisam atravessar as casas do zodíaco em 12 horas para salvar a vida de Athena, ferida por uma flecha dourada, e derrotar o falso Grande Mestre."
        },
        {
            titulo: "Saga de Asgard (Anime Original)",
            descricao: "Um arco filler (exclusivo do anime) que ocorre nas terras geladas de Asgard. Hilda de Polaris é controlada pelo Anel de Nibelungo, colocado secretamente por Poseidon, e declara guerra a Athena. Os cavaleiros devem derrotar os Guerreiros Deuses para coletar as Safiras de Odin e pegar a Espada Balmung."
        },
        {
            titulo: "Saga de Poseidon",
            descricao: "O Deus dos Mares, Poseidon, reencarna no corpo de Julian Solo e sequestra Athena, prendendo-a no Grande Suporte Principal de seu santuário submarino. Os Cavaleiros de Bronze devem destruir os Sete Pilares defendidos pelos Generais Marinas para impedir inundações globais e salvar a deusa."
        },
        {
            titulo: "Saga de Hades (Santuário, Inferno, Elíseos)",
            descricao: "A Guerra Santa suprema. Hades desperta junto com seus 108 Espectros. Os Cavaleiros de Ouro mortos são ressuscitados para matar Athena em troca de vida eterna. A batalha se estende do Santuário até o Mundo dos Mortos (Inferno) e culmina nos Campos Elíseos, onde os cavaleiros despertam as Armaduras Divinas para enfrentar Hades e os deuses gêmeos (Thanatos e Hypnos)."
        },
        {
            titulo: "Saint Seiya: The Lost Canvas",
            descricao: "Uma série derivada focada na Guerra Santa do século XVIII. Acompanha o antigo Cavaleiro de Pégaso, Tenma, seu amigo Alone (que se torna o hospedeiro de Hades) e Sasha (a reencarnação de Athena). Mostra a geração dourada passada de Dohko e Shion."
        },
        {
            titulo: "Saint Seiya: Next Dimension",
            descricao: "A continuação canônica do mangá de Masami Kurumada. Após a luta nos Elíseos, Seiya fica em coma amaldiçoado pela espada de Hades. Athena e os Cavaleiros de Bronze viajam no tempo de volta ao século XVIII para destruir a espada de Hades no passado e salvar Seiya."
        }
    ],
    curiosidades: [
        {
            titulo: "O que é o Cosmo e o Sétimo Sentido?",
            texto: "O Cosmo é a energia do Big Bang que reside dentro do corpo de cada guerreiro. Para invocar milagres e se mover na velocidade da luz, um cavaleiro deve despertar o 'Sétimo Sentido', que vai além dos 5 sentidos e da mente (Sexto Sentido)."
        },
        {
            titulo: "Sucesso Absoluto no Brasil",
            texto: "A série estreou na extinta TV Manchete em 1994, revolucionando o mercado de animes no Brasil e abrindo portas para produções como Dragon Ball, Sailor Moon e Pokémon. As vendas de brinquedos (os famosos 'bonequinhos dos Cavaleiros') explodiram no país."
        },
        {
            titulo: "Masami Kurumada: O Criador",
            texto: "Antes de CDZ, Kurumada já era famoso por 'Ring ni Kakero' (boxe). A ideia das armaduras de Cavaleiros veio após Kurumada ver fotografias de meteoros e chuva de estrelas, inspirando o conceito do 'Meteoro de Pégaso'."
        },
        {
            titulo: "As 88 Constelações",
            texto: "O número de Cavaleiros (88) é exato às 88 constelações modernas reconhecidas pela astronomia oficial (IAU). As armaduras são divididas em hierarquia: 12 de Ouro, 24 de Prata, 48 de Bronze (e 4 desconhecidas)."
        }
    ]
};
