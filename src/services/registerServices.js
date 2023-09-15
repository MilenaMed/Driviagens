import { findByName } from "../repositories/registerRepository.js"
import { errors } from "../erros/errors.js";

async function ifExistingCity(name) {
       const existingCity = await findByName(name);
       //console.log(existingCity.rowCount)
        if (existingCity.rowCount !== 0) console.log(errors.conflict()) //throw console.log("deu erro")
    
}

export const registerServices = { ifExistingCity }