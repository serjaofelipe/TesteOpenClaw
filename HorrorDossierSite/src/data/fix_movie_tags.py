import json
import re

# Dicionário de overrides com tags ultra-específicas para os filmes principais garantindo o acerto do Akinator
hardcoded_tags = {
    "Halloween": ["slasher", "serial_killer", "mascara", "faca", "baba", "suburbio", "classico", "anos_70"],
    "Halloween (2018)": ["slasher", "serial_killer", "mascara", "faca", "baba", "suburbio", "moderno", "vinganca"],
    "Sexta-Feira 13": ["slasher", "serial_killer", "mascara", "machete", "acampamento", "lago", "anos_80"],
    "A Hora do Pesadelo": ["slasher", "sobrenatural", "sonho", "luva_lamina", "queimado", "anos_80", "psicologico"],
    "O Massacre da Serra Elétrica": ["slasher", "gore", "motosserra", "familia_canibal", "texas", "rural", "classico", "anos_70"],
    "Pânico": ["slasher", "meta_linguagem", "mascara", "faca", "telefone", "adolescente", "anos_90", "misterio"],
    "Brinquedo Assassino": ["slasher", "boneco", "magia_negra", "faca", "anos_80", "comedia_terror"],
    
    "O Exorcista": ["sobrenatural", "possessao", "demonio", "padre", "igreja", "menina", "classico", "anos_70", "obra_prima"],
    "Invocação do Mal": ["sobrenatural", "fantasma", "demonio", "casa_assombrada", "investigadores", "moderno", "boneca"],
    "Atividade Paranormal": ["sobrenatural", "fantasma", "found_footage", "camera", "demonio", "moderno", "casa_assombrada"],
    "O Chamado": ["sobrenatural", "fita_maldita", "menina", "fantasma", "investigacao", "anos_2000", "agua"],
    "O Iluminado": ["psicologico", "loucura", "fantasma", "hotel", "isolamento", "neve", "machado", "stephen_king", "classico"],
    "O Sexto Sentido": ["psicologico", "fantasma", "plot_twist", "crianca", "anos_90", "aclamado"],
    
    "Jogos Mortais": ["gore", "tortura", "armadilha", "jogos_mortais", "puzzle", "anos_2000", "plot_twist", "marionete"],
    "O Albergue": ["gore", "tortura", "viagem", "hostel", "leste_europeu", "rico", "sadismo", "anos_2000"],
    "A Centopeia Humana": ["gore", "body_horror", "experimento", "medico", "bizarro", "moderno", "nojento"],
    "Terrifier": ["slasher", "gore", "palhaco", "violencia_extrema", "moderno", "indie"],
    
    "Alien": ["alien", "espaco_sideral", "scifi", "nave", "claustrofobia", "classico", "anos_70"],
    "A Coisa": ["alien", "monstro", "neve", "isolamento", "metamorfo", "paranoia", "anos_80"],
    "O Predador": ["alien", "acao", "floresta", "militar", "cacador", "anos_80"],
    
    "Madrugada dos Mortos": ["zumbi", "shopping", "apocalipse", "horda", "classico", "anos_70"],
    "Extermínio": ["zumbi", "virus", "corrida", "apocalipse", "londres", "anos_2000"],
    "Guerra Mundial Z": ["zumbi", "pandemia", "global", "acao", "moderno", "cgi"],
    
    "A Bruxa": ["psicologico", "bruxaria", "epoca", "isolamento", "religioso", "bode", "moderno", "a24"],
    "Hereditário": ["psicologico", "demonio", "drama_familiar", "culto", "tragedia", "moderno", "a24"],
    "Midsommar": ["psicologico", "culto", "luz_do_dia", "viagem", "trauma", "moderno", "a24", "fogo"],
    "Corra!": ["psicologico", "racismo", "culto", "hipnose", "plot_twist", "moderno", "aclamado"]
}

def create_tags(movie):
    tags = set()
    
    # Categorias Base
    cat = movie.get('category', '').lower()
    if 'slasher' in cat or 'serial killer' in cat:
        tags.update(['slasher'])
    if 'sobrenatural' in cat or 'fantasma' in cat:
        tags.update(['sobrenatural', 'fantasma'])
    if 'demônio' in cat or 'possessão' in cat or 'bruxa' in cat:
        tags.update(['demonio', 'possessao', 'bruxaria'])
    if 'zumbi' in cat or 'infectado' in cat:
        tags.update(['zumbi', 'virus'])
    if 'alien' in cat or 'espaço' in cat:
        tags.update(['alien', 'scifi'])
    if 'monstro' in cat or 'criatura' in cat:
        tags.update(['monstro', 'criatura'])
    if 'psicológico' in cat or 'suspense' in cat:
        tags.update(['psicologico'])
    if 'gore' in cat or 'tortura' in cat:
        tags.update(['gore', 'tortura'])
    if 'found footage' in cat:
        tags.update(['found_footage'])
    
    # Épocas
    year = movie.get('year', 2000)
    if year < 1980: tags.add('classico')
    if 1980 <= year <= 1989: tags.add('anos_80')
    if 1990 <= year <= 1999: tags.add('anos_90')
    if 2000 <= year <= 2010: tags.add('anos_2000')
    if year > 2010: tags.add('moderno')
    
    # Qualidade (Score)
    score = movie.get('score', 5)
    if score >= 8.0: tags.add('obra_prima')
    elif score >= 7.0: tags.add('aclamado')
    elif score < 5.5: tags.add('trash_b_movie')
    
    story = movie.get('story', '').lower()
    title = movie.get('title', '').lower()
    text = story + " " + title
    
    # Palavras-chave dinâmicas
    if re.search(r'\b(cabana|acampamento|floresta|bosque|lago)\b', text): tags.add('isolamento_natureza')
    if re.search(r'\b(casa|mansão|apartamento|hotel|quarto|porão)\b', text): tags.add('casa_assombrada')
    if re.search(r'\b(espaço|nave|planeta)\b', text): tags.add('espaco_sideral')
    if re.search(r'\b(máscara|mascarado)\b', text): tags.add('mascara')
    if re.search(r'\b(vampiro|dracula)\b', text): tags.add('vampiro')
    if re.search(r'\b(lobisomem|lua|lobo)\b', text): tags.add('lobisomem')
    if re.search(r'\b(padre|igreja|exorcismo|cruz)\b', text): tags.add('padre')
    if re.search(r'\b(criança|filho|filha|órfã|bebê)\b', text): tags.add('crianca')
    if re.search(r'\b(vírus|epidemia|contaminação)\b', text): tags.add('virus')
    if re.search(r'\b(tecnologia|internet|vídeo|fita|celular)\b', text): tags.add('tecnologia')
    if re.search(r'\b(jogo|regras|armadilha|sobreviver|teste)\b', text): tags.add('armadilha')
    if re.search(r'\b(vingança|justiça)\b', text): tags.add('vinganca')
    if re.search(r'\b(comédia|rir|engraçado|humor)\b', text): tags.add('comedia_terror')
    if re.search(r'\b(stephen king|king)\b', movie.get('inspiration', '').lower()): tags.add('stephen_king')

    movie['tags'] = list(tags)
    
    # Overrides garantidos (ignora case e busca subtrings no titulo para associar)
    for key_title, override_tags in hardcoded_tags.items():
        if key_title.lower() in title:
            # Junta as tags sem duplicar
            for t in override_tags:
                if t not in movie['tags']:
                    movie['tags'].append(t)
            
    return movie

with open('allMoviesDB.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

for m in movies:
    create_tags(m)

with open('allMoviesDB.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, indent=2, ensure_ascii=False)

print("Tags REVISADAS aplicadas a todos os filmes com absoluto sucesso e overrides!")
