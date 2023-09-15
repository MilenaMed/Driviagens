import { errors } from "../erros/errors.js";
import { findingCity } from "../repositories/flightRepository.js";
import { utilsDate } from "../utils/utilsDate.js";

async function ifExistingOriginCity(origin) {
    const existingOriginCity = await findingCity(origin);
    if (existingOriginCity.rowCount === 0) throw errors.notFoundCities();
}

async function ifExistingDestinationCity(destination) {
    const existingDestinationCity = await findingCity(destination);
    if (existingDestinationCity.rowCount === 0) throw errors.notFoundCities();
}


function ifAreSameCities(origin, destination) {
    if (origin === destination) throw errors.sameCities();
}

async function validateDate(date) {
    const flightDate = utilsDate(date);
    const currentDate = new Date();

    if (currentDate > flightDate) throw errors.invalidDate();
}

function haveDate(biggerDate, smallerDate) {
    if ((!biggerDate && smallerDate) || (biggerDate && !smallerDate)) throw errors.wrongData();
}
function comparateDate(biggerDate, smallerDate) {
    const biggerDateFormat = utilsDate(biggerDate)
    const smallerDateFormat = utilsDate(smallerDate)

    if (smallerDateFormat > biggerDateFormat) throw errors.errorSmallerBiggerDate()
}


export const flightServices = {comparateDate, ifExistingOriginCity, haveDate, ifExistingDestinationCity, ifAreSameCities, validateDate }