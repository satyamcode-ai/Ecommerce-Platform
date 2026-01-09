import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
import productRoutes from './routes/products.js';
import paymentRoutes from './routes/payment.js';
import orderRoutes from './routes/orders.js';
import webhookRoutes from './routes/webhook.js';

// Webhook route must be before express.json() to capture raw body for signature verification
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoutes);

app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
