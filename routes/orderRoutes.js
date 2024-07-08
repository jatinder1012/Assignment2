const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const { user, products, totalAmount } = req.body;
    const order = new Order({ user, products, totalAmount });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
