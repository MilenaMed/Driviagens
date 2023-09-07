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