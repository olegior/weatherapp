import timeFormat from "./timeformat.js";
// import makeForecast from "./dom/makeforecast.js";

export default function forecast(o) {
    const forecastdiv = document.querySelector('.forecast');
    o.list.forEach(e => {
        const div = document.createElement('div');
        const time = document.createElement('p');
        const temp = document.createElement('p');
        const timei = document.createElement('i');
        const tempi = document.createElement('i');
        // i.classList.add('fa-regular', 'fa-clock', 'fa-spin');
        div.classList.add('forecast-item');
        timei.classList.add('fa-regular', 'fa-clock');
        time.append(timei);

        tempi.classList.add('fa-solid', 'fa-temperature-low');
        temp.append(tempi);
        // p.innerHTML += ` ${new Date(e.dt_txt).toLocaleString().slice(0,-3)}`;
        time.innerHTML += ` ${timeFormat(new Date(e.dt_txt))}`;
        temp.innerHTML += Math.round(e.main.temp)+`°C`;
        div.append(time, temp);
        // div.append(makeForecast(e));
        forecastdiv.appendChild(div);
    })
}
