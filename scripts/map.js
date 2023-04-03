export default function setMap(coords) {
    document.querySelector('.mapbox').innerHTML = '<div id="map"></div>';

    const map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = L.marker(coords).addTo(map);

}