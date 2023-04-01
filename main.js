import fetcher from "./scripts/fetch.js";
import createNode from "./scripts/dom/createnode.js";
import forecast from "./scripts/forecast.js";
import makeObject from "./scripts/makeobject.js";

const URL = 'https://pro.openweathermap.org/data/2.5';
const API = '59000a9bcd862ca84a9068e14b8820b7';
const quantity = 8;

// makeDOM();
document.querySelector('.inptext').addEventListener('keyup', (e) => {
    if (e.code === 'Enter')
        loadWeather();
});

document.querySelector('#search-btn').addEventListener('click', loadWeather);

document.addEventListener('DOMContentLoaded', getUserLocation);

function loadWeather() {
    const city = document.querySelector('.inptext').value.trim();
    clear(['.current', '.forecast']);

    // let req = `${URL}/geo/1.0/direct?q=${city}&appid=${API}`;
    //$$$$$$$$$$$$$$$$
    let currentRequest = `${URL}/weather?q=${city}&appid=${API}&lang=ru&units=metric`;
    fetcher(currentRequest, current);

    // let url = `${URL}/forecast?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&cnt=5&units=metric`;
    // let forecastRequest = `${URL}/forecast?q=${city}&appid=${API}&lang=ru&cnt=8&units=metric`;

    //$$$$$$$$$$$$$$$$ убрать hourly
    let forecastRequest = `${URL}/forecast/hourly?q=${city}&appid=${API}&lang=ru&units=metric`;
    fetcher(forecastRequest, forecast);
}

function clear(arr) {
    arr.forEach(e => {
        document.querySelector(e).innerHTML = '';
    })
}

function current(o) {
    const ico = o.weather[0].icon;
    const img = document.querySelector('img');
    img.src = `https://openweathermap.org/img/wn/${ico}@2x.png`;
    document.querySelector('.current').append(createNode(o,makeObject));
    document.querySelector('.inptext').value = o.name;
}



function success(position) {  // если всё хорошо, собираем ссылку
    console.log('пробуем');
    const { longitude, latitude } = position.coords;
    let req = `${URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API}&lang=ru&units=metric`;
    fetcher(req, current);
    let forec = `${URL}/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${API}&lang=ru&units=metric`;
    fetcher(forec, forecast);
}

function error() { // если всё плохо, просто напишем об этом
    // status.textContent = 'Не получается определить вашу геолокацию :('
    console.log('Не удалось получить доступ к геоданным');
}


function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
}