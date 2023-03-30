export default function fetcher(URL, fn) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => fn(JSON.parse(result)))
        .catch(error => console.log('error', error));
}