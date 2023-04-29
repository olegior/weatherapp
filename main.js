import fetcher from "./scripts/app/fetch.js";
import createNode from "./scripts/app/createnode.js";
import errorMessage from "./scripts/app/errormessage.js";
import currentObject from "./scripts/app/currentobject.js";
import hoursObject from "./scripts/app/hoursobject.js";
import daysObject from "./scripts/app/daysobject.js";
import setMap from "./scripts/app/map.js";

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
    clear(['.current', '.forecast', 'img', '.week']);
    if (!document.querySelector('.error-message').classList.contains('hidden'))
        errorMessage();

    /// переделать под ф-цию
    const currentDate = new Date();
    const fromDate = currentDate.toISOString().slice(0, 10);
    const toDate = new Date(currentDate.setDate(currentDate.getDate() + 6)).toISOString().slice(0, 10);
    let uri = `${URL + city}/${fromDate}/${toDate + URLOPTIONS + APIKEY}`;
    fetcher(uri, allinone);

}

function allinone(v) {
    // console.dir(v);
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
        img.style.width = '75%';
        // img.style.height = '50px';
        div.append(img, createNode(v, hoursObject(i)));
        if (v.currentConditions.datetime.slice(0, 2) == i) {
            div.classList.add('now');
        }
        document.querySelector('.forecast').append(div);
    }

    const { latitude, longitude } = v;

    const days = [...v.days];
    // console.log(days);
    days.forEach((e, i) => {
        const div = document.createElement('div');
        div.classList.add('week-item', 'section');
        // div.append(createNode(e, daysObject), document.createElement('hr'));
        div.append(createNode(e, daysObject));
        if (i !== 0)
            document.querySelector('.week').append(div);
    })
    setMap([latitude, longitude]);

    const weather = document.querySelector('.weatherapp');
    if (weather.classList.contains('hidden'))
        weather.classList.remove('hidden');


    document.querySelector('.now').scrollIntoView({ behavior: "smooth", inline: 'center' });

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
        const currentDate = new Date();
        const fromDate = currentDate.toISOString().slice(0, 10);
        const toDate = new Date(currentDate.setDate(currentDate.getDate() + 6)).toISOString().slice(0, 10);

        let uri = URL + city + "/" + fromDate + "/" + toDate + URLOPTIONS + APIKEY;
        fetcher(uri, allinone);
        // setMap([latitude,longitude]);

    });

}

function error() {
    console.log('Не удалось получить доступ к геоданным');
}


function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
}