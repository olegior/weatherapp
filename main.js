import fetcher from "./scripts/app/fetch.js";
import createNode from "./scripts/app/createnode.js";
import errorMessage from "./scripts/app/errormessage.js";
import currentObject from "./scripts/app/currentobject.js";
import hoursObject from "./scripts/app/hoursobject.js";
import daysObject from "./scripts/app/daysobject.js";
import setMap from "./scripts/app/map.js";

// const FULLURL = "http./scripts/hoursobject.jsing.com/VisualCrossingWebServices/rest/services/timeline/baranovichi/2023-04-02/2023-04-02?unitGroup=metric&key=3ZPEQPZUEKMPNDUH3EGZG9RZ2&contentType=json";
const URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const URLOPTIONS = "?unitGroup=metric&contentType=json&key=3ZPEQPZUEKMPNDUH3EGZG9RZ2";

(function addEventListeners() {
    document.querySelector('.inptext').addEventListener('keyup', (e) => {
        // if (e.code === 'Enter' || e.keyCode === 13 || e.keyCode === 10) {
        if (e.code === 'Enter' || e.keyCode === 13) {
            loadWeather();
            document.querySelector('.inptext').setAttribute('disabled', '');
        }
    });
    document.querySelector('#search-btn').addEventListener('click', loadWeather);
    document.addEventListener('DOMContentLoaded', getUserLocation);
})()

function loadWeather() {
    try {
        document.querySelector('#search-btn').setAttribute('disabled', '');

        const city = document.querySelector('.inptext').value.trim();
        clear(['.current', 'img', '.week']);
        // clear(['.current', '.forecast', 'img', '.week']);
        if (!document.querySelector('.error-message').classList.contains('hidden')) {
            errorMessage();
        }
        document.querySelector('.weatherapp').classList.add('hidden');
        const { fromDate, toDate } = getCurrentDate();
        let uri = `${URL + city}/${fromDate}/${toDate + URLOPTIONS}`;
        fetcher(uri, allinone);
    }
    catch (err) {
        // if (!document.querySelector('.error-message').classList.contains('hidden'))
        //     errorMessage();
        // console.log(err);
    }
}

function allinone(weatherObject) {
    // console.dir(weatherObject);
    const ico = weatherObject.currentConditions.icon;
    document.querySelector('img').src = `./assets/icons/${ico}.svg`;
    document.querySelector('.current').append(createNode(weatherObject, currentObject));

    // for (let i = 0; i < 24; i++) {
    //     if (v.currentConditions.datetime.slice(0, 2) == i) {
    //         div.classList.add('now');
    //     }
    //     document.querySelector('.forecast').append(div);
    // }

    const { latitude, longitude } = weatherObject;

    const days = [...weatherObject.days];
    // console.log(days);
    days.forEach((e, i) => {
        const div = document.createElement('div');
        div.classList.add('week-day', 'item');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'week-radio';
        radio.id = 'day-' + i;
        radio.value = radio.id;
        const label = document.createElement('label');
        label.setAttribute('for', radio.id);

        label.innerHTML = `<i class="fa-regular fa-calendar-days"></i> ${new Date(e.datetime).toLocaleDateString()}`;

        div.append(radio, label);
        const contendDiv = document.createElement('div');
        contendDiv.classList.add('content', 'hidden')
        contendDiv.append(createNode(e, daysObject));


        // console.log(data);
        const forecast = document.createElement('div');
        forecast.classList.add('forecast', 'hidden');
        const { hours } = e;

        hours.forEach(hour => {
            const div = document.createElement('div');
            div.classList.add('forecast-item');
            const ico = hour.icon;
            const img = document.createElement('img');
            img.src = `./assets/icons/${ico}.svg`;
            div.append(img, createNode(hour, hoursObject(i)));
            // if (v.currentConditions.datetime.slice(0, 2) == i) {
            //     div.classList.add('now');
            // }
            forecast.append(div);
        })
        // })

        div.append(contendDiv, forecast);

        document.querySelector('.week').append(div);
        div.classList.add(radio.id)
        // const { description } = e;
        // const data = fetcher(`https://api.mymemory.translated.net/get?q=${description}&langpair=en|ru`, (result) => result.responseData.translatedText);
        // document.querySelector('.radio.id').insertAdjacentHTML('afterbegin', `<h2>${data}</h2>`);
    })

    const weather = document.querySelector('.weatherapp');
    if (weather.classList.contains('hidden'))
        weather.classList.remove('hidden');

    setMap([latitude, longitude]);

    document.querySelector('.week').insertAdjacentHTML('afterbegin', '<h2>Погода на неделю</h2>');

    document.querySelectorAll('input[type=radio').forEach(e => e.addEventListener('change', showDayInformation));
    document.querySelectorAll('input[type=radio').forEach(e => e.addEventListener('click', function () {
        const div = document.querySelector(`.${this.value}`)
        // console.log(this.checked, div.children[2].classList.contains('hidden'), div.children[3].classList.contains('hidden'))
        if (this.checked && !div.children[2].classList.contains('hidden') && !div.children[3].classList.contains('hidden')) {
            this.checked = false;
            div.children[2].classList.add('hidden');
            div.children[3].classList.add('hidden');
            // console.log('opopop');
        }
    }));
    // document.querySelector('.now').scrollIntoView({ behavior: "smooth", inline: 'center' });

    document.querySelector('#search-btn').removeAttribute('disabled');
    document.querySelector('.inptext').removeAttribute('disabled');
}

function clear(arr) {
    arr.forEach(e => {
        document.querySelector(e).innerHTML = '';
    })
}

function success(position) {
    const { latitude, longitude } = position.coords;
    let geoCodeURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=59000a9bcd862ca84a9068e14b8820b7`;
    fetcher(geoCodeURL, (response) => {
        document.querySelector('.inptext').value = response[0].local_names.ru;
        const city = document.querySelector('.inptext').value.trim();
        const { fromDate, toDate } = getCurrentDate();
        let uri = URL + city + "/" + fromDate + "/" + toDate + URLOPTIONS;
        fetcher(uri, allinone);
    });

}

function error() {
    console.log('Не удалось получить доступ к геоданным...');
}

function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
}

function showDayInformation() {
    const days = document.querySelectorAll('.week-day');
    days.forEach(e => {
        if (e.children[0].checked) {
            e.children[2].classList.remove('hidden');
            e.children[3].classList.remove('hidden');
        }
        else {
            e.children[2].classList.add('hidden');
            e.children[3].classList.add('hidden');
        }
    })
}

function getCurrentDate() {
    const currentDate = new Date();
    const fromDate = currentDate.toISOString().slice(0, 10);
    const toDate = new Date(currentDate.setDate(currentDate.getDate() + 6)).toISOString().slice(0, 10);
    return { fromDate, toDate };
}