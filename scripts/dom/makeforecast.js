export default function makeForecast(o) {
    const toShow = makeObjectForecast(o);
    // const ico = o.weather[0].icon;
    const ul = document.createElement('ul');
    // const img = document.querySelector('img');
    // img.src = `https://openweathermap.org/img/wn/${ico}@2x.png`;
    
    Object.entries(toShow).forEach(e => {
        if (e[1] !== undefined) {
            const [key, value] = e;
            const li = document.createElement('li');
            const i = document.createElement('i');
            const span = document.createElement('span');
            i.classList.add('fa-solid', key);
            span.innerText = ` ${value}`;
            // if (key.includes('temperature'))
            //     span.innerHTML += ` °C`;
            li.append(i, span);
            ul.append(li);
        }
        // else {
        //     console.log(e);
        // }
    });
    return ul;
}

function makeObjectForecast(o){
    return {
        // 'fa-city': o.name,
        // 'fa-cloud': o.weather[0].description,
        'fa-temperature-full': Math.round(o.main.temp)+`°C`,
        // 'fa-temperature-quarter': Math.round(o.main.feels_like)+`°C`,
        // 'fa-temperature-low': o.main.temp_min,
        // 'fa-temperature-high': o.main.temp_max,
        // 'fa-wind': o.wind.speed,
        // 'fa-sun' : new Date(o.sys.sunrise).toLocaleTimeString(),
        // 'fa-dumbbell' : o.main.pressure+` мм`,
        // 'fa-droplet' : o.main.humidity+` %`,
        // 'fa-wind' : o.wind.speed+` м/с`,
    }
}