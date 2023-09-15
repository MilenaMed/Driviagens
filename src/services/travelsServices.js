import { findingFlight, findingPassenger } from "../repositories/travelsRepository.js"
import { errors } from "../erros/errors.js";

async function ifExistingIds(passengerId,flightId) {
    const existingPassengerId = await findingPassenger(passengerId)
    const existingFlightId = await findingFlight(flightId)
     if (existingFlightId.rowCount === 0 || existingPassengerId.rowCount === 0) throw errors.notFountData();
}
async function manyTravels(travelsQueryName) {
    if (travelsQueryName.rows.length > 10) throw errors.tooMany()
}

export const travelsServices = { ifExistingIds,  manyTravels}