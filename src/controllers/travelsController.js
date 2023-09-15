import { addTravel, findingFlight, findingPassenger, getAllTravels, getSomeTravels } from "../repositories/travelsRepository.js";
import httpStatus from "http-status";
import { travelsServices } from "../services/travelsServices.js";
//POST - travels
export async function postTravels(request, response) {
    const { passengerId, flightId } = request.body;
   // const existingPassengerId = await findingPassenger(passengerId)
    //const existingFlightId = await findingFlight(flightId)
    travelsServices.ifExistingIds(passengerId,flightId)
    

    try {
        await addTravel(passengerId, flightId);
        return response.sendStatus(httpStatus.CREATED)
    } catch (error) {
        return response.status(500).send(error.message)
    }
};
//GET - travels
export async function getTravels(request, response) {
    const { name } = request.query;

    try {
        if (!name) {
            const allTravels = await getAllTravels();
            return response.status(200).send(allTravels.rows);
        }

        const travelsQueryName = await getSomeTravels(name);

        if (travelsQueryName.rows.length > 10) {
            return response.status(500).send('Too many results');
        }
        
        return response.status(200).send(travelsQueryName.rows);

    } catch (err) {
        return response.status(500).send(err.message)
    }
};

