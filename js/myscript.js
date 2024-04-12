let map;

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}
function getFeatures() {
    return {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    locatie: "zuidwest",
                },
                geometry: {
                    coordinates: [
                        [
                            [3.688867292283703, 51.04648218895122],
                            [3.68449002353168, 51.03539515047018],
                            [3.7013062783776434, 51.03539515047018],
                            [3.698564031439389, 51.0470867015523],
                            [3.688867292283703, 51.04648218895122],
                        ],
                    ],
                    type: "Polygon",
                },
            },
            {
                type: "Feature",
                properties: {
                    locatie: "noordoost",
                },
                geometry: {
                    coordinates: [
                        [
                            [3.7275661732646768, 51.06400711380738],
                            [3.7275661732646768, 51.042612951771304],
                            [3.748753204755616, 51.042612951771304],
                            [3.748753204755616, 51.06400711380738],
                            [3.7275661732646768, 51.06400711380738],
                        ],
                    ],
                    type: "Polygon",
                },
            },
            {
                type: "Feature",
                properties: { waarde: "3" },
                geometry: {
                    coordinates: [3.696271790461765, 51.059451347888114],
                    type: "Point",
                },
            },
            {
                type: "Feature",
                properties: { waarde: "1" },
                geometry: {
                    coordinates: [3.7222392648476443, 51.06409024340664],
                    type: "Point",
                },
            },
            {
                type: "Feature",
                properties: { waarde: "2" },
                geometry: {
                    coordinates: [3.749162932409547, 51.03083848199495],
                    type: "Point",
                },
            },
            {
                type: "Feature",
                properties: {},
                geometry: {
                    coordinates: [
                        [3.712941575412003, 51.02826196656727],
                        [3.736175836954345, 51.03195657432542],
                        [3.7215488462474013, 51.04459185348736],
                        [3.719638445298841, 51.061258255139876],
                        [3.733307807872734, 51.068560730958836],
                    ],
                    type: "LineString",
                },
            },
        ],
    };
}

function addGeoJSON(geoJSON) {
    L.geoJSON(geoJSON, {
        style: function (feature) {
            let kleur = "grey";
            if (feature.properties["locatie"] == "noordoost") {
                kleur = "blue";
            } else if (feature.properties["locatie"] == "zuidwest") {
                kleur = "green";
            }

            return { color: kleur };
        },
        pointToLayer: function (geoJsonPoint, latLng) {
            return L.circleMarker(latLng);
        },
        onEachFeature: function (feature, layer) {
            if (feature.geometry.type == "Point") {
                popup = feature.properties.waarde;
                layer.bindPopup(popup);
            }
        },
    }).addTo(map);
}

setupMap();
addGeoJSON(getFeatures());
