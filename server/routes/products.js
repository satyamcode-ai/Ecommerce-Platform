import express from 'express';

const router = express.Router();

const products = [
    {
        id: 1,
        name: 'Wireless Noise-Canceling Headphones',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
        description: 'Premium sound quality with active noise cancellation.'
    },
    {
        id: 2,
        name: 'Minimalist White Sneakers',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
        description: 'Comfortable and stylish sneakers for everyday wear.'
    },
    {
        id: 3,
        name: 'Smart Fitness Watch',
        price: 149.50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
        description: 'Track your health and fitness goals with precision.'
    },
    {
        id: 4,
        name: 'Urban Travel Backpack',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
        description: 'Durable and spacious, perfect for the modern traveler.'
    },
    {
        id: 5,
        name: 'Mechanical Gaming Keyboard',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
        description: 'RGB backlit keyboard with responsive mechanical switches.'
    },
    {
        id: 6,
        name: 'Modern Desk Lamp',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1000&auto=format&fit=crop',
        description: 'Adjustable LED desk lamp with wireless charging base.'
    },
    {
        id: 7,
        name: 'Classic Leather Wallet',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=1000&auto=format&fit=crop',
        description: 'Handcrafted genuine leather wallet with RFID protection.'
    },
    {
        id: 8,
        name: '4K Ultra HD Monitor',
        price: 349.00,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
        description: '27-inch 4K IPS monitor with 144Hz refresh rate.'
    }
];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

export default router;
