const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');

exports.createOrder = async (req, res) => {
  try {
    const { foodItems, deliveryAddress, deliveryDate, deliveryTime, notes, latitude, longitude } = req.body;

    if (!foodItems || foodItems.length === 0 || !deliveryAddress || !deliveryDate || !deliveryTime) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    let totalPrice = 0;
    const orderItems = [];

    // Validate and calculate total
    for (const item of foodItems) {
      const foodItem = await FoodItem.findById(item.foodItem);
      if (!foodItem) {
        return res.status(404).json({ message: `Food item ${item.foodItem} not found` });
      }

      if (!foodItem.isAvailable) {
        return res.status(400).json({ message: `${foodItem.name} is not available` });
      }

      totalPrice += foodItem.price * item.quantity;
      orderItems.push({
        foodItem: foodItem._id,
        quantity: item.quantity,
        price: foodItem.price
      });
    }

    const order = new Order({
      user: req.user.id,
      foodItems: orderItems,
      totalPrice,
      deliveryAddress,
      deliveryLocation: { latitude, longitude },
      deliveryDate,
      deliveryTime,
      notes
    });

    await order.save();
    await order.populate('foodItems.foodItem');

    res.status(201).json({
      message: 'Order created successfully. Waiting for admin approval',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('foodItems.foodItem')
      .sort({ createdAt: -1 });

    res.json({
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    let filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('user', 'name email phone address city')
      .populate('foodItems.foodItem')
      .sort({ createdAt: -1 });

    res.json({
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('foodItems.foodItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!status || !['Pending', 'Approved', 'Rejected', 'Delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        rejectionReason: status === 'Rejected' ? rejectionReason : null,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate('user').populate('foodItems.foodItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: `Order status updated to ${status}`,
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};
