export default function timeFormat(date) {
    // const data = date;
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let day = date.getDay();
    let DD = date.getDate();
    DD = DD < 10 ? '0' + DD : DD;
    let MM = date.getMonth()+1;
    MM = MM < 10 ? '0' + MM : MM;
    let hh = date.getHours();
    hh = hh < 10 ? '0' + hh : hh;
    let mm = date.getMinutes();
    mm = mm < 10 ? '0' + mm : mm;

    // console.log(`${days[day]}\n${DD} ${months[MM]}\n${hh}:${mm}`);
    // return `${days[day]}\n${DD} ${months[MM]}\n${hh}:${mm}`;
    // return [`${days[day]}`, `${DD} ${months[MM]}`, `${hh}:${mm}`];
    return [`${DD}.${MM}` ,`${hh}:${mm}`];
}