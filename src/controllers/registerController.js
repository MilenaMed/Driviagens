import { db } from "../database/database.connection.js";

//POST-passengers

export async function postRegisterUser(request, response) {
    const { firstName, lastName } = request.body;
    try {
        await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2);`, [firstName, lastName]);
        return response.status(201).send("Registred user")
    } catch (err) {
        return response.status(500).send(err.message)
    }
};

//POST-cities
export async function postRegisterCity(request, response) {
    const {name} = request.body;
    const existingCity = await db.query(`SELECT * FROM cities WHERE name=$1;`, [name])

    if (existingCity.rowCount !== 0) {
        return response.status(409).send("it's not possible to register this city, city already registered")
    }

    try {
        await db.query(`INSERT INTO cities (name) VALUES ($1);`, [name]);
        return response.status(201).send("Registred city")
    } catch (err) {
        return response.status(500).send(err.message)
    }
};
