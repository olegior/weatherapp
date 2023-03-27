export default function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success, error)
}
function success(position) {  // если всё хорошо, собираем ссылку
    const { longitude, latitude } = position.coords;
    return [longitude,latitude]
}

function error() { // если всё плохо, просто напишем об этом
    status.textContent = 'Не получается определить вашу геолокацию :('
}