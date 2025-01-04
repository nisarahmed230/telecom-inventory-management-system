
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');  // Import product controller


router.get('/products', productController.getAllProducts);
router.post('/products', productController.addProduct);
router.get('/products/:id', productController.getProductById);

module.exports = router;