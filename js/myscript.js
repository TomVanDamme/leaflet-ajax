let map;

const WMS_URL = "https://geo.api.vlaanderen.be/GRB/wms";
const WMS_LAYER = "GRB_ADP";

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.tileLayer
        .wms(WMS_URL, {
            layers: WMS_LAYER,
            version: "1.3.0",
            transparent: true,
            format: "image/png",
        })
        .addTo(map);
}

function setupHandlers() {
    map.on("click", getFeatureInfo);
}

async function getFeatureInfo(evt) {
    const lon = evt.latlng.lng;
    const lat = evt.latlng.lat;
    const bbox = `${lat},${lon},${lat + 0.00001},${lon + 0.00001}`;

    const params = {
        service: "WMS",
        version: "1.3.0",
        request: "GetFeatureInfo",
        crs: "EPSG:4326",
        bbox: bbox,
        i: 116,
        width: 256,
        j: 105,
        height: 256,
        layers: WMS_LAYER,
        query_layers: WMS_LAYER,
        info_format: "application/json",
    };

    const url = new URL(WMS_URL);
    url.search = new URLSearchParams(params);

    console.log(url);

    const response = await fetch(url);

    const json = await response.text();
    console.log(json);
}

setupMap();
setupHandlers();
