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
//GET - travels
export async function getTravels(request, response) {
    const { name } = request.query;

    try {
        if (!name) {
            const allTravels = await db.query(`
        SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
        COUNT(travels.id) AS travels
        FROM passengers
        LEFT JOIN travels ON passengers.id = travels."passengerId"
        GROUP BY 
        passengers.id, "firstName", "lastName"
        ORDER BY COUNT(travels.id) DESC;
         `);
            return response.status(200).send(allTravels.rows);
        }

        const travelsQueryName = await db.query(`
        SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
        COUNT(travels.id) AS travels
        FROM passengers
        LEFT JOIN travels ON passengers.id = travels."passengerId"
        WHERE "firstName" ILIKE $1 OR "lastName" ILIKE $1
        GROUP BY passengers.id, "firstName", "lastName"
        ORDER BY COUNT(travels.id) DESC;
        `, [`%${name}%`]);

        if (travelsQueryName.rows.length > 10) {
            return response.status(500).send('Too many results');
        }
        
        return response.status(200).send(travelsQueryName.rows);

    } catch (err) {
        return response.status(500).send(err.message)
    }
};

