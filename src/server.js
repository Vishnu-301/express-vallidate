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
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// connect to routes
app.use('/api', authroutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express Form Validation API');
});

// error handlers
app.use(handleErrors);

// Database connection
db.connect();

// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});