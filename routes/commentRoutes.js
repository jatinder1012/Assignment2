const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments for a product
router.get('/product/:productId', async (req, res) => {
    try {
        const comments = await Comment.find({ product: req.params.productId }).populate('user');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
