import json
import random
import math

def load_movies():
    with open('allMoviesDB.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def get_macro_category(cat):
    cat = cat.lower()
    if any(x in cat for x in ['slasher', 'gore', 'tortura', 'serial killer']):
        return 0 # O Sangue e a Lâmina
    elif any(x in cat for x in ['sobrenatural', 'fantasma']):
        return 1 # O Além e os Sussurros
    elif any(x in cat for x in ['demônio', 'possessão', 'bruxa', 'bruxaria', 'culto']):
        return 2 # O Inferno e o Oculto
    elif any(x in cat for x in ['alien', 'monstro', 'criatura', 'zumbi', 'infectado']):
        return 3 # O Bizarro e o Inumano
    else:
        return 4 # A Mente e a Loucura

def split_by_macro(movies):
    buckets = [[], [], [], [], []]
    for m in movies:
        buckets[get_macro_category(m.get('category', ''))].append(m)
    return buckets

def get_era_bucket(year):
    if year < 1980: return 0
    elif year < 1990: return 1
    elif year < 2000: return 2
    elif year < 2011: return 3
    else: return 4

def split_by_era(movies):
    buckets = [[], [], [], [], []]
    for m in movies:
        buckets[get_era_bucket(m.get('year', 2000))].append(m)
    return buckets

def get_score_bucket(score):
    if score < 5.5: return 0
    elif score < 6.5: return 1
    elif score < 7.3: return 2
    elif score < 8.0: return 3
    else: return 4

def split_by_score(movies):
    buckets = [[], [], [], [], []]
    for m in movies:
        buckets[get_score_bucket(m.get('score', 5.0))].append(m)
    return buckets

def split_evenly(movies):
    buckets = [[], [], [], [], []]
    # shuffle para aleatoriedade controlada
    random.seed(42)
    shuffled = sorted(movies, key=lambda x: x['id'])
    for i, m in enumerate(shuffled):
        buckets[i % 5].append(m)
    return buckets

# Geradores textuais
lugares = ["numa mansão em ruínas", "num asilo abandonado", "numa floresta sem lua", "no porão da sua própria casa", "num beco sem saída", "numa igreja profanada"]
objetos = ["uma caixa de música enferrujada", "um espelho que não reflete você", "uma faca ainda pingando sangue", "um diário escrito em latim", "uma boneca sem olhos"]

node_counter = 0

def build_tree(movies, depth, path_index):
    global node_counter
    node_id = f"node_{node_counter}"
    node_counter += 1

    # Se a lista de filmes for muito pequena, ou se chegamos ao fim, preencha até 3
    if depth == 6:
        # Pega top 3
        sorted_m = sorted(movies, key=lambda x: x.get('score', 0), reverse=True)
        return {
            "isResult": True,
            "movies": [m['id'] for m in sorted_m[:3]]
        }

    # Se não há filmes suficientes para espalhar (ex: ramo vazio), cai num fallback
    # Para garantir o preenchimento, se o bucket estiver vazio, pegamos filmes globais
    if len(movies) == 0:
        movies = all_movies_global

    node = { "id": node_id, "text": "", "options": [] }

    if depth == 1:
        node["text"] = "A noite cai e um calafrio percorre sua espinha. O que espreita na escuridão?"
        buckets = split_by_macro(movies)
        opt_texts = [
            "O som metálico de uma lâmina sedenta por sangue e tortura.",
            "Sussurros incorpóreos e portas batendo sozinhas no corredor.",
            "Um cântico satânico e a sensação de estar sendo possuído.",
            "A respiração gutural de uma criatura abissal ou inumana.",
            "O peso esmagador da paranóia e da loucura na própria mente."
        ]
    elif depth == 2:
        if path_index == 0: node["text"] = "Você encontra uma arma manchada. Ela parece pertencer a qual era?"
        elif path_index == 1: node["text"] = "O fantasma se manifesta. As roupas dele indicam que ele morreu em..."
        elif path_index == 2: node["text"] = "O livro de feitiços foi escrito em uma época esquecida. Qual?"
        elif path_index == 3: node["text"] = "A criatura despertou após décadas de sono. De que período ela é?"
        else: node["text"] = "O primeiro surto psicótico do paciente zero foi documentado nos anos..."
        
        buckets = split_by_era(movies)
        opt_texts = [
            "Ao passado distante e granulado dos Clássicos Cults (Pré-1980).",
            "À insana Era de Ouro dos Efeitos Práticos em fita (1980 - 1989).",
            "Ao submundo sarcástico e adolescente da década final (1990 - 1999).",
            "Aos registros digitais sombrios do Novo Milênio (2000 - 2010).",
            "Ao horror hiper-realista e estético do Presente (2011 em diante)."
        ]
    elif depth == 3:
        lugar = lugares[node_counter % len(lugares)]
        obj = objetos[node_counter % len(objetos)]
        node["text"] = f"Ao adentrar {lugar}, você nota {obj}. Que sensação exata ela te transmite?"
        
        buckets = split_by_score(movies)
        opt_texts = [
            "Uma repulsa de um pesadelo sujo, amador e obscuro (B-Movie/Trash).",
            "Uma curiosidade por um horror experimental e muito divisivo.",
            "Um medo bruto, clássico e altamente eficiente.",
            "O terror absoluto e implacável de uma história fantástica.",
            "A admiração sombria por uma obra-prima unânime da arte macabra."
        ]
    elif depth == 4:
        node["text"] = "Para desvendar seu destino, uma voz ancestral exige que você escolha uma Carta do Tarot Macabro:"
        buckets = split_evenly(movies)
        opt_texts = [
            "O LOUCO: Quero o caos imprevisível e saltar no abismo.",
            "A MORTE: Abrace a foice e o destino final inevitável.",
            "O DIABO: Cederei às tentações mais profanas e proibidas.",
            "A TORRE: Desejo ver todas as estruturas desmoronarem em sangue.",
            "A LUA: Navegarei pela ilusão e pelo medo daquilo que não vejo."
        ]
    elif depth == 5:
        node["text"] = "O corredor não tem mais saída. A besta respira na sua nuca. Como você deseja encontrar o seu fim?"
        buckets = split_evenly(movies)
        opt_texts = [
            "Com um grito sufocado na mais profunda escuridão.",
            "Encarando a face do próprio mal nos olhos, sem piscar.",
            "Correndo até que os meus pulmões queimem e o corpo ceda.",
            "Aceitando a loucura rindo histericamente de braços abertos.",
            "Lutando violentamente em um mar vermelho até a última gota de sangue."
        ]

    for i in range(5):
        # Fallback de preenchimento caso o bucket esteja vazio
        b_movies = buckets[i]
        if len(b_movies) == 0:
            b_movies = movies # Copia o parent
            
        child_node = build_tree(b_movies, depth + 1, i)
        node["options"].append({
            "text": opt_texts[i],
            "nextNode": child_node
        })

    return node

if __name__ == "__main__":
    global all_movies_global
    all_movies_global = load_movies()
    print(f"Loaded {len(all_movies_global)} movies.")
    
    quiz_tree = build_tree(all_movies_global, 1, 0)
    
    with open('quizTree.json', 'w', encoding='utf-8') as f:
        json.dump(quiz_tree, f, indent=2, ensure_ascii=False)
        
    print(f"Tree generated successfully! Nodes created: {node_counter}")
