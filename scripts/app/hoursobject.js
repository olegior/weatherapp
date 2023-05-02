export default function hoursObject() {
    return function(o){
        return {
            'fa-clock': o.datetime.slice(0, 5),
            'fa-temperature-full': Math.round(o.temp) + `°C`,
            'fa-temperature-quarter': Math.round(o.feelslike)+`°C`,
        }
    }
}