const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', foodController.getAllFoodItems);
router.get('/:id', foodController.getFoodItemById);

// Protected admin routes
router.post('/', adminMiddleware, foodController.createFoodItem);
router.put('/:id', adminMiddleware, foodController.updateFoodItem);
router.delete('/:id', adminMiddleware, foodController.deleteFoodItem);

module.exports = router;
