const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://Saumyadip:qwerty1234@cluster0.4xqgnfh.mongodb.net/Inventory';

// Database connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRouter = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Use routes
app.use('/user', userRouter);
app.use('/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
