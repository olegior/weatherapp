import CreateObject from "./createobject.js";

export default function createNode(o) {
    const toShow = CreateObject(o);
    const ico = o.weather[0].icon;
    const ul = document.createElement('ul');
    const img = document.querySelector('img');
    img.src = `https://openweathermap.org/img/wn/${ico}@2x.png`;
    
    Object.entries(toShow).forEach(e => {
        if (e[1] !== undefined) {
            const [key, value] = e;
            const li = document.createElement('li');
            const i = document.createElement('i');
            const span = document.createElement('span');
            i.classList.add('fa-solid', key);
            span.innerHTML = ` ${value}`;
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