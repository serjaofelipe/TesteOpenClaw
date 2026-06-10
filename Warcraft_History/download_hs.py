import requests
import json
import os
import re

characters = {
    "w1_lothar": "Lothar",
    "w1_llane": "King Llane",
    "w1_orgrim": "Orgrim",
    "w1_guldan": "Gul'dan",
    "w2_turalyon": "Turalyon",
    "w2_uther": "Uther Lightbringer",
    "w2_grommash": "Grommash Hellscream",
    "w2_chogall": "Cho'gall",
    "w3_arthas": "The Lich King", # or Arthas Menethil
    "w3_thrall": "Thrall",
    "w3_jaina": "Jaina Proudmoore",
    "w3_tyrande": "Tyrande Whisperwind",
    "w3_illidan": "Illidan Stormrage",
    "w3_sylvanas": "Sylvanas Windrunner",
    "w3_kaelthas": "Kael'thas Sunstrider",
    "w3_maiev": "Maiev Shadowsong"
}

os.makedirs("images", exist_ok=True)

print("Downloading Hearthstone cards.json...")
try:
    res = requests.get("https://api.hearthstonejson.com/v1/latest/enUS/cards.json")
    cards = res.json()
except Exception as e:
    print(f"Error fetching cards: {e}")
    exit(1)

def find_card_id(name):
    # Try exact match first
    for card in cards:
        if card.get("name") == name and "id" in card:
            # Prefer hero or legendary minion
            if card.get("type") == "HERO":
                return card["id"]
    for card in cards:
        if card.get("name") == name and "id" in card:
            return card["id"]
            
    # Try partial match
    for card in cards:
        if card.get("name") and name in card["name"]:
            return card["id"]
    return None

for filename, name in characters.items():
    print(f"Searching for {name}...")
    card_id = find_card_id(name)
    
    if card_id:
        print(f"Found ID {card_id} for {name}.")
        img_url = f"https://art.hearthstonejson.com/v1/render/latest/enUS/512x/{card_id}.png"
        try:
            img_res = requests.get(img_url)
            if img_res.status_code == 200:
                with open(os.path.join("images", filename + ".png"), "wb") as f:
                    f.write(img_res.content)
                print(f"Successfully downloaded {filename}.png")
            else:
                print(f"Failed to download image for {name} (HTTP {img_res.status_code})")
        except Exception as e:
            print(f"Error downloading image for {name}: {e}")
    else:
        print(f"Could not find Hearthstone card for {name}.")
