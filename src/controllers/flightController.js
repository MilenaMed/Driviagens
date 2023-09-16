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

    if (!origin && !destination && !smallerDate && !biggerDate) {
        const allFlights = await getAllFlight();
        return response.status(200).send(allFlights.rows);
    }
   // await flightServices.haveDate(biggerDate, smallerDate)
    //await flightServices.comparateDate(biggerDate, smallerDate)

    const allFlightsQuery = await getSomeFlight(origin, destination, smallerDate, biggerDate);
    console.log(getSomeFlight)
    return response.status(200).send(allFlightsQuery.rows)
}
