import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerBase: {
        email: { type: String, required: true },
    },
    items: [
        {
            productId: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // pending, paid, failed
    stripeSessionId: { type: String },
    paymentIntentId: { type: String }, // Transaction ID
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
