import fetcher from "./scripts/fetch.js";
import createNode from "./scripts/dom/createnode.js";
import errorMessage from "./scripts/errormessage.js";
import currentObject from "./scripts/currentobject.js";
import hoursObject from "./scripts/hoursobject.js";

// const FULLURL = "http./scripts/hoursobject.jsing.com/VisualCrossingWebServices/rest/services/timeline/baranovichi/2023-04-02/2023-04-02?unitGroup=metric&key=3ZPEQPZUEKMPNDUH3EGZG9RZ2&contentType=json";
const URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const URLOPTIONS = "?unitGroup=metric&contentType=json&key=";
const APIKEY = "3ZPEQPZUEKMPNDUH3EGZG9RZ2";
document.querySelector('.inptext').addEventListener('keyup', (e) => {
    if (e.code === 'Enter')
        loadWeather();
});

document.querySelector('#search-btn').addEventListener('click', loadWeather);

document.addEventListener('DOMContentLoaded', getUserLocation);

function loadWeather() {
    const city = document.querySelector('.inptext').value.trim();
    clear(['.current', '.forecast', 'img']);
    if (!document.querySelector('.error-message').classList.contains('hidden'))
        errorMessage();
    let uri = URL + city + "/" + new Date().toISOString().slice(0, 10) + "/" + new Date().toISOString().slice(0, 8) + (new Date().getDate() + 6) + URLOPTIONS + APIKEY;
    fetcher(uri, allinone)
}

function allinone(v) {
    // console.log(v);
    const ico = v.currentConditions.icon;
    document.querySelector('img').src = `./assets/icons/${ico}.svg`;
    document.querySelector('img').style.width = '100%'
    document.querySelector('.current').append(createNode(v, currentObject))

    for (let i = 0; i < 24; i++) {
        const div = document.createElement('div');
        div.classList.add('forecast-item');
        const ico = v.days[0].hours[i].icon;
        const img = document.createElement('img');
        img.src = `./assets/icons/${ico}.svg`;
        img.style.width = '75%'
        div.append(img, createNode(v, hoursObject(i)))
        document.querySelector('.forecast').append(div)
    }
}

function clear(arr) {
    arr.forEach(e => {
        document.querySelector(e).innerHTML = '';
    })

}

function success(position) { 
    // console.log('пробуем');
    const { latitude, longitude } = position.coords;
    let geoCodeURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=59000a9bcd862ca84a9068e14b8820b7`;
    fetcher(geoCodeURL, (r) => {
        document.querySelector('.inptext').value = r[0].local_names.ru;
        const city = document.querySelector('.inptext').value.trim();
        let uri = URL + city + "/" + new Date().toISOString().slice(0, 10) + "/" + new Date().toISOString().slice(0, 8) + (new Date().getDate() + 6) + URLOPTIONS + APIKEY;
        fetcher(uri, allinone);
    });
}

function error() { 
    console.log('Не удалось получить доступ к геоданным');
}


function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
}