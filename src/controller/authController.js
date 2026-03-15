import user from '../model/User.js';
import bcrypt from 'bcrypt';

// controller for user registration
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check if user already exists
        const existingUser = await user.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await user.create(username, email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// controller for user login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user by email
        const existingUser = await user.findByEmail(email);
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user: existingUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};