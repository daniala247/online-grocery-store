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
app.use('/api/products', require('./routes/products'));

// Use the orders routes
app.use('/api/orders', require('./routes/orders'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
