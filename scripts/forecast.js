import createNode from "./createul.js";
import timeFormat from "./timeformat.js";

export default function forecast(o) {
    const forecastdiv = document.querySelector('.forecast');
    o.list.forEach(e => {
        const div = document.createElement('div');
        const p = document.createElement('p');
       
        const i = document.createElement('i');
        // i.classList.add('fa-regular', 'fa-clock', 'fa-spin');
        i.classList.add('fa-regular', 'fa-clock');
        p.append(i);
        // p.innerHTML += ` ${new Date(e.dt_txt).toLocaleString().slice(0,-3)}`;
        p.innerHTML += ` ${timeFormat(new Date(e.dt_txt))}`;
        div.append(p);
        div.append(createNode(e));
        forecastdiv.append(div);
    })
}
