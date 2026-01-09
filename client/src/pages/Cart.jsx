import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { cart, removeFromCart, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
                <Link to="/" className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Your Cart ({cart.length} items)</h2>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-center bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm md:mr-6 mb-4 md:mb-0" />

                        <div className="flex-grow text-center md:text-left">
                            <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                            <div className="text-slate-500 mt-1">${item.price.toFixed(2)} x {item.quantity}</div>
                        </div>

                        <div className="font-bold text-lg text-slate-900 mx-6 my-4 md:my-0">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors group"
                            title="Remove item"
                        >
                            <FaTrash className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-slate-50 p-6 rounded-xl border border-slate-100 max-w-md ml-auto">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600 font-medium">Total Amount</span>
                    <span className="text-3xl font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="block w-full text-center py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    );
};

export default Cart;
