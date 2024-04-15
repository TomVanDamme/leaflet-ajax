let map;

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

async function zoekAdres() {
    const base_url = "https://geo.api.vlaanderen.be/geolocation/v4/Location";
    const adres = document.querySelector("#adresInput").value;

    try {
        const url = encodeURI(`${base_url}?q=${adres}`);
        console.log(url);
        const response = await fetch(url);

        const json = await response.json();
        console.log(json);

        if (json.LocationResult.length > 0) {
            lat = json.LocationResult[0].Location.Lat_WGS84;
            lng = json.LocationResult[0].Location.Lon_WGS84;

            const location = L.latLng(lat, lng);

            map.flyTo(location, 15);

            map.openPopup(json.LocationResult[0].FormattedAddress, location);
        } else {
            alert("Geen resultaten gevonden");
        }
    } catch (error) {
        console.log(error);
    }
}

function setupHandlers() {
    document.querySelector("#zoekButton").addEventListener("click", zoekAdres);
}

setupMap();
setupHandlers();
