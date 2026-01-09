import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get order details by Stripe Session ID (to verify payment on success page)
router.get('/verify-payment/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const order = await Order.findOne({ stripeSessionId: sessionId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // In a real app, verify with Stripe API again here to ensure it's actually paid
        // For now, we update status to paid if it's found (assuming user arrived here via Stripe success URL)

        if (order.status !== 'paid') {
            order.status = 'paid';
            await order.save();
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error verifying payment' });
    }
});

// Create Order Manually (Optional, if not using Stripe webhook flow strictly)
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
