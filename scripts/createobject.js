export default function CreateObject(o) {
    return {
        'fa-city': o.name,
        'fa-cloud': o.weather[0].description,
        'fa-temperature-low': Math.round(o.main.temp),
        // 'fa-temperature-half': o.main.feels_like,
        // 'fa-wind': o.wind.speed,
    }
}