import urllib.request
import urllib.parse
import json
import time

def download_wikipedia_images(page_title, max_images=6):
    print("Buscando imagens na API da Wikipedia...")
    url = f"https://pt.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(page_title)}&prop=images&imlimit=50&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    res = urllib.request.urlopen(req).read().decode('utf-8')
    data = json.loads(res)
    pages = data['query']['pages']
    page = list(pages.values())[0]
    
    if 'images' not in page:
        print("Nenhuma imagem encontrada.")
        return
        
    images = [img['title'] for img in page['images'] if img['title'].lower().endswith(('.jpg', '.jpeg'))]
    
    # Filtra imagens para evitar icones irrelevantes
    valid_images = [img for img in images if 'bolsonaro' in img.lower() or 'presidente' in img.lower()]
    if not valid_images:
        valid_images = images # fallback
        
    count = 0
    for img_title in valid_images:
        if count >= max_images:
            break
        try:
            url2 = f"https://pt.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(img_title)}&prop=imageinfo&iiprop=url&format=json"
            req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
            res2 = urllib.request.urlopen(req2).read().decode('utf-8')
            data2 = json.loads(res2)
            pages2 = data2['query']['pages']
            page2 = list(pages2.values())[0]
            
            if 'imageinfo' in page2:
                img_url = page2['imageinfo'][0]['url']
                print(f"Baixando: {img_url}")
                
                req3 = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                img_data = urllib.request.urlopen(req3).read()
                
                filename = f"bolsonaro{count+1}.jpg"
                with open(filename, "wb") as f:
                    f.write(img_data)
                print(f"-> Salvo como {filename} ({len(img_data)} bytes)")
                count += 1
                time.sleep(1) # Be polite to API
        except Exception as e:
            print(f"Erro ao baixar {img_title}: {e}")

if __name__ == "__main__":
    download_wikipedia_images("Jair_Bolsonaro", 6)
