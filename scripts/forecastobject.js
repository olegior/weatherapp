import timeFormat from './timeformat.js'

export default function forecastObject(o) {
    const [date, time] = timeFormat(new Date(o.dt_txt));
    return {
        'fa-calendar-days': date,
        'fa-clock': time,
        // 'fa-clouds': o.weather[0].main,
        'fa-temperature-full': Math.round(o.main.temp)+`°C`,
    }
}