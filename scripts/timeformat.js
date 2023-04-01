export default function timeFormat(date) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let day = date.getDay();

    let DD = date.getDate();
    let MM = date.getMonth()+1;
    let hh = date.getHours();
    let mm = date.getMinutes();

    DD = DD < 10 ? '0' + DD : DD;
    MM = MM < 10 ? '0' + MM : MM;
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;

    return [`${DD}.${MM}` ,`${hh}:${mm}`];
}