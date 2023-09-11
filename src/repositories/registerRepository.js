import { db } from "../database/database.connection.js";

export async function registerUser(firstName, lastName) {
    return db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2);`, [firstName, lastName]);
}
export async function findingCityName(name) {
    return db.query(`SELECT * FROM cities WHERE name=$1;`, [name]);
}

export async function registerCity(name){
    return db.query(`INSERT INTO cities (name) VALUES ($1);`, [name])
}