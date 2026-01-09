import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripeConn() {
    try {
        console.log('Testing Stripe connection...');
        const paymentIntents = await stripe.paymentIntents.list({ limit: 1 });
        console.log('STRIPE_CONN_SUCCESS');
        console.log('Successfully connected to Stripe.');
    } catch (error) {
        console.log('STRIPE_CONN_FAILED');
        console.error('Error:', error.message);
    }
}

testStripeConn();
