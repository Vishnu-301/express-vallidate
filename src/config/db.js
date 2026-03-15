import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// conect to the database
const db = new pg.Pool({
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

// export the database connection
export default db;