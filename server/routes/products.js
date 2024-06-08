const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup for Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['jpg', 'png']
    }
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const image = req.file.path;
        const newProduct = new Product({ name, price, category, image });
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        let products;
        if (query) {
            products = await Product.find({ name: { $regex: query, $options: 'i' } });
        } else {
            products = await Product.find(); // Fetch all products if no query
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get('/grouped', async (req, res) => {
    console.log("skjfnksjdnfskjdfnskjdfnskjdnfkjsdnfkjsndfjsndjkfnskdj36487yerpog5irhojfk[pl")
    const query = req.query.query || '';
    try {
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });
        const groupedProducts = products.reduce((acc, product) => {
            const category = product.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
        res.json(groupedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get('/', async (req, res) => {

    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)

    try {
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Product not found param.id: ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error fetching product `, error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;
