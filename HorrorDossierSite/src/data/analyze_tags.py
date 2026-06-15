import json
import re
from collections import Counter

with open('allMoviesDB.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

# Let's count common scary words in stories to form tags
words = []
stopwords = set(["o", "a", "os", "as", "um", "uma", "de", "do", "da", "em", "no", "na", "que", "e", "com", "para", "por", "como", "se", "seu", "sua", "ele", "ela"])

for m in movies:
    story = m.get('story', '').lower()
    # remove punctuation
    story = re.sub(r'[^\w\s]', '', story)
    tokens = story.split()
    words.extend([w for w in tokens if w not in stopwords and len(w) > 4])

counts = Counter(words)
print("Top 50 words in stories:")
for word, count in counts.most_common(50):
    print(f"{word}: {count}")

