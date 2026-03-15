import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import db from './config/db.js';
import User from './model/User.js';
import authroutes from './routes/authRoutes.js';
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// connect to routes
app.use('/api', authroutes);

// error handlers

// Database connection
db.connect();

// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});