const { Router } = require('express');
const router = Router();
const { User } = require('../db');  // Adjust path if needed

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create the user
        const user = new User({ name: username, email, password });
        await user.save();

        // Send success response
        res.json({ msg: 'User created successfully. Please login now.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route (you might also need to update this route to handle login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Send success response
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/addproduct', async (req, res) => {
    const { name, price, image, brand, expiry } = req.body;

    try {
        // Check if the product already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product already exists' });
        }

        // Create the product
        const product = new Product({ name, price, image, brand, expiry });
        await product.save();

        // Respond with success message
        res.status(201).json({ msg: 'Product added successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
