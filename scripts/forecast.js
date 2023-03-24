import createNode from "./createul.js";

export default function forecast(o) {
    // const o = JSON.parse(result);
    const forecastdiv = document.querySelector('.forecast');
    o.list.forEach(e => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        // const time = new Date(e.dt_txt);
        // let hours = time.getHours();
        // hours = hours < 10 ? '0' + hours : hours;
        // let minutes = time.getMinutes();
        // minutes = minutes < 10 ? '0' + minutes : minutes;
        const i = document.createElement('i');
        // i.classList.add('fa-regular', 'fa-clock', 'fa-spin');
        i.classList.add('fa-regular', 'fa-clock');
        p.append(i);
        // p.innerHTML += ` ${hours}:${minutes}`;
        p.innerHTML += ` ${new Date(e.dt_txt).toLocaleTimeString().slice(0,-3)}`;

        div.append(p);
        div.append(createNode(e));
        forecastdiv.append(div);
    })
}
