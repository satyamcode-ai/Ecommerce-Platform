import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (sessionId) {
            // clear cart locally
            clearCart();

            // Verify with backend (optional but good for UX confirmation)
            axios.get(`http://localhost:5000/api/orders/verify-payment/${sessionId}`)
                .then(() => setVerified(true))
                .catch(err => console.error(err));
        }
    }, [sessionId]);

    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <span className="text-7xl mb-6 block animate-bounce">🎉</span>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                Thank you for your purchase. Your order has been confirmed and we're getting it ready!
            </p>
            <Link to="/" className="mb-12 inline-block px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Continue Shopping
            </Link>
        </div>
    );
};

export default Success;
