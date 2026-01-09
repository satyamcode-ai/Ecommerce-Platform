import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const { items, email } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items in cart' });
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image],
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
    }));

    try {
        // Determine the success and cancel URLs
        // Assuming frontend runs on same host but different port in dev, or same domain in prod
        // Using env var for client URL
        // 1. Create the order first to get an ID
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = new Order({
            customerBase: { email },
            items: items.map(i => ({
                productId: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity
            })),
            amount: totalAmount,
            status: 'pending'
        });

        await newOrder.save();

        // 2. Create Stripe Session with metadata linking to Order
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/cancel`,
            customer_email: email,
            client_reference_id: newOrder._id.toString(),
            payment_intent_data: {
                metadata: {
                    orderId: newOrder._id.toString()
                }
            }
        });

        // 3. Update Order with Session ID
        newOrder.stripeSessionId = session.id;
        await newOrder.save();

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
    }
});

export default router;
