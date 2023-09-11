import { db } from "../database/database.connection.js";

export async function findingPassenger(passengerId) {
    return db.query(`SELECT * FROM passengers WHERE id=$1;`, [passengerId]);
}
export async function findingFlight(flightId) {
    return db.query(`SELECT * FROM flights WHERE id=$1;`, [flightId]);
}

export async function addTravel(passengerId, flightId) {
    return db.query(`INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2);`, [passengerId, flightId]);
}

export async function getAllTravels() {
    return db.query(`
        SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
        COUNT(travels.id) AS travels
        FROM passengers
        LEFT JOIN travels ON passengers.id = travels."passengerId"
        GROUP BY 
        passengers.id, "firstName", "lastName"
        ORDER BY COUNT(travels.id) DESC;
`)
}

export async function getSomeTravels(name) {
    return db.query(`
    SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
    COUNT(travels.id) AS travels
    FROM passengers
    LEFT JOIN travels ON passengers.id = travels."passengerId"
    WHERE "firstName" ILIKE $1 OR "lastName" ILIKE $1
    GROUP BY passengers.id, "firstName", "lastName"
    ORDER BY COUNT(travels.id) DESC;
    `, [`%${name}%`])
}