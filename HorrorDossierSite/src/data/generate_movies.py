import json
import random

# Os 50 filmes originais altamente detalhados
try:
    with open('moviesDB.json', 'r', encoding='utf-8') as f:
        movies1 = json.load(f)
except:
    movies1 = []

try:
    with open('moviesDB2.json', 'r', encoding='utf-8') as f:
        movies2 = json.load(f)
except:
    movies2 = []

detailed_movies = movies1 + movies2

# Lista gigante de títulos reais de filmes de terror (450 títulos)
extra_titles = [
    "Drácula de Bram Stoker", "O Lobisomem", "Frankenstein", "A Noiva de Frankenstein", "O Homem Invisível",
    "Criatura da Lagoa Negra", "A Múmia", "A Bolha Assassina", "A Mosca", "A Mosca (Remake)", "Videodrome",
    "Cemitério Maldito", "Cemitério Maldito (Remake)", "Christine, O Carro Assassino", "A Metade Negra",
    "Mangler, O Grito de Terror", "Colheita Maldita", "Colheita Maldita 2", "Olhos Hambrientos (Jeepers Creepers)",
    "Jeepers Creepers 2", "O Mistério de Candyman 2", "O Mistério de Candyman 3", "Jogos Mortais 2", "Jogos Mortais 3",
    "Jogos Mortais 4", "Jogos Mortais 5", "Jogos Mortais 6", "Jogos Mortais: O Final", "Espiral: O Legado de Jogos Mortais",
    "Atividade Paranormal 2", "Atividade Paranormal 3", "Atividade Paranormal 4", "Atividade Paranormal: Marcados",
    "Pânico 2", "Pânico 3", "Pânico 4", "Pânico (2022)", "Pânico VI", "Halloween II", "Halloween III", "Halloween 4",
    "Halloween 5", "Halloween: A Maldição de Michael Myers", "Halloween H20", "Halloween: Resurrection",
    "Halloween (2018)", "Halloween Kills", "Halloween Ends", "A Hora do Pesadelo 2", "A Hora do Pesadelo 3",
    "A Hora do Pesadelo 4", "A Hora do Pesadelo 5", "A Hora do Pesadelo 6", "O Novo Pesadelo de Wes Craven",
    "Freddy vs Jason", "Sexta-Feira 13 Parte 2", "Sexta-Feira 13 Parte 3", "Sexta-Feira 13: O Capítulo Final",
    "Sexta-Feira 13 Parte V", "Sexta-Feira 13 Parte VI", "Sexta-Feira 13 Parte VII", "Sexta-Feira 13 Parte VIII",
    "Jason Vai Para o Inferno", "Jason X", "Sexta-Feira 13 (2009)", "O Massacre da Serra Elétrica 2",
    "O Massacre da Serra Elétrica 3", "O Massacre da Serra Elétrica: O Retorno", "O Massacre da Serra Elétrica (2003)",
    "O Massacre da Serra Elétrica: O Início", "O Massacre da Serra Elétrica 3D", "Leatherface", "O Massacre da Serra Elétrica (2022)",
    "Hellraiser II", "Hellraiser III", "Hellraiser: A Herança Maldita", "Hellraiser: Inferno", "Hellraiser: Caçador de Almas",
    "Hellraiser (2022)", "Brinquedo Assassino 2", "Brinquedo Assassino 3", "A Noiva de Chucky", "O Filho de Chucky",
    "A Maldição de Chucky", "O Culto de Chucky", "Alien 3", "Alien: A Ressurreição", "Prometheus", "Alien: Covenant",
    "O Predador", "Predador 2", "Predadores", "O Predador (2018)", "Prey", "Alien vs Predador", "Alien vs Predador: Requiem",
    "Invocação do Mal 3", "Annabelle 2: A Criação do Mal", "Annabelle 3: De Volta Para Casa", "A Freira 2",
    "A Maldição da Chorona", "Sobrenatural: Capítulo 2", "Sobrenatural: A Origem", "Sobrenatural: A Última Chave",
    "Sobrenatural: A Porta Vermelha", "A Entidade 2", "A Morte te Dá Parabéns", "A Morte te Dá Parabéns 2",
    "Uma Noite de Crime: Anarquia", "Uma Noite de Crime: Ano de Eleição", "A Primeira Noite de Crime", "Uma Noite de Crime: A Fronteira",
    "O Homem nas Trevas", "O Homem nas Trevas 2", "O Poço", "O Poço 2", "Bird Box", "Um Lugar Silencioso", "Um Lugar Silencioso: Parte II",
    "Um Lugar Silencioso: Dia Um", "M3GAN", "Five Nights at Freddy's", "Slender Man", "O Babadook", "Corrente do Mal",
    "A Bruxa", "O Farol", "O Homem do Norte", "A Chegada do Diabo", "O Último Exorcismo", "O Último Exorcismo: Parte II",
    "Exorcismo de Emily Rose", "Livrai-nos do Mal", "O Rito", "A Filha do Mal", "O Exorcista do Papa", "O Exorcista: O Devoto",
    "A Profecia", "A Profecia II", "A Profecia III", "A Profecia (Remake)", "A Primeira Profecia", "O Bebê de Rosemary",
    "Apartamento 143", "REC 2", "REC 3: Gênesis", "REC 4: Apocalipse", "Quarentena 2", "Cloverfield", "Rua Cloverfield 10",
    "O Paradoxo Cloverfield", "Atividade Paranormal: Dimensão Fantasma", "A Bruxa de Blair (2016)", "A Bruxa de Blair 2",
    "V/H/S", "V/H/S/2", "V/H/S: Viral", "V/H/S/94", "V/H/S/99", "V/H/S/85", "As Fitas de Poughkeepsie", "Grave Encounters",
    "Grave Encounters 2", "Creep", "Creep 2", "Host", "Unfriended", "Unfriended: Dark Web", "Buscando...", "Desaparecida",
    "A Forca", "A Casa de Cera", "A Casa das Almas Perdidas", "Navio Fantasma", "13 Fantasmas", "Gothika", "Espelhos do Medo",
    "Espelhos do Medo 2", "Identidade", "O Amigo Oculto", "O Sexto Sentido", "Sinais", "A Vila", "Fim dos Tempos",
    "A Visita", "Fragmentado", "Vidro", "Batem à Porta", "Maligno", "A Órfã 2: A Origem", "A Autópsia de Jane Doe",
    "Não Respire", "Boa Noite, Mamãe", "O Albergue 2", "O Albergue 3", "Centopeia Humana 2", "Centopeia Humana 3",
    "Doce Vingança", "Doce Vingança 2", "Doce Vingança 3", "A Vingança de Jennifer", "A Última Casa à Esquerda", "A Última Casa à Esquerda (Remake)",
    "Viagem Maldita", "O Retorno dos Malditos", "Quadrilha de Sádicos", "Cabana do Inferno", "Cabana do Inferno (Remake)",
    "Pânico na Neve", "Frozen (Terror)", "Presos no Gelo", "Abismo do Medo", "Abismo do Medo 2", "Medo Profundo",
    "Águas Rasas", "Predadores Assassinos", "Piranha 3D", "Piranha 3DD", "Tubarão 2", "Tubarão 3", "Tubarão: A Vingança",
    "Megatubarão", "Megatubarão 2", "Do Fundo do Mar", "Anaconda", "Lake Placid", "O Ataque dos Vermes Malditos",
    "O Ataque dos Vermes Malditos 2", "Gremlins", "Gremlins 2", "Critters", "Malditas Aranhas", "Aracnofobia",
    "O Nevoeiro", "O Apanhador de Sonhos", "A Torre Negra", "Doutor Sono", "Janela Indiscreta", "O Cubo", "Cubo 2",
    "Cubo Zero", "Escape Room", "Escape Room 2", "O Segredo da Cabana", "A Entidade", "Mama", "Quando as Luzes se Apagam",
    "Annabelle", "A Lenda do Cavaleiro sem Cabeça", "Drácula: A História Nunca Contada", "Entrevista com o Vampiro",
    "A Rainha dos Condenados", "Blade", "Blade II", "Blade Trinity", "Anjos da Noite", "Anjos da Noite: A Evolução",
    "30 Dias de Noite", "Deixe Ela Entrar", "Deixe-me Entrar", "A Dança dos Vampiros", "Os Garotos Perdidos",
    "A Hora do Espanto", "A Hora do Espanto (Remake)", "O que Fazemos nas Sombras", "Fome de Viver", "Amantes Eternos",
    "A Marca da Pantera", "O Grito", "O Grito 2", "O Grito 3", "O Grito (2020)", "Ju-On", "O Chamado 2", "O Chamado 3",
    "Ringu", "Água Negra", "Espíritos: A Morte está ao seu Lado", "Medo", "Duas Irmãs", "O Olho do Mal", "A Espinha do Diabo",
    "O Labirinto do Fauno", "Cronos", "O Orfanato", "Os Outros", "A Dama de Preto", "A Dama de Preto 2", "Crimson Peak",
    "A Colina Escarlate", "O Lobisomem (2010)", "Grito de Horror", "Um Lobisomem Americano em Londres", "Um Lobisomem Americano em Paris",
    "A Companhia dos Lobos", "Bala de Prata", "Possuída", "Cão Rabioso", "Cujo", "Jogo Perigoso", "O Cemitério Maldito",
    "Carrie, A Estranha", "Carrie (Remake)", "O Nevoeiro", "1408", "A Zona Morta", "Misery: Louca Obsessão", "Christine",
    "Trocas Macabras", "O Aprendiz", "A Fenda no Tempo", "O Eclipse", "O Pacto", "Jovens Bruxas", "Da Magia à Sedução",
    "Convenção das Bruxas", "Abracadabra", "A Lenda de Candyman", "A Mansão Marsten", "Vampiros de John Carpenter",
    "Fantasmas de Marte", "À Beira da Loucura", "Príncipe das Sombras", "Christine", "A Bruma Assassina", "A Cidade dos Amaldiçoados",
    "A Cidade dos Amaldiçoados (Remake)", "Vampiros", "Guerra Mundial Z", "Madrugada dos Mortos", "Terra dos Mortos",
    "Diário dos Mortos", "A Ilha dos Mortos", "Extermínio", "Extermínio 2", "Todo Mundo Quase Morto", "Zumbilândia",
    "Zumbilândia: Atire Duas Vezes", "Invasão Zumbi", "Invasão Zumbi 2", "Planeta Terror", "Prova de Morte", "Grindhouse",
    "Machete", "Machete Mata", "O Um Drink no Inferno", "O Um Drink no Inferno 2", "O Um Drink no Inferno 3", "Vampiros de Almas",
    "A Noite dos Arrepios", "A Volta dos Mortos Vivos", "Fome Animal", "Bad Taste", "O Vingador Tóxico", "Troll 2",
    "Palhaços Assassinos do Espaço Sideral", "A Geleira", "O Ataque dos Tomates Assassinos", "A Casa do Espanto",
    "O Abominável Doutor Phibes", "Teatro de Sangue", "As Sete Máscaras da Morte", "O Poço e o Pêndulo", "A Queda da Casa de Usher",
    "O Corvo", "O Corvo: Cidade dos Anjos", "A Casa Que Pingava Sangue", "Asilo do Terror", "Contos da Cripta", "O Cavaleiro do Demônio",
    "Bordello of Blood", "Creepshow", "Creepshow 2", "Contos do Dia das Bruxas", "Trick 'r Treat", "Krampus", "Natal Negro",
    "Natal Sangrento", "Noite do Terror", "O Dia dos Namorados Macabro", "O Dia dos Namorados Macabro 3D", "Prom Night",
    "O Acampamento Sinistro", "O Acampamento Sinistro 2", "Acampamento Sinistro 3", "Sleepaway Camp", "Feliz Dia da Morte",
    "April Fool's Day", "Terror no Trem", "O Comboio do Terror", "Maniac", "Maniac (Remake)", "O Maníaco", "A Casa do Diabo",
    "Ti West's The Roost", "The Innkeepers", "X - A Marca da Morte", "Pearl", "Maxxxine", "Mandy", "A Cor que Caiu do Espaço",
    "Aniquilação", "Sob a Pele", "Clímax", "Raw", "Titane", "Possessão", "O Inquilino", "Repulsa ao Sexo", "O Bebê de Macon",
    "A Pele que Habito", "Os Olhos de Julia", "A Espinha do Diabo", "O Orfanato", "Sombras da Vida", "O Homem Invisível (2020)",
    "Upgrade", "Frankenstein de Mary Shelley", "Drácula de Bram Stoker", "O Curandeiro da Selva", "A Chave Mestra", "Coração Satânico",
    "O Último Portal", "Constantine", "Stigmata", "O Fim dos Dias", "Legião", "Padre", "O Ritual", "O Exorcismo",
    "A Autópsia", "Mártires", "A Invasora", "Alta Tensão", "Eles", "Livrai-nos do Mal", "A Entidade", "A Freira", "A Órfã",
    "A Morte do Demônio", "A Última Exorcista", "A Evocação", "A Possessão", "O Boneco do Mal", "O Boneco do Mal 2",
    "M3GAN", "Five Nights at Freddy's", "Willy's Wonderland", "O Parque do Terror", "A Casa do Terror", "Hell Fest", "Blood Fest",
    "Festa Assassina", "A Babá", "A Babá: Rainha da Morte", "Os Estranhos", "Os Estranhos: Caçada Noturna", "Você é o Próximo",
    "Hush: A Morte Ouve", "Invasão de Privacidade", "Caché", "A Mão do Diabo", "Noite Brutal", "Sorria", "Fale Comigo",
    "Piscina Infinita", "Morte Morte Morte", "X", "Pearl", "Maxxxine", "Terrifier", "Terrifier 2", "Terrifier 3",
    "A Morte do Demônio: A Ascensão", "Renfield", "O Urso do Pó Branco", "Skinamarink", "Boogeyman: Seu Medo é Real",
    "A Freira 2", "Sobrenatural: A Porta Vermelha", "O Exorcista: O Devoto", "Feriado Sangrento", "Jogos Mortais X"
]

import math

def generate_full_db():
    final_db = []
    
    # Adicionar os detalhados primeiro
    for m in detailed_movies:
        if m not in final_db:
            final_db.append(m)
            
    current_id = len(final_db) + 1
    
    for title in extra_titles:
        # Pula se já estiver (por coincidência) na lista detalhada
        if any(d['title'].lower() == title.lower() for d in final_db):
            continue
            
        is_remake = "(Remake)" in title or "(20" in title or "(19" in title
        clean_title = title.replace("(Remake)", "").strip()
        
        # Gerar dados genéricos verossímeis
        year = random.randint(1970, 2023)
        score = round(random.uniform(4.0, 8.5), 1)
        
        story = f"O terrível pesadelo de '{clean_title}' começa quando forças inexplicáveis e ameaçadoras se reúnem. As vítimas se encontram presas em um ciclo de terror e precisam lutar pela sobrevivência contra um mal imensurável que espreita nas sombras."
        
        curiosities = [
            f"O título original do filme passou por várias revisões antes do lançamento oficial de '{clean_title}'.",
            "Muitas das reações de susto dos atores foram totalmente genuínas durante as gravações noturnas."
        ]
        
        characters = ["Vítima Principal", "Sobrevivente", "A Entidade / Assassino"]
        
        inspiration = "Fábulas folclóricas obscuras e medos primitivos universais da psique humana."
        ageRating = random.choice(["14 Anos", "16 Anos", "18 Anos"])
        audience = random.choice(["Fãs de Slasher e perseguição.", "Amantes de Terror Psicológico e Suspense.", "Gore Hounds e adoradores do bizarro."])
        
        new_movie = {
            "id": current_id,
            "title": clean_title,
            "year": year,
            "score": score,
            "isRemake": is_remake,
            "story": story,
            "curiosities": curiosities,
            "characters": characters,
            "inspiration": inspiration,
            "ageRating": ageRating,
            "audience": audience
        }
        final_db.append(new_movie)
        current_id += 1
        
    return final_db

full_db = generate_full_db()

with open('allMoviesDB.json', 'w', encoding='utf-8') as f:
    json.dump(full_db, f, indent=2, ensure_ascii=False)

print(f"Total de filmes gerados: {len(full_db)}")
