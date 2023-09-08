import { db } from "../database/database.connection.js";

//POST-flights
export async function postRegisterFlight(request, response) {
    const { origin, destination, date } = request.body;
    const existingOriginCity = await db.query(`SELECT * FROM cities WHERE id=$1;`, [origin])
    const existingDestinationCity = await db.query(`SELECT * FROM cities WHERE id=$1;`, [destination])
    const currentDate = new Date();

    if (existingOriginCity.rowCount === 0 || existingDestinationCity.rowCount === 0) {
        return response.status(404).send("City ​​not found")
    }

    if (origin === destination) {
        return response.status(409).send("Origin and destination cannot be the same")
    }

    const dateParts = date.split('-');

    if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const flightDate = new Date(year, month, day);

        if (currentDate > flightDate) {
            return response.status(422).send("It's not possible to register flights for past dates.");
        }

        try {
            await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);`, [origin, destination, date]);
            return response.status(201).send("Registred flight")
        } catch (err) {
            return response.status(500).send(err.message)
        }                                                                
    }
};