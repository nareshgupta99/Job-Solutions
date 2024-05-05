// const moment = require('moment');

function formatDateOnly(dateTime) {
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Month is zero-indexed (0 for January)
    const day = dateTime.getDate();

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

// function calculateDaysBetweenDates(startDate) {
//     // Convert both dates to milliseconds
//     const startMoment = moment(new Date(startDate))
//     let endDate = new Date()
//     const endMoment = moment(endDate);

//     // Calculate the difference in milliseconds
//     const durationInHours = endMoment.diff(startMoment, 'hours');

//     const durationInDays = endMoment.diff(startMoment, 'days');
//     const durationInMonths = endMoment.diff(startMoment, 'months');


//     return { hours: durationInHours, days: durationInDays, months: durationInMonths };
// }



export { formatDateOnly }