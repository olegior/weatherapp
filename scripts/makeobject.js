export default function makeObject(o) {
    return {
        'fa-city': o.name,
        'fa-cloud': o.weather[0].description,
        'fa-temperature-full': Math.round(o.main.temp)+`°C`,
        'fa-temperature-quarter': Math.round(o.main.feels_like)+`°C`,
        // 'fa-temperature-low': o.main.temp_min,
        // 'fa-temperature-high': o.main.temp_max,
        // 'fa-wind': o.wind.speed,
        // 'fa-sun' : new Date(o.sys.sunrise).toLocaleTimeString(),
        'fa-dumbbell' : o.main.pressure+` мм`,
        'fa-droplet' : o.main.humidity+` %`,
        'fa-wind' : o.wind.speed+` м/с`,
    }
}