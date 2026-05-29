import requests

urls = [
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Jair_Bolsonaro_2019.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/22/Presidente_da_Rep%C3%BAblica%2C_Jair_Bolsonaro_durante_Solenidade_de_Posse_-_45864190975.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Jair_Bolsonaro_2018.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/67/Presidente_Jair_Bolsonaro_%2850931221762%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/Jair_Bolsonaro_2020.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Bolsonaro_discursa.jpg"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Referer": "https://pt.wikipedia.org/"
}

for i, url in enumerate(urls):
    try:
        res = requests.get(url, headers=headers, timeout=10)
        res.raise_for_status()
        with open(f"bolsonaro{i+1}.jpg", "wb") as f:
            f.write(res.content)
        print(f"Baixado {i+1} com sucesso, tamanho: {len(res.content)} bytes")
    except Exception as e:
        print(f"Erro ao baixar {i+1}: {e}")
