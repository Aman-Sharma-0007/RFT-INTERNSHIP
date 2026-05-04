const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
try{
    const { username, password, email } = req.body;

   const emailRegex = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email! Please enter a valid email address.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email: email });
    await newUser.save();
    res.status(201).json({ message: 'Registered successfully!' });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(e => e.message).join(', ');
            return res.status(400).json({ message });
        }
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required!' });
    }
    const emailRegex = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email! Please enter a valid email address.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Login successful!', token: token });
});

//Profile
router.get('/profile', protect, (req, res) => {
    res.json({
        message: 'Welcome User ' + req.user.username + ' to your profile!',
        user: req.user
    });
});

module.exports = router;