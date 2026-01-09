import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// This endpoint matches /api/webhook
// It expects the body to be raw (Buffer) for signature verification
router.post('/', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // req.body must be a Buffer here
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;

                // Find order by session ID and update
                const order = await Order.findOne({ stripeSessionId: session.id });
                if (order) {
                    order.status = 'paid';
                    order.paymentIntentId = session.payment_intent; // Save Transaction ID
                    await order.save();
                    console.log(`Order ${order._id} updated to paid. Transaction ID: ${session.payment_intent}`);
                }
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                const orderId = paymentIntent.metadata?.orderId;
                const amount = paymentIntent.amount;

                if (orderId) {
                    const order = await Order.findById(orderId);
                    if (order) {
                        order.status = 'failed';
                        // Save transaction ID even on failure if available
                        order.paymentIntentId = paymentIntent.id;

                        await order.save();
                        console.log(`Order ${orderId} marked as failed. Transaction ID: ${paymentIntent.id}`);
                    }
                } else {
                    console.log(`Payment failed for ${amount} cents but no order ID in metadata. Intent: ${paymentIntent.id}`);
                }
                break;
            }
            default:
            // console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).send('Internal Server Error');
    }

    res.send();
});

export default router;
