export default function daysObject(o) {
    // console.log('days');
    return {
        'fa-cloud': o.conditions,
        // 'fa-clock': o.datetime,
        'fa-city': o.description,
        'fa-temperature-full': Math.round(o.temp)+`°C`,
        'fa-temperature-quarter': Math.round(o.feelslike)+`°C`,
        'fa-dumbbell' : o.pressure+` мм`,
        'fa-droplet' : o.humidity+` %`,
        'fa-wind' : o.windspeed+` м/с`,
    }
}