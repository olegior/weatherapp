export default function createNode(o) {
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
    img.src = `https://openweathermap.org/img/wn/${ico}@2x.png`;
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