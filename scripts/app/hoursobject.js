// import timeFormat from './timeformat.js'

export default function hoursObject(i) {
    return function(o){
        return {
            'fa-calendar-days': o.days[0].datetime.slice(5).replace('-', '.'),
            'fa-clock': o.days[0].hours[i].datetime.slice(0, 5),
            // 'fa-clouds': o.weather[0].main,
            'fa-temperature-full': Math.round(o.days[0].hours[i].temp) + `°C`,
        }
    }
}