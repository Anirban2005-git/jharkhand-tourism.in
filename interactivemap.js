document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([23.6, 85.3], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const orangeIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const yellowIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const violetIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    const defaultIcon = new L.Icon.Default();

    const locations = [
        {
            name: "Ranchi",
            lat: 23.3441,
            lng: 85.3096,
            description: "Known as the 'City of Waterfalls', Ranchi is the capital of Jharkhand and a hub of natural beauty.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Ranchi",
            category: "City, Waterfalls, Nature"
        },
        {
            name: "Jamshedpur",
            lat: 22.8046,
            lng: 86.2029,
            description: "The 'Steel City of India' and the largest city in Jharkhand, known for its well-planned infrastructure and industrial significance.",
            image: "https://placehold.co/400x250/1d4ed8/ffffff?text=Jamshedpur",
            category: "City, Industrial, Lake"
        },
        {
            name: "Dassam Falls",
            lat: 23.2104,
            lng: 85.5039,
            description: "A breathtaking waterfall cascading from a height of 144 feet, located near Ranchi on the Subarnarekha River.",
            image: "https://placehold.co/400x250/3b82f6/ffffff?text=Dassam+Falls",
            category: "Waterfall, Nature, Picnic Spot"
        },
        {
            name: "Betla National Park",
            lat: 23.8967,
            lng: 84.1867,
            description: "Located in the Palamu district, this park is a haven for wildlife enthusiasts, known for its tigers, elephants, and ancient forts.",
            image: "https://placehold.co/400x250/1e40af/ffffff?text=Betla+National+Park",
            category: "Wildlife, Nature, Adventure"
        },
        {
            name: "Deoghar",
            lat: 24.4842,
            lng: 86.6946,
            description: "A major religious destination and one of the 12 Jyotirlinga temples, attracting pilgrims from all over India.",
            image: "https://placehold.co/400x250/3730a3/ffffff?text=Deoghar",
            category: "Pilgrimage, Temple, Religion"
        },
        {
            name: "Hundru Falls",
            lat: 23.4215,
            lng: 85.5250,
            description: "A stunning waterfall plunging from a height of 320 feet, offering a refreshing atmosphere and scenic beauty.",
            image: "https://placehold.co/400x250/4f46e5/ffffff?text=Hundru+Falls",
            category: "Waterfall, Picnic Spot, Nature"
        },
        {
            name: "Tagore Hill",
            lat: 23.4070,
            lng: 85.3262,
            description: "A popular hilltop in Ranchi, named after Rabindranath Tagore. Offers a panoramic view of the city and a peaceful atmosphere.",
            image: "https://placehold.co/400x250/6366f1/ffffff?text=Tagore+Hill",
            category: "Hill, Viewpoint, History"
        },
        {
            name: "Netarhat",
            lat: 23.4687,
            lng: 84.2708,
            description: "Often called the 'Queen of Chhotanagpur,' this hill station offers stunning views and a cool climate.",
            image: "https://placehold.co/400x250/4c1d95/ffffff?text=Netarhat",
            category: "Hill Station, Viewpoint, Nature"
        },
        {
            name: "Baba Baidyanath Temple",
            lat: 24.4939,
            lng: 86.6961,
            description: "One of the twelve Jyotirlinga shrines dedicated to Lord Shiva, this ancient temple is a major pilgrimage site in Deoghar.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Baba+Baidyanath",
            category: "Pilgrimage, Temple, Religion"
        },
        {
            name: "Parasnath Hill",
            lat: 23.9538,
            lng: 86.6346,
            description: "The highest mountain in Jharkhand and a major pilgrimage center for Jains, where 20 of the 24 Tirthankaras attained Nirvana.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Parasnath+Hill",
            category: "Pilgrimage, Hill, Religion"
        },
        {
            name: "Rajrappa Temple",
            lat: 23.6338,
            lng: 85.5414,
            description: "A famous Shaktipeeth temple dedicated to Goddess Chhinnamasta, located at the confluence of the Damodar and Bhera rivers.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Rajrappa+Temple",
            category: "Temple, Religion, Waterfall"
        },
        {
            name: "Rajmahal",
            lat: 25.05,
            lng: 87.84,
            description: "A historical town on the banks of the Ganges, known for its ruins from the Mughal era.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Rajmahal",
            category: "History, Town, River"
        },
        {
            name: "Itkhori",
            lat: 24.23,
            lng: 85.16,
            description: "A sacred site where Hinduism, Buddhism, and Jainism converge, home to the ancient Bhadrakali Temple.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Itkhori",
            category: "Temple, History, Pilgrimage"
        },
        {
            name: "Harihar Dham",
            lat: 24.032,
            lng: 85.908,
            description: "Located in Giridih, this temple is famous for having the tallest Shivalinga in the world, standing at 65 feet.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Harihar+Dham",
            category: "Temple, Religion, Architecture"
        },
        {
            name: "Birikitti Fort",
            lat: 24.63,
            lng: 87.67,
            description: "The ruins of an ancient fort built by the Rajput chief, Raja Udit Narayan, near the Maheshpur block in Pakur district.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Birikitti+Fort",
            category: "Fort, History, Ruins"
        },
        {
            name: "Baradari of Rajmahal",
            lat: 25.078,
            lng: 87.838,
            description: "The ruins of a historical building, also known as Nageshwarbagh, located in the town of Rajmahal.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Baradari+of+Rajmahal",
            category: "History, Ruins, Architecture"
        },
        {
            name: "Rankini Temple, Jadugora",
            lat: 22.65,
            lng: 86.37,
            description: "A famous temple dedicated to Goddess Kali in Jadugora, believed to be an ancient pilgrimage site.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Rankini+Temple",
            category: "Temple, Religion, History"
        },
        {
            name: "Ghatshila",
            lat: 22.59,
            lng: 86.48,
            description: "A picturesque town on the banks of the Subarnarekha River, known for its serene waterfalls and scenic hills.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Ghatshila",
            category: "Town, Waterfalls, Nature"
        },

        // ----- NEW LOCATIONS ADDED HERE -----
        {
            name: "Dalma Wildlife Sanctuary",
            lat: 22.885,
            lng: 86.208,
            description: "Famous for its population of Indian elephants, this sanctuary is a lush green forest area perfect for trekking and wildlife spotting.",
            image: "https://placehold.co/400x250/16a34a/ffffff?text=Dalma+Sanctuary",
            category: "Wildlife, Nature, Trekking"
        },
        {
            name: "Saranda Forest",
            lat: 22.28,
            lng: 85.34,
            description: "Known as the 'land of seven hundred hills', Saranda is a dense forest in the West Singhbhum district, home to a rich biodiversity.",
            image: "https://placehold.co/400x250/15803d/ffffff?text=Saranda+Forest",
            category: "Wildlife, Nature"
        },
        {
            name: "Jonha Falls (Gautam Dhara)",
            lat: 23.336,
            lng: 85.607,
            description: "A beautiful hanging valley waterfall, it's believed that Lord Buddha bathed here. Accessible via a long flight of stairs.",
            image: "https://placehold.co/400x250/2563eb/ffffff?text=Jonha+Falls",
            category: "Waterfall, Pilgrimage, Nature"
        },
        {
            name: "Palamu Tiger Reserve",
            lat: 23.75,
            lng: 84.22,
            description: "One of the first nine tiger reserves established in India, it is a critical habitat for tigers, elephants, and numerous other species.",
            image: "https://placehold.co/400x250/166534/ffffff?text=Palamu+Reserve",
            category: "Wildlife, Nature, Adventure"
        },
        {
            name: "Topchanchi Wildlife Sanctuary",
            lat: 23.89,
            lng: 86.20,
            description: "Centered around the picturesque Topchanchi Lake, this sanctuary is home to animals like leopards and barking deer, set against the backdrop of Parasnath Hills.",
            image: "https://placehold.co/400x250/14532d/ffffff?text=Topchanchi",
            category: "Wildlife, Lake, Nature"
        }
    ];

    locations.forEach(location => {
        let iconToUse = defaultIcon;
        if (location.category.includes("Wildlife")) {
            iconToUse = greenIcon;
        } else if (location.category.includes("Waterfall")) {
            iconToUse = blueIcon;
        } else if (location.category.includes("Temple") || location.category.includes("Pilgrimage")) {
            iconToUse = orangeIcon;
        } else if (location.category.includes("Hill Station")) {
            iconToUse = violetIcon;
        } else {
            iconToUse = yellowIcon;
        }

        const marker = L.marker([location.lat, location.lng], { icon: iconToUse }).addTo(map);
        marker.bindPopup(`
            <div>
                <h3 class="font-bold">${location.name}</h3>
                <p class="mt-1">${location.description}</p>
                <img src="${location.image}" alt="${location.name}" class="w-full h-auto rounded-lg mt-2">
                <p class="text-xs text-gray-500 mt-2">Category: ${location.category}</p>
            </div>
        `);
        
        marker.unbindTooltip();
    });

});