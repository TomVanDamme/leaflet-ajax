let map;

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

async function toonIsochrones(lat, lng) {
    const locations = [[lng, lat]];
    const range = [400];

    const url = "https://api.openrouteservice.org/v2/isochrones/driving-car";

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "5b3ce3597851110001cf6248105bde58b41543179d1cee6b3c3e4e6e",
        },
        body: JSON.stringify({ locations: locations, range: range }),
    };

    const response = await fetch(url, params);
    const json = await response.json();

    L.geoJSON(json).addTo(map);
    console.log(json);
}

async function toonIsochrones(lat, lng) {
    const locations = [[lng, lat]];
    const range = [400];

    const url = "https://api.openrouteservice.org/v2/isochrones/driving-car";

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "5b3ce3597851110001cf6248105bde58b41543179d1cee6b3c3e4e6e",
        },
        body: JSON.stringify({ locations: locations, range: range }),
    };

    const response = await fetch(url, params);
    const json = await response.json();

    L.geoJSON(json).addTo(map);
    console.log(json);
}

async function zoekAdres() {
    const base_url = "https://geo.api.vlaanderen.be/geolocation/v4/Location";
    const adres = document.querySelector("#adresInput").value;

    try {
        const url = encodeURI(`${base_url}?q=${adres}`);
        console.log(url);

        const response = await fetch(url);

        const json = await response.json();

        if (json.LocationResult.length > 0) {
            lat = json.LocationResult[0].Location.Lat_WGS84;
            lng = json.LocationResult[0].Location.Lon_WGS84;

            const location = L.latLng(lat, lng);

            toonIsochrones(lat, lng);

            map.flyTo(location, 12);

            map.openPopup(json.LocationResult[0].FormattedAddress, location);
        } else {
            alert("Geen resultaten gevonden");
        }
    } catch (error) {
        console.log(error);
    }

    console.log("Dit doen we altijd");
}

function setupHandlers() {
    document.querySelector("#zoekButton").addEventListener("click", zoekAdres);
}

setupMap();
setupHandlers();
