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

//GET - flights
export async function getFlight(request, response) {
    const { origin } = request.query;
    const { destination } = request.query;
    const smallerDate = request.query['smaller-date'];
    const biggerDate = request.query['bigger-date'];
    console.log(biggerDate)

    if ((!biggerDate && smallerDate) || (biggerDate && !smallerDate)) {
        return response.sendStatus(422);
    }

    if (smallerDate > biggerDate) {
        return response.status(400).send('The date smaller-date cannot be larger than the date bigger-date.');
    }

    try {
        if (!origin && !destination && !smallerDate && !biggerDate) {
            const allFlights = await db.query(`
            SELECT
                travels.id,
                origin.name AS origin,
                destination.name AS destination,
                flights.date AS date
            FROM travels
            JOIN
                flights ON travels."flightId" = flights.id
            JOIN
                cities origin ON flights."origin" = origin.id
            JOIN
                cities destination ON flights."destination" = destination.id
            ORDER BY flights.date;
        `);

            return response.status(200).send(allFlights.rows);
        }

        const allFlightsQuery = await db.query(`
        SELECT
          travels.id,
          origin.name AS origin,
          destination.name AS destination,
          flights.date AS date
        FROM travels
        JOIN
          flights ON travels."flightId" = flights.id
        JOIN
          cities origin ON flights."origin" = origin.id
        JOIN
          cities destination ON flights."destination" = destination.id
        WHERE (origin.name = $1 OR $1 IS NULL)
        AND
        (destination.name = $2 OR $2 IS NULL)
        AND
        (flights.date >= $3 OR $3 IS NULL )
        AND 
        (flights.date <= $4 OR $4 IS NULL)
        ORDER BY
        flights.date;
      `, [origin, destination, smallerDate, biggerDate]);


        return response.status(200).send(allFlightsQuery.rows)
    } catch (err) {
        return response.status(500).send(err.message);
    }
}
