let map;

function setupMap() {
    // Initialize Leaflet map
    map = L.map("map").setView([51.0538, 3.725], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

function setupGeocoding() {
    const options = {
        url: "http://api.openrouteservice.org/geocode",
    };
    L.control.geocoder("5b3ce3597851110001cf6248105bde58b41543179d1cee6b3c3e4e6e", options).addTo(map);
}

function setupAutocomplete() {
    $("#suggestionInput").autocomplete({
        preProcess: (suggestionsResponse) => {
            console.log(suggestionsResponse);
            return suggestionsResponse.SuggestionResult;
        },
        filterMinChars: 3,
        onPick(el, item) {
            alert("User picked " + item.textContent);
        },
    });
}

setupMap();
setupGeocoding();
setupAutocomplete();
