// Initialize Map
let map;


function initMap() {
    map = L.map('map').setView([19.0760, 72.8777], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

// Sample Ride Data
const rides = [
    {
        id: 1,
        from: "Mumbai Central Station",
        to: "Andheri West",
        time: "08:30 AM",
        price: 150,
        seats: 2,
        coords: [19.0657, 72.8684]
    },
    {
        id: 2,
        from: "Churchgate Station",
        to: "Bandra Kurla Complex",
        time: "09:15 AM",
        price: 180,
        seats: 3,
        coords: [19.0760, 72.8777]
    }
];

// Find Rides Function
function findRides() {
    const origin = document.getElementById('origin').value.toLowerCase();
    const destination = document.getElementById('destination').value.toLowerCase();
    
    // Filter Rides
    const filteredRides = rides.filter(ride => 
        ride.from.toLowerCase().includes(origin) &&
        ride.to.toLowerCase().includes(destination)
    );
    
    updateResults(filteredRides);
    updateMap(filteredRides);
}

// Update Results List
function updateResults(rides) {
    const container = document.getElementById('ridesList');
    const count = document.getElementById('resultsCount');
    
    container.innerHTML = '';
    count.textContent = rides.length;
    
    rides.forEach(ride => {
        const card = document.createElement('div');
        card.className = 'ride-card fade-in';
        card.innerHTML = `
            <h4>${ride.from} to ${ride.to}</h4>
            <p>⏰ ${ride.time} | 🪑 ${ride.seats} seats</p>
            <div class="ride-footer">
                <h3>₹${ride.price}</h3>
                <button onclick="bookRide(${ride.id})" class="book-btn">
                    Book Now
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update Map Markers
function updateMap(rides) {
    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Add new markers
    rides.forEach(ride => {
        L.marker(ride.coords)
            .addTo(map)
            .bindPopup(`<b>${ride.from} to ${ride.to}</b><br>₹${ride.price}`);
    });
}

// Book Ride Function
function bookRide(rideId) {
    const ride = rides.find(r => r.id === rideId);
    if (ride) {
        alert(`Booking confirmed for ${ride.from} to ${ride.to}!`);
    }
}

// Initialize Map on Load
window.onload = initMap;