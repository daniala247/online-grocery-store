const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Use the product routes
app.use('/api/products', require('./routes/products'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
