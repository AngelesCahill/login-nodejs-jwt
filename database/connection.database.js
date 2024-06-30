import "dotenv/config";
import pg from "pg";

const { Pool } = pg;


const connectionString = process.env.DATABASE_URL;

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString,
});

try {
    db.query('SELECT NOW()');
    //solo para verificar que estamos conectados a DB
    console.log('DATABASE connected');
} catch (error) {
    console.log(error);
}