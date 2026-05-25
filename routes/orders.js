const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Protected user routes
router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

// Protected admin routes
router.get('/', adminMiddleware, orderController.getAllOrders);
router.put('/:id/status', adminMiddleware, orderController.updateOrderStatus);

module.exports = router;
