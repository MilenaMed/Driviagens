import { findingCity, postFlight, getAllFlight, getSomeFlight } from "../repositories/flightRepository.js";

//POST-flights
export async function postRegisterFlight(request, response) {
    const { origin, destination, date } = request.body;
    const existingOriginCity = await findingCity(origin)
    const existingDestinationCity = await findingCity(destination)
    const currentDate = new Date();

    if (existingOriginCity.rowCount === 0 || existingDestinationCity.rowCount === 0) {
        return response.status(404).send("City ​​not found")
    }

    if (origin === destination) {
        return response.status(409).send("Origin and destination cannot be the same")
    }

    const dateParts = date.split('-');

    if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const flightDate = new Date(year, month, day);

        if (currentDate > flightDate) {
            return response.status(422).send("It's not possible to register flights for past dates.");
        }

        try {
            await postFlight(origin, destination, date);
            return response.status(201).send("Registred flight")
        } catch (err) {
            return response.status(500).send(err.message)
        }
    }
};

//GET - flights
export async function getFlight(request, response) {
    const { origin } = request.query;
    const { destination } = request.query;
    const smallerDate = request.query['smaller-date'];
    const biggerDate = request.query['bigger-date'];

    if ((!biggerDate && smallerDate) || (biggerDate && !smallerDate)) {
        return response.sendStatus(422);
    }

    if (smallerDate > biggerDate) {
        return response.status(400).send('The date smaller-date cannot be larger than the date bigger-date.');
    }

    try {
        if (!origin && !destination && !smallerDate && !biggerDate) {
            const allFlights = await getAllFlight();
            return response.status(200).send(allFlights.rows);
        }

        const allFlightsQuery = await getSomeFlight(origin, destination, smallerDate, biggerDate);
        return response.status(200).send(allFlightsQuery.rows)
    } catch (err) {
        return response.status(500).send(err.message);
    }
}
