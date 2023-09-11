import { findingCityName, registerCity, registerUser } from "../repositories/registerRepository.js";

//POST-passengers

export async function postRegisterUser(request, response) {
    const { firstName, lastName } = request.body;
    try {
        await registerUser(firstName, lastName);
        return response.status(201).send("Registred user")
    } catch (err) {
        return response.status(500).send(err.message)
    }
};

//POST-cities
export async function postRegisterCity(request, response) {
    const {name} = request.body;
    const existingCity = await findingCityName(name)

    if (existingCity.rowCount !== 0) {
        return response.status(409).send("it's not possible to register this city, city already registered")
    }

    try {
        await registerCity(name);
        return response.status(201).send("Registred city")
    } catch (err) {
        return response.status(500).send(err.message)
    }
};
