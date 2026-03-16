import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;
dotenv.config();


// conect to the database
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// on database connection
db.on('connect', () => {
    console.log('Connected to the database');
});

// check for database connection errors
db.on('error', (err) => {
    console.error('Database connection error', err.stack);
});

// export the database connection
export default db;