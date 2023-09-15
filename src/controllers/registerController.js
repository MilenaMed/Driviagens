import { registerUser, registerCity } from "../repositories/registerRepository.js";
import httpStatus from "http-status";
import { registerServices } from "../services/registerServices.js";
//POST-passengers

export async function postRegisterUser(request, response) {
    const { firstName, lastName } = request.body;
    await registerUser(firstName, lastName);
    response.sendStatus(httpStatus.CREATED)
};

//POST-cities
export async function postRegisterCity(request, response) {
    const { name } = request.body;
    await registerServices.ifExistingCity(name)
    await registerCity(name);
    response.sendStatus(httpStatus.CREATED)
};
