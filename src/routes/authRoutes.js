import authmiddleware from "../middleware/authMiddleware.js";
import { register, login } from "../controller/authController.js";
import express from 'express';

const router = express.Router();

// register route
router.post('/register', register);

// login route
router.post('/login', login);

// other

router.get('/user/:username', authmiddleware, (req, res) => {
    const username = req.params['username'];
    res.status(200).json({ message: `Hello, ${username}! You have accessed a protected route` });
});

router.get('/allusers', authmiddleware, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/user/:id', authmiddleware, async (req, res) => {
    const id = req.params['id'];
    try {
        const user = await User.findById(id);   
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
});

router.delete('/user/:id', authmiddleware, async (req, res) => {
    const id = req.params['id'];
    try {
        const user = await User.findById(id);   
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.deleteById(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;