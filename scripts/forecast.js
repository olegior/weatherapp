import timeFormat from "./timeformat.js";
// import makeForecast from "./dom/makeforecast.js";

export default function forecast(o) {
    const forecastdiv = document.querySelector('.forecast');
    let divs = o.list.map(e => {
        const div = document.createElement('div');

        const date = document.createElement('p');
        const datei = document.createElement('i');

        const time = document.createElement('p');
        const timei = document.createElement('i');

        const temp = document.createElement('p');
        const tempi = document.createElement('i');

        div.classList.add('forecast-item');
        // console.log(timeFormat(new Date(e.dt_txt)));
        const [dat, tim] = timeFormat(new Date(e.dt_txt));

        datei.classList.add('fa-regular', 'fa-calendar-days');
        date.append(datei);

        timei.classList.add('fa-regular', 'fa-clock');
        time.append(timei);

        tempi.classList.add('fa-solid', 'fa-temperature-low');
        temp.append(tempi);

        date.innerHTML += dat;
        time.innerHTML += tim;
        temp.innerHTML += Math.round(e.main.temp) + `°C`;
        div.append(date, time, temp);
        return div;
    })
    // console.log(divs);
    forecastdiv.append(...divs);
}
