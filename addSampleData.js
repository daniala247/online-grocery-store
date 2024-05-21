// addSampleData.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/grocery-store', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Sample products
    const products = [
        { name: 'Apple', price: 1.5, category: 'Fruits', inStock: true },
        { name: 'Bread', price: 2.0, category: 'Bakery', inStock: true },
        { name: 'Milk', price: 1.2, category: 'Dairy', inStock: true },
    ];

    try {
        await Product.insertMany(products);
        console.log('Sample products added successfully!');
    } catch (err) {
        console.error('Error adding sample products:', err);
    } finally {
        mongoose.connection.close();
    }
});
