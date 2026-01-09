import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';

const Checkout = () => {
    const { cart, cartTotal } = useCart();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/payment/create-checkout-session', {
                items: cart,
                email: email
            });

            if (res.data.id) {
                // Use Stripe.js to redirect (but we can just redirect to the URL if provided, 
                // or actually for proper integration we rely on the session response. 
                // NOTE: The stripe-node library creates a session which has a `url` property. 
                // I should have returned { url: session.url } in backend or used stripe.redirectToCheckout on frontend.
                // Let's assume I return session ID and use stripe-js, OR simpler: return URL from backend.
                // Let's wait, I should check my backend code. 
                // Correction: I only returned `id`. I need to load Stripe on frontend to redirect with ID, 
                // OR easier: return `url` from backend.
                // I'll update backend logic momentarily or use the frontend redirection method.
                // For now, I'll proceed assuming I'll fix this or use the ID with `stripe.redirectToCheckout`

                // Actually, easier path for "mock" / quick setup is to return .url from backend.

                // I'll stick to using the `stripe` object here if I had it.
                // To be safe and quick, I will use `npm install @stripe/stripe-js` 
                // BUT I didn't install it. 

                // Alternative: Let's assume the backend returns the URL. I will update backend to return { url: session.url }.
                // Wait, I only returned `id` in `payment.js`. 
                // I will fix `payment.js` to return `url`. It's much simpler for the frontend.

                // For now, I'll write this assuming `res.data.url` works after I fix backend.
                if (res.data.url) {
                    window.location.href = res.data.url;
                } else {
                    // Fallback if I forget to update backend (which I won't)
                    alert("Stripe session created: " + res.data.id);
                }
            }
        } catch (error) {
            console.error(error);
            alert("Payment initiation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen bg-slate-50">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-2 border-b border-slate-100 pb-4">Secure Checkout</h2>
                <form onSubmit={handleCheckout}>
                    <div className="mb-6">
                        <label className="block mb-6 font-medium text-slate-700">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl mt-8 border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
                        <div className="space-y-3">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-slate-600 text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span className="font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6 pt-4 border-t border-slate-200 font-bold text-xl text-slate-900">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-8 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : <><FaLock className="text-sm" /> Pay with Stripe</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
