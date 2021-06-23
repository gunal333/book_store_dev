const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
router.get('/',shopController.getIndex);
router.get('/books',shopController.productsList);
router.get('/books/:bookId',shopController.getBook);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart)
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.get('/order',shopController.getOrders)
router.get('/checkout',shopController.getCheckout);
module.exports = router;