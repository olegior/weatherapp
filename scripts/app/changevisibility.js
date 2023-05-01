export default function changeVisibility(nodes) {
    try {
        nodes.forEach(element => {
            const node = document.querySelector(element).classList;
            node.contains('hidden') ? node.remove('hidden') : node.add('hidden');
        });
    }
    finally {
        document.querySelector('#search-btn').removeAttribute('disabled');
        document.querySelector('.inptext').removeAttribute('disabled');
    }
}