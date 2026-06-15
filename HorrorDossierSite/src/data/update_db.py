import json
import re

def categorize_movie(movie):
    title = movie.get('title', '').lower()
    story = movie.get('story', '').lower()
    audience = movie.get('audience', '').lower()
    
    combined = title + " " + story + " " + audience
    
    if any(word in combined for word in ['zumbi', 'mortos', 'infectados', 'zombie']):
        return "Zumbis"
    elif any(word in combined for word in ['fantasma', 'espírito', 'assombração', 'poltergeist', 'entidade']):
        return "Sobrenatural / Fantasmas"
    elif any(word in combined for word in ['demônio', 'exorcismo', 'possuída', 'pazuzu', 'lucifer', 'inferno', 'diabo']):
        return "Demônios / Possessão"
    elif any(word in combined for word in ['serial killer', 'assassino', 'slasher', 'máscara', 'esfaqueia']):
        return "Slasher / Serial Killer"
    elif any(word in combined for word in ['alien', 'extraterrestre', 'espaço', 'predador']):
        return "Aliens / Sci-Fi Horror"
    elif any(word in combined for word in ['gore', 'tortura', 'sangue', 'mutilação', 'jogos mortais', 'serra elétrica', 'canibal']):
        return "Gore / Tortura"
    elif any(word in combined for word in ['vampiro', 'lobisomem', 'múmia', 'monstro', 'criatura', 'bruxa', 'bode']):
        return "Monstros Clássicos / Bruxaria"
    elif any(word in combined for word in ['psicológico', 'loucura', 'sanidade', 'mente', 'alucinação']):
        return "Terror Psicológico"
    elif any(word in combined for word in ['found footage', 'câmera', 'documentário', 'gravação']):
        return "Found Footage"
    else:
        return "Suspense Macabro"

# Processar filmes
try:
    with open('allMoviesDB.json', 'r', encoding='utf-8') as f:
        movies = json.load(f)
        
    for m in movies:
        m['category'] = categorize_movie(m)
        
    # Ordenar por ano (do mais antigo para o mais novo)
    movies.sort(key=lambda x: x.get('year', 2000))
    
    with open('allMoviesDB.json', 'w', encoding='utf-8') as f:
        json.dump(movies, f, indent=2, ensure_ascii=False)
    print("Filmes atualizados e ordenados.")
except Exception as e:
    print("Erro filmes:", e)

# Processar personagens
try:
    with open('charactersDB.json', 'r', encoding='utf-8') as f:
        chars = json.load(f)
        
    def get_year_from_source(source):
        match = re.search(r'\((\d{4})', source)
        if match:
            return int(match.group(1))
        return 2000
        
    for c in chars:
        c['year'] = get_year_from_source(c.get('source', ''))
        
    chars.sort(key=lambda x: x['year'])
    
    with open('charactersDB.json', 'w', encoding='utf-8') as f:
        json.dump(chars, f, indent=2, ensure_ascii=False)
    print("Personagens atualizados e ordenados.")
except Exception as e:
    print("Erro personagens:", e)
