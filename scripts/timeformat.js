export default function timeFormat(date) {
    // const data = date;
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let day = date.getDay();
    let DD = date.getDate();
    let MM = date.getMonth();
    let hh = date.getHours();
    hh = hh < 10 ? '0' + hh : hh;
    let mm = date.getMinutes();
    mm = mm < 10 ? '0' + mm : mm;
    // console.log(`${days[day]}\n${DD} ${months[MM]}\n${hh}:${mm}`);
    return `${days[day]}\n${DD} ${months[MM]}\n${hh}:${mm}`;
}