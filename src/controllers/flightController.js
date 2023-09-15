import { postFlight, getAllFlight, getSomeFlight } from "../repositories/flightRepository.js";
import { flightServices } from "../services/flightServices.js";
import httpStatus from "http-status";

//POST-flights
export async function postRegisterFlight(request, response) {
    const { origin, destination, date } = request.body;

    await flightServices.ifExistingOriginCity(origin)
    await flightServices.ifExistingDestinationCity(destination)
    await flightServices.ifAreSameCities(origin, destination)
    await flightServices.validateDate(date)

    await postFlight(origin, destination, date);
    response.sendStatus(httpStatus.CREATED)

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
