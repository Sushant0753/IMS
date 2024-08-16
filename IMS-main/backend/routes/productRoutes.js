// productRoutes.js
const { Router } = require('express');
const router = Router();
const { Product } = require('../db');

// Route for getting all products
router.get('/all-products', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: err.message });
    }
});

// Route for adding a product
router.post('/add-product', async (req, res) => {
    const { name, price, image, brand, expiry, quantity } = req.body;
    console.log('Received product data:', { name, price, image, brand, expiry, quantity });

    try {
        // Use findOneAndUpdate with upsert option
        const result = await Product.findOneAndUpdate(
            { name: name },
            { $setOnInsert: { price, image, brand, expiry, quantity } },
            { upsert: true, new: true, runValidators: true }
        );

        if (!result.createdAt) {
            console.log('Product already exists:', name);
            return res.status(400).json({ error: 'Product already exists' });
        }

        console.log('Product saved successfully:', result);
        res.status(201).json({ msg: 'Product added successfully!', product: result });
    } catch (err) {
        console.error('Error adding product:', err);
        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ error: validationErrors.join(', ') });
        }
        res.status(500).json({ error: err.message });
    }
});

// ... rest of the code remains the same

module.exports = router;

router.get('/graph-data', async (req, res) => {
    try {
        const products = await Product.find().lean().sort({ quantity: -1 });
        
        // Weekly sales (assuming createdAt field represents sale date)
        const weeklySales = products.reduce((acc, product) => {
            const day = new Date(product.createdAt).getDay();
            acc[day] += product.quantity;
            return acc;
        }, [0, 0, 0, 0, 0, 0, 0]);

        // Top 5 products by quantity
        const topProducts = products.slice(0, 5);

        // Top 5 brands by total quantity
        const brandTotals = products.reduce((acc, product) => {
            acc[product.brand] = (acc[product.brand] || 0) + product.quantity;
            return acc;
        }, {});
        const topBrands = Object.entries(brandTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        res.json({
            weeklySales: {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                values: weeklySales
            },
            topProducts: {
                labels: topProducts.map(p => p.name),
                values: topProducts.map(p => p.quantity)
            },
            topBrands: {
                labels: topBrands.map(b => b[0]),
                values: topBrands.map(b => b[1])
            }
        });
    } catch (err) {
        console.error('Error fetching graph data:', err);
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;