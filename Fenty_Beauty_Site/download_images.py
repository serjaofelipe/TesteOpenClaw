import urllib.request
import json
import os

def get_wiki_image(title):
    api_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=1000"
    try:
        # User-agent necessário para a API da Wikipedia
        req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            pages = data['query']['pages']
            for page_id in pages:
                if 'thumbnail' in pages[page_id]:
                    return pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(f"Erro ao obter imagem para {title}: {e}")
    return None

images = {
    "fenty_logo.jpg": get_wiki_image("Fenty_Beauty"),
    "lipstick.jpg": get_wiki_image("Lipstick"),
    "foundation.jpg": get_wiki_image("Foundation_(cosmetics)"),
    "mascara.jpg": get_wiki_image("Mascara")
}

def download_images():
    base_dir = r"C:\Users\USER\.gemini\antigravity\scratch\Projects_Openclaw\Teste_Openclaw\Fenty_Beauty_Site"
    assets_dir = os.path.join(base_dir, "assets")
    os.makedirs(assets_dir, exist_ok=True)
    
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
    urllib.request.install_opener(opener)
    
    for filename, url in images.items():
        if not url: 
            print(f"Nenhuma URL encontrada para {filename}")
            continue
            
        filepath = os.path.join(assets_dir, filename)
        if not os.path.exists(filepath):
            print(f"Baixando {filename}...")
            try:
                urllib.request.urlretrieve(url, filepath)
                print(f"Salvo: {filepath}")
            except Exception as e:
                print(f"Erro ao baixar {url}: {e}")
        else:
            print(f"Arquivo já existe: {filename}")

if __name__ == "__main__":
    download_images()
