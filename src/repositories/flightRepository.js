import { db } from "../database/database.connection.js";

export async function findingCity(destination) {
    return db.query(`SELECT * FROM cities WHERE id=$1;`, [destination]);
}

export async function postFlight(origin, destination, date) {
    return db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);`, [origin, destination, date])

}
export async function getAllFlight() {
    return db.query(`
    SELECT flights.id, origin.name AS origin,
    destination.name AS destination,
    flights.date AS date
    FROM flights
    JOIN cities origin ON flights."origin" = origin.id
    JOIN cities destination ON flights."destination" = destination.id
    ORDER BY flights.date;
`)
}

export async function getSomeFlight(origin, destination, smallerDate, biggerDate) {
    return db.query(`
        SELECT
        flights.id,
          origin.name AS origin,
          destination.name AS destination,
          flights.date AS date
        FROM flights
        JOIN cities origin ON flights."origin" = origin.id
        JOIN cities destination ON flights."destination" = destination.id
        WHERE (origin.name = $1 OR $1 IS NULL)
        AND
        (destination.name = $2 OR $2 IS NULL)
        AND
        (flights.date >= $3 OR $3 IS NULL )
        AND 
        (flights.date <= $4 OR $4 IS NULL)
        ORDER BY
        flights.date;
      `, [origin, destination, smallerDate, biggerDate])
}