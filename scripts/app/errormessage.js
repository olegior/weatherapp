import changeVisibility from "./changevisibility.js";

export default function errorMessage() {
    changeVisibility(['.response','.error-message','.forecast','.week','.mapbox'])
}