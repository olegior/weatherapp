import errorMessage from "./errormessage.js";

export default function fetcher(URL, fn) {
    const requestOptions = {
        method: 'GET',
    };
    fetch(URL, requestOptions)
        .then(response => response.text())
        .then(result => fn(JSON.parse(result)))
        .catch(error => {
            errorMessage();
            console.log('error', error);
        })
}