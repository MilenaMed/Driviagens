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
    const { name } = request.query
    const travelsQueryName = await getSomeTravels(name);
    const allTravels = await getAllTravels();

    if (!name) {
        await travelsServices.manyTravels(allTravels);
        return response.status(200).send(allTravels.rows);
    }
    await travelsServices.manyTravels(travelsQueryName);

    return response.status(200).send(travelsQueryName.rows);

};

