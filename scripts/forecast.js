import createNode from "./dom/createnode.js";
import forecastObject from "./forecastobject.js";

export default function forecast(o) {
    const forecastdiv = document.querySelector('.forecast');
    // let divs = o.list.map(e => {
    //     const div = document.createElement('div');

    //     const date = document.createElement('p');
    //     const datei = document.createElement('i');

    //     const time = document.createElement('p');
    //     const timei = document.createElement('i');

    //     const temp = document.createElement('p');
    //     const tempi = document.createElement('i');

    //     div.classList.add('forecast-item');
    //     // console.log(timeFormat(new Date(e.dt_txt)));
    //     const [dat, tim] = timeFormat(new Date(e.dt_txt));

    //     datei.classList.add('fa-regular', 'fa-calendar-days');
    //     date.append(datei);

    //     timei.classList.add('fa-regular', 'fa-clock');
    //     time.append(timei);

    //     tempi.classList.add('fa-solid', 'fa-temperature-low');
    //     temp.append(tempi);

    //     date.innerHTML += dat;
    //     time.innerHTML += tim;
    //     temp.innerHTML += Math.round(e.main.temp) + `°C`;
    //     div.append(date, time, temp);

    //     console.log(e.weather[0].main);

    //     return div;
    // })

    let divs = o.list.map(e=>{
        const div = document.createElement('div');
        div.classList.add('forecast-item');

        const ico = e.weather[0].icon;
        const img = document.createElement('img');
        // img.classList.add('forecast-img')
        img.src = `https://openweathermap.org/img/wn/${ico}.png`;

        div.append(img,createNode(e,forecastObject));
        return div
    })
    // console.log(divs);
    forecastdiv.append(...divs);
}
