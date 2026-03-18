import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import db from './config/db.js';
import User from './model/User.js';
import authroutes from './routes/authRoutes.js';
import createUsersTable from './data/data.js';
import handleErrors from './middleware/authMiddleware.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connect to routes
app.use('/api', authroutes);

app.get('/', async (req, res) => {
    const test = await db.query('SELECT * FROM users');
    console.log(test.rows);
    res.send('Welcome to the Express Form Validation API by vishnu');
});

// error handlers
app.use(handleErrors);

// create users table if it doesn't exist
db.query(createUsersTable);

// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});