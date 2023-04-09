import errorMessage from "./errormessage.js";

export default async function fetcher(URL, fn) {
    // const requestOptions = {
    //     method: 'GET',
    // };
    // fetch(URL, requestOptions)
    // .then(response => response.text())
    // .then(result => fn(JSON.parse(result)))
    // .catch(error => {
    //     errorMessage();
    //     console.log('error', error);
    // })
    const response = await fetch(URL);
    if (!response.ok){
        errorMessage();
        throw new Error(response.statusText);
    }
    const result = await response.json();
    fn(result);
}