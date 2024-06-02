const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Log incoming requests
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB', process.env.MONGO_URI);
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Use the auth routes
app.use('/api/auth', require('./routes/auth'));

// Product routes
const Product = require('./models/Product');
const router = express.Router();

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

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
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

app.use('/api/products', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
