import urllib.request
import os

images = {
    "w1_lothar.webp": "https://static.wikia.nocookie.net/wowpedia/images/a/a4/Anduin_Lothar.jpg",
    "w1_llane.webp": "https://static.wikia.nocookie.net/wowpedia/images/0/05/KingLlaneWrynn.jpg",
    "w1_orgrim.webp": "https://static.wikia.nocookie.net/wowpedia/images/e/ef/Orgrim_Doomhammer_Warlords_of_Draenor.jpg",
    "w1_guldan.webp": "https://static.wikia.nocookie.net/wowpedia/images/3/3f/Gul%27dan_Warcraft_III_Reforged.jpg",
    "w2_turalyon.webp": "https://static.wikia.nocookie.net/wowpedia/images/c/c8/High_Exarch_Turalyon_Argus.jpg",
    "w2_uther.webp": "https://static.wikia.nocookie.net/wowpedia/images/1/1c/Uther_the_Lightbringer_Warcraft_III_Reforged.jpg",
    "w2_grommash.webp": "https://static.wikia.nocookie.net/wowpedia/images/3/37/Grommash_Hellscream_Warcraft_III_Reforged.jpg",
    "w2_chogall.webp": "https://static.wikia.nocookie.net/wowpedia/images/2/22/Cho%27gall_Cataclysm.jpg",
    "w3_arthas.webp": "https://static.wikia.nocookie.net/wowpedia/images/c/cc/Arthas_Menethil_Warcraft_III_Reforged.jpg",
    "w3_thrall.webp": "https://static.wikia.nocookie.net/wowpedia/images/7/7b/Thrall_Warcraft_III_Reforged.jpg",
    "w3_jaina.webp": "https://static.wikia.nocookie.net/wowpedia/images/6/6d/Jaina_Proudmoore_Warcraft_III_Reforged.jpg",
    "w3_tyrande.webp": "https://static.wikia.nocookie.net/wowpedia/images/f/fe/Tyrande_Whisperwind_Warcraft_III_Reforged.jpg",
    "w3_illidan.webp": "https://static.wikia.nocookie.net/wowpedia/images/c/c0/Illidan_Stormrage_Warcraft_III_Reforged.jpg",
    "w3_sylvanas.webp": "https://static.wikia.nocookie.net/wowpedia/images/f/f6/Sylvanas_Windrunner_Warcraft_III_Reforged.jpg",
    "w3_kaelthas.webp": "https://static.wikia.nocookie.net/wowpedia/images/5/52/Kael%27thas_Sunstrider_Warcraft_III_Reforged.jpg",
    "w3_maiev.webp": "https://static.wikia.nocookie.net/wowpedia/images/9/9d/Maiev_Shadowsong_Warcraft_III_Reforged.jpg"
}

os.makedirs("images", exist_ok=True)

for filename, url in images.items():
    print(f"Downloading {filename}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        data = urllib.request.urlopen(req).read()
        with open(os.path.join("images", filename), "wb") as f:
            f.write(data)
        print("Success.")
    except Exception as e:
        print(f"Failed: {e}")
