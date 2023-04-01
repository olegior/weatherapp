export default function changeVisibility(nodes) {
    nodes.forEach(element => {
        const node = document.querySelector(element).classList;
        node.contains('hidden') ? node.remove('hidden') : node.add('hidden');
    });
}