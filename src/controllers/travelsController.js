import { addTravel, getAllTravels, getSomeTravels } from "../repositories/travelsRepository.js";
import httpStatus from "http-status";
import { travelsServices } from "../services/travelsServices.js";

//POST - travels
export async function postTravels(request, response) {
    const { passengerId, flightId } = request.body;
    await travelsServices.ifExistingIds(passengerId, flightId)
    await addTravel(passengerId, flightId);
    return response.sendStatus(httpStatus.CREATED)
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

