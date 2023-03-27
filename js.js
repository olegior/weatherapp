import fetcher from "./scripts/fetch.js";
import createNode from "./scripts/createul.js";
import forecast from "./scripts/forecast.js";
import getUserLocation from "./scripts/geolocation.js";

const URL = 'https://api.openweathermap.org/data/2.5';
const API = '59000a9bcd862ca84a9068e14b8820b7';

document.querySelector('.inptext').addEventListener('keyup', (e) => {
    if (e.code === 'Enter')
        start();
});
document.querySelector('#search-btn').addEventListener('click', start)

function start() {
    clear(['.current', '.forecast']);
    // navigator.geolocation.getCurrentPosition(success, error)

    const city = document.querySelector('.inptext').value;
    // let req = `${URL}/geo/1.0/direct?q=${city}&appid=${API}`;
    // fetcher(req, getLocation, API

    //$$$$$$$$$$$$$$$$
    let currentRequest = `${URL}/weather?q=${city}&appid=${API}&lang=ru&units=metric`;
    fetcher(currentRequest, create);

    // let url = `${URL}/forecast?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&cnt=5&units=metric`;
    // let forecastRequest = `${URL}/forecast?q=${city}&appid=${API}&lang=ru&cnt=8&units=metric`;

    //$$$$$$$$$$$$$$$$
    // let forecastRequest = `${URL}/forecast?q=${city}&appid=${API}&lang=ru&units=metric&cnt=1`;
    // fetcher(forecastRequest, forecast);
}

function clear(arr) {
    arr.forEach(e => {
        document.querySelector(e).innerHTML = '';
    })
}

// function getLocation(result) {
//     const { lat, lon } = JSON.parse(result)[0];
//     console.log(lat, lon);
//     // let req = `${URL}/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&units=metric`;
//     let currentRequest = `${URL}/weather?q=${city}&appid=${API}&lang=ru&units=metric`;
//     fetcher(currentRequest, create)
//     // let url = `${URL}/forecast?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&cnt=5&units=metric`;
//     let forecastRequest = `${URL}/forecast?lat=${city}&appid=${API}&lang=ru&cnt=5&units=metric`;

//     fetcher(forecastRequest, forecast)
// }

function create(o) {
    // const o = JSON.parse(result);
    document.querySelector('.current').append(createNode(o))
}



function success(position) {  // если всё хорошо, собираем ссылку
    const { longitude, latitude } = position.coords;
    let req = `${URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API}&lang=ru&units=metric`;
    fetcher(req, create);
}

function error() { // если всё плохо, просто напишем об этом
    // status.textContent = 'Не получается определить вашу геолокацию :('
    let currentRequest = `${URL}/weather?q=${city}&appid=${API}&lang=ru&units=metric`;
    fetcher(req, create);
}
