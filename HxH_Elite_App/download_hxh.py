import requests
import json
import os
import time

characters = {
    "gon": "Gon Freecss",
    "killua": "Killua Zoldyck",
    "kurapika": "Kurapika",
    "leorio": "Leorio Paradinight",
    "hisoka": "Hisoka Morow",
    "chrollo": "Chrollo Lucilfer",
    "meruem": "Meruem",
    "netero": "Isaac Netero"
}

arcs = {
    "arc_exam": "Hunter Exam",
    "arc_zoldyck": "Zoldyck Family",
    "arc_arena": "Heavens Arena",
    "arc_yorknew": "Yorknew City",
    "arc_greed": "Greed Island",
    "arc_chimera": "Chimera Ant",
    "arc_election": "13th Hunter Chairman Election",
    "arc_dark": "Dark Continent",
    "arc_succession": "Succession Contest"
}

os.makedirs("images", exist_ok=True)

def download_image(url, filename):
    try:
        res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if res.status_code == 200:
            with open(os.path.join("images", filename), "wb") as f:
                f.write(res.content)
            print(f"Downloaded {filename}")
            return True
        return False
    except:
        return False

# Jikan API for characters
for key, name in characters.items():
    print(f"Searching Jikan API for {name}...")
    try:
        res = requests.get(f"https://api.jikan.moe/v4/characters?q={name}&limit=1")
        data = res.json()
        if data.get("data") and len(data["data"]) > 0:
            img_url = data["data"][0]["images"]["jpg"]["image_url"]
            download_image(img_url, f"{key}.jpg")
        else:
            print(f"Could not find {name} on Jikan.")
    except Exception as e:
        print(f"Error for {name}: {e}")
    time.sleep(1) # rate limit

# Since Jikan doesn't have "Arcs" directly with images, we can fetch images of the anime in general,
# or we can use generic Hunter x Hunter images for arcs.
# Let's fetch some anime screenshots from Jikan for HxH (Anime ID 11061)
try:
    print("Fetching anime pictures for arcs...")
    res = requests.get("https://api.jikan.moe/v4/anime/11061/pictures")
    data = res.json()
    if data.get("data"):
        pics = data["data"]
        arc_keys = list(arcs.keys())
        for i, key in enumerate(arc_keys):
            if i < len(pics):
                img_url = pics[i]["jpg"]["image_url"]
                download_image(img_url, f"{key}.jpg")
except Exception as e:
    print(f"Error fetching anime pics: {e}")

# Download a background image
bg_url = "https://wallpaperaccess.com/full/1126343.jpg" # Example fallback
print("Downloading background...")
if not download_image("https://images.alphacoders.com/599/599602.png", "bg.jpg"):
    download_image("https://w0.peakpx.com/wallpaper/528/136/HD-wallpaper-hunter-x-hunter-gon-freecss-killua-zoldyck.jpg", "bg.jpg")

print("Done downloading images.")
