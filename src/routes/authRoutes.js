import authmiddleware from "../middleware/authMiddleware.js";
import {
    register,
    login,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} from "../controller/authController.js";
import express from 'express';

const router = express.Router();

// register route
router.post('/register', register);

// login route
router.post('/login', login);

// other routes
router.get('/users', authmiddleware, getAllUsers);
router.get('/users/:id', authmiddleware, getUser);
router.put('/users/:id', authmiddleware, updateUser);
router.delete('/users/:id', authmiddleware, deleteUser);

export default router;