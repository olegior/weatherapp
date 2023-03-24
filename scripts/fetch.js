export default function fetcher(URL, func) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => func(JSON.parse(result)))
        .catch(error => console.log('error', error));
}