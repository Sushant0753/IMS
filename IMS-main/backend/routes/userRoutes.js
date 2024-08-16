const { Router } = require('express');
const router = Router();
const { User } = require('../db');
const userMiddleware = require('../middelware/userMiddelware');

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = new User({ name: username, email, password });
        await user.save();

        res.json({ msg: 'User created successfully. Please login now.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post('/login', userMiddleware, async (req, res) => {
    res.json({ message: 'Login successful' });
});

module.exports = router;
