import urllib.request
import json
import os
import re

characters = [
    "Anduin Lothar", "Llane Wrynn", "Orgrim Doomhammer", "Gul'dan",
    "Turalyon", "Uther the Lightbringer", "Grommash Hellscream", "Cho'gall",
    "Arthas Menethil", "Thrall", "Jaina Proudmoore", "Tyrande Whisperwind",
    "Illidan Stormrage", "Sylvanas Windrunner", "Kael'thas Sunstrider", "Maiev Shadowsong"
]

images_dir = "images"
os.makedirs(images_dir, exist_ok=True)

for char in characters:
    print(f"Fetching image for {char}...")
    title = char.replace(" ", "_").replace("'", "%27")
    
    url = f"https://warcraft.wiki.gg/api.php?action=query&prop=pageimages&titles={title}&pithumbsize=600&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    try:
        res = urllib.request.urlopen(req).read()
        data = json.loads(res)
        pages = data['query']['pages']
        page_id = list(pages.keys())[0]
        
        if page_id != "-1" and 'thumbnail' in pages[page_id]:
            img_url = pages[page_id]['thumbnail']['source']
            print(f"  -> Found URL: {img_url}")
            
            # Download image
            filename = re.sub(r'[^a-zA-Z0-9]', '_', char) + ".jpg"
            filepath = os.path.join(images_dir, filename)
            
            img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            img_data = urllib.request.urlopen(img_req).read()
            
            with open(filepath, 'wb') as f:
                f.write(img_data)
                
            print(f"  -> Saved to {filepath}")
        else:
            print(f"  -> No image found on wiki.gg for {char}")
    except Exception as e:
        print(f"  -> Error: {e}")
