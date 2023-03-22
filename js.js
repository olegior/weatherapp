const URL = 'https://api.openweathermap.org';
const API = '59000a9bcd862ca84a9068e14b8820b7';

document.querySelector('.inptext').addEventListener('change',()=>start())

function start() {
    const city = document.querySelector('.inptext').value;
    let req = `${URL}/geo/1.0/direct?q=${city}&appid=${API}`;
    fetcher(req, getLocation, API)
}

function getLocation(result) {
    const { lat, lon } = JSON.parse(result)[0];
    console.log(lat, lon);
    let req = `${URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&units=metric`;
    fetcher(req, create)
    let url = `${URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}&lang=ru&cnt=5&units=metric`;
    fetcher(url, forecast)
}

function fetcher(URL, fn) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => fn(result))
        .catch(error => console.log('error', error));
}

function create(result) {
    const o = JSON.parse(result);
    document.querySelector('.ul').append(createNode(
o))
}

function forecast(result) {
    const o = JSON.parse(result);
    const forecastdiv = document.querySelector('.forecast');
    o.list.forEach(e => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = e.dt_txt;
        div.append(p);
        div.append(createNode(
    e));
        forecastdiv.append(div);
    })
}

function createNode(o) {
    const toShow = {
        'fa-city': o.name,
        'fa-cloud': o.weather[0].description,
        'fa-temperature-low': o.main.temp,
        // 'fa-temperature-half': o.main.feels_like,
        'fa-wind': o.wind.speed,
    }
    const ico = o.weather[0].icon;
    const img = document.querySelector('img');
    // img.src = `https://openweathermap.org/img/wn/${ico}@2x.png`;
    img.src = `${URL}/img/wn/${ico}.png`;
    // const ul = document.querySelector('.response-ul');
    const ul = document.createElement('ul');
    ul.innerHTML = ''
    Object.entries(toShow).forEach(e => {
        if (e[1] !== undefined) {
            const [key, value] = e;
            const li = document.createElement('li');
            const i = document.createElement('i');
            const span = document.createElement('span');
            i.classList.add('fa-solid', key);
            span.innerHTML = ` ${value}`;
            li.append(i, span);
            ul.append(li);
        }
        else {
            console.log(e);
        }
    });
    return ul;
}



