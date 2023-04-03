export default function createNode(o,fn) {
    const ul = document.createElement('ul');

    Object.entries(fn(o)).forEach(e => {
        if (e[1] !== undefined) {
            const [key, value] = e;
            const li = document.createElement('li');
            const i = document.createElement('i');
            const span = document.createElement('span');
            i.classList.add('fa-solid', key);
            span.innerHTML = ` ${value}`;
            li.append(i, span);
            ul.appendChild(li);
        }
        else {
            console.log('пропущено поле', e);
        }
    });
    return ul;
}