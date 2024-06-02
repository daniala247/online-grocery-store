const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/add', async (req, res) => {
    console.log("POST /orders/add route hit");
    try {
        const { name, address, city, state, zip, cart } = req.body;
        const newOrder = new Order({ name, address, city, state, zip, cart });
        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (error) {
        console.log("Error placing order:", error);
        res.status(500).json({ message: 'Error placing order', error });
    }
});

router.get('/', async (req, res) => {
    console.log("GET /orders route hit");
    try {
        const orders = await Order.find().populate('cart');
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

module.exports = router;
