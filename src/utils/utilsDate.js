
export function utilsDate(date) {
    const dateParts = date.split('-');

    if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const flightDate = new Date(year, month, day);
        return flightDate
    }
}