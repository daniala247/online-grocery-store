const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(req.headers)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

router.post('/add', authenticate, async (req, res) => {
    console.log("POST /orders/add route hit");
    try {
        const { name, address, city, state, zip, cart } = req.body;
        const newOrder = new Order({ user: req.userId, name, address, city, state, zip, cart });
        const order = await newOrder.save();
        console.log(cart)
        res.status(201).json(order);
    } catch (error) {
        console.log("Error placing order:", error);
        res.status(500).json({ message: 'Error placing order', error });
    }
});

router.get('/', authenticate, async (req, res) => {
    console.log("GET /orders route hit");
    try {
        const orders = await Order.find({ user: req.userId }).populate('cart');
        console.log("Orders fetched:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

module.exports = router;
