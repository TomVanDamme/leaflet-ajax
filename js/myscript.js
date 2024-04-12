let map;

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

function doAJAXusingFetch() {
    const url = document.querySelector("#urlInput").value;

    fetch(url)
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log(error))
        .finally(() => console.log("Dit doen we altijd!!"));
}

async function doAJAXusingAwait() {
    const url = document.querySelector("#urlInput").value;

    const response = await fetch(url);

    const json = await response.json();

    console.log(json);
}

function setupHandlers() {
    document.querySelector("#fetchButton").addEventListener("click", doAJAXusingFetch);
    document.querySelector("#awaitButton").addEventListener("click", doAJAXusingAwait);
}

setupMap();
setupHandlers();
