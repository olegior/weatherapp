export default function currentObject(o) {
    return {
        // 'fa-city': o.address,
        'fa-city': o.resolvedAddress,
        'fa-clock': o.currentConditions.datetime,
        'fa-cloud': o.currentConditions.conditions,
        'fa-temperature-full': Math.round(o.currentConditions.temp)+`°C`,
        'fa-temperature-quarter': Math.round(o.currentConditions.feelslike)+`°C`,
        'fa-dumbbell' : o.currentConditions.pressure+` мм`,
        'fa-droplet' : o.currentConditions.humidity+` %`,
        'fa-wind' : o.currentConditions.windspeed+` м/с`,
        'fa-wind' : o.currentConditions.windspeed+` м/с`,
        'fa-wind' : o.currentConditions.windspeed+` м/с`,
        'fa-sun' : o.currentConditions.sunrise,
        'fa-cloud-sun' : o.currentConditions.sunset,
    }
}