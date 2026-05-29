const cars = [
    { name: "125 S", year: 1947, img: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ferrari_125_S_1947.jpg" },
    { name: "250 GTO", year: 1962, img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Ferrari_250_GTO_%281962%29.jpg" },
    { name: "Testarossa", year: 1984, img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ferrari_Testarossa_-_Flickr_-_Alexandre_Pr%C3%A9vot_%2812%29.jpg" },
    { name: "F40", year: 1987, img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/F40_Ferrari_20090509.jpg" },
    { name: "F50", year: 1995, img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Ferrari_F50.jpg" },
    { name: "Enzo", year: 2002, img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Ferrari_Enzo_-_Flickr_-_Alexandre_Pr%C3%A9vot_%283%29.jpg" },
    { name: "458 Italia", year: 2009, img: "https://upload.wikimedia.org/wikipedia/commons/3/30/Ferrari_458_Italia_--_05-18-2011.jpg" },
    { name: "LaFerrari", year: 2013, img: "https://upload.wikimedia.org/wikipedia/commons/e/eb/LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg" },
    { name: "812 Superfast", year: 2017, img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ferrari_812_Superfast_Genf_2018.jpg" },
    { name: "SF90 Stradale", year: 2019, img: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ferrari_SF90_Stradale_at_IAA_2019_IMG_0333.jpg" },
    { name: "Roma", year: 2020, img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Ferrari_Roma_1.jpg" },
    { name: "Purosangue", year: 2022, img: "https://upload.wikimedia.org/wikipedia/commons/0/07/2023_Ferrari_Purosangue.jpg" },
    { name: "12Cilindri", year: 2024, img: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ferrari_12Cilindri_front_Miami.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timelineContainer');
    const muralGrid = document.getElementById('muralGrid');

    // Sort cars by year ascending
    cars.sort((a, b) => a.year - b.year);

    // Populate Timeline
    cars.forEach(car => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <img src="${car.img}" alt="${car.name}" class="timeline-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'">
            <div class="timeline-content">
                <div class="timeline-year">${car.year}</div>
                <div class="timeline-name">${car.name}</div>
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    // Populate Mural Grid (shuffled or reversed for variety)
    const muralCars = [...cars].reverse(); // newest first
    muralCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'">
            <div class="car-overlay">
                <h3>${car.name}</h3>
                <p>${car.year}</p>
            </div>
        `;
        muralGrid.appendChild(card);
    });
});
