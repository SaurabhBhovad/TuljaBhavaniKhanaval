const FoodItem = require('../models/FoodItem');

exports.getAllFoodItems = async (req, res) => {
  try {
    const { category, type, isAvailable } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

    const foodItems = await FoodItem.find(filter).sort({ category: 1, createdAt: -1 });

    res.json({
      count: foodItems.length,
      foodItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items', error: error.message });
  }
};

exports.getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ foodItem });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food item', error: error.message });
  }
};

exports.createFoodItem = async (req, res) => {
  try {
    const { name, description, price, category, type, image, ingredients, preparationTime } = req.body;

    if (!name || !price || !category || !type) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const foodItem = new FoodItem({
      name,
      description,
      price,
      category,
      type,
      image,
      ingredients,
      preparationTime
    });

    await foodItem.save();

    res.status(201).json({
      message: 'Food item created successfully',
      foodItem
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating food item', error: error.message });
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const { name, description, price, category, type, image, isAvailable, ingredients, preparationTime } = req.body;

    const foodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        type,
        image,
        isAvailable,
        ingredients,
        preparationTime,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({
      message: 'Food item updated successfully',
      foodItem
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating food item', error: error.message });
  }
};

exports.deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({
      message: 'Food item deleted successfully',
      foodItem
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food item', error: error.message });
  }
};
