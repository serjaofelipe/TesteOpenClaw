import json
import re

def create_tags(movie):
    tags = set()
    
    # Categorias Base
    cat = movie.get('category', '').lower()
    if 'slasher' in cat or 'serial killer' in cat:
        tags.update(['slasher', 'serial_killer', 'assassino', 'humano'])
    if 'sobrenatural' in cat or 'fantasma' in cat:
        tags.update(['sobrenatural', 'fantasma', 'espirito', 'assombracao'])
    if 'demônio' in cat or 'possessão' in cat or 'bruxa' in cat:
        tags.update(['demonio', 'possessao', 'bruxaria', 'ocultismo', 'religiao'])
    if 'zumbi' in cat or 'infectado' in cat:
        tags.update(['zumbi', 'apocalipse', 'infeccao', 'horda'])
    if 'alien' in cat or 'espaço' in cat:
        tags.update(['alien', 'espaco', 'scifi', 'extraterrestre'])
    if 'monstro' in cat or 'criatura' in cat:
        tags.update(['monstro', 'criatura', 'besta', 'animal'])
    if 'psicológico' in cat or 'suspense' in cat:
        tags.update(['psicologico', 'paranóia', 'loucura', 'mente'])
    if 'gore' in cat or 'tortura' in cat:
        tags.update(['gore', 'tortura', 'sadismo', 'sangue', 'armadilha'])
    if 'found footage' in cat:
        tags.update(['found_footage', 'camera', 'falso_documentario', 'realista'])
    
    # Épocas (Eras)
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
    elif score < 6.0: tags.add('trash_b_movie')
    
    # Extrair de palavras chaves da história
    story = movie.get('story', '').lower()
    title = movie.get('title', '').lower()
    text = story + " " + title
    
    if re.search(r'\b(cabana|acampamento|floresta|bosque|lago)\b', text): tags.update(['cabana', 'floresta', 'natureza'])
    if re.search(r'\b(casa|mansão|apartamento|hotel|quarto|porão)\b', text): tags.update(['casa_assombrada', 'confinamento'])
    if re.search(r'\b(espaço|nave|planeta)\b', text): tags.add('espaco_sideral')
    if re.search(r'\b(máscara|mascarado)\b', text): tags.add('mascara')
    if re.search(r'\b(vampiro|sangue|conde|dracula)\b', text): tags.add('vampiro')
    if re.search(r'\b(lobisomem|lua|besta|lobo)\b', text): tags.add('lobisomem')
    if re.search(r'\b(padre|igreja|vaticano|exorcismo|cruz|demônio)\b', text): tags.update(['religioso', 'exorcismo'])
    if re.search(r'\b(criança|filho|filha|órfã|bebê)\b', text): tags.add('crianca_macabra')
    if re.search(r'\b(vírus|epidemia|contaminação|mordida)\b', text): tags.add('virus')
    if re.search(r'\b(tecnologia|internet|vídeo|fita|celular)\b', text): tags.add('tecnologia_maldita')
    if re.search(r'\b(jogo|regras|armadilha|sobreviver|teste)\b', text): tags.add('jogos_mortais')
    if re.search(r'\b(família|mudança|passado|segredo)\b', text): tags.add('drama_familiar')
    if re.search(r'\b(vingança|justiça|estupro|violência)\b', text): tags.add('vinganca')
    if re.search(r'\b(comédia|rir|engraçado|humor)\b', text): tags.add('comedia_terror')
    if re.search(r'\b(stephen king|king)\b', movie.get('inspiration', '').lower()): tags.add('stephen_king')
    if re.search(r'\b(lovecraft|cósmico|cthulhu)\b', text): tags.add('horror_cosmico')

    movie['tags'] = list(tags)
    return movie

with open('allMoviesDB.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

for m in movies:
    create_tags(m)

with open('allMoviesDB.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, indent=2, ensure_ascii=False)

print("Tags aplicadas a todos os filmes com sucesso!")
