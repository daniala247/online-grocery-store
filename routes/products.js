const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to add a new product
router.post('/add', productController.addProduct);

// Route to get all products
router.get('/', productController.getProducts);

// Route to get a single product by ID
router.get('/:id', productController.getProductById);

// Route to update a product by ID
router.put('/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
