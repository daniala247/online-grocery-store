const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = 'customer'; // Default role to 'customer'
        const newUser = new User({ username, password: hashedPassword, role: userRole });
        const user = await newUser.save();
        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
