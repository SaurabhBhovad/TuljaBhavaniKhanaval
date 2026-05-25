const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    required: true
  },
  type: {
    type: String,
    enum: ['Veg', 'Non-Veg'],
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: false
  },
  ingredients: [{
    type: String
  }],
  preparationTime: {
    type: Number, // in minutes
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
