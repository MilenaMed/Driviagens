import { findByName } from "../repositories/registerRepository.js"
import { errors } from "../erros/errors.js";

async function ifExistingCity(name) {
    const existingCity = await findByName(name);
    if (existingCity.rowCount !== 0) throw errors.conflict()

}

export const registerServices = { ifExistingCity }