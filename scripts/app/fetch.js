import errorMessage from "./errormessage.js";

export default async function fetcher(URL, fn) {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            errorMessage();
            throw new Error(response.statusText);
        }
        const result = await response.json();
        fn(result);
    }
    catch (err) {
        console.log(err);
    }
}