let map;

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

function setupHandlers() {
    document.querySelector("#btnToonGemeenten").addEventListener("click", toonGemeenten);
}

async function toonGemeenten() {
    const box = map.getBounds();

    const base_url = "https://geo.api.vlaanderen.be/VRBG/wfs";
    const params = {
        request: "getFeature",
        version: "1.3.0",
        service: "WFS",
        outputFormat: "application/json",
        typeName: "VRBG:Refgem",
        BBOX: `${box.getWest()},${box.getSouth()},${box.getEast()},${box.getNorth()},EPSG:4326`,
        srsName: "EPSG:4326",
    };

    const url = new URL(base_url);
    url.search = new URLSearchParams(params);

    console.log(url);
    const response = await fetch(url);

    const json = await response.json();

    L.geoJSON(json).addTo(map);

    console.log(json);
}

setupMap();
setupHandlers();
