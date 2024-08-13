const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Saumyadip:qwerty1234@cluster0.4xqgnfh.mongodb.net/Inventory');

//Schema defined
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

const productSchema = new mongoose.Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        brand: { type: String },
        expiry: { type: Date },
});


const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product };