import { db } from "../database/database.connection.js";

//POST - travels
export async function postTravels(request, response) {
    const { passengerId, flightId } = request.body;
    const existingPassengerId = await db.query(`SELECT * FROM passengers WHERE id=$1;`, [passengerId])
    const existingFlightId = await db.query(`SELECT * FROM flights WHERE id=$1;`, [flightId])

    if (existingFlightId.rowCount === 0 || existingPassengerId.rowCount === 0) {
        return response.sendStatus(404)
    }

    try {
        await db.query(`INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2);`, [passengerId, flightId]);
        return response.status(201).send("Registred travel")
    } catch (err) {
        return response.status(500).send(err.message)
    }
};

