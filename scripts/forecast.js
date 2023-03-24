import createNode from "./dom.js";

export default function forecast(result) {
    const o = JSON.parse(result);
    const forecastdiv = document.querySelector('.forecast');
    o.list.forEach(e => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        // console.log(new Date(e.dt_txt).toLocaleTimeString());
        p.innerHTML = new Date(e.dt_txt).toLocaleTimeString();
        
        div.append(p);
        div.append(createNode(e));
        forecastdiv.append(div);
    })
}
