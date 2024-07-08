const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('products.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add product to cart
router.post('/', async (req, res) => {
    const { user, product, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({ user, products: [{ product, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === product);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product, quantity });
            }
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
