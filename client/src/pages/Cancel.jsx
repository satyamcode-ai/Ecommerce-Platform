import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <span className="text-7xl mb-6 block">❌</span>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Failed</h1>
            <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg">
                Your payment was canceled or failed to process. Please try again.
            </p>
            <Link to="/cart" className="inline-block px-8 py-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all border border-red-100">
                Return to Cart
            </Link>
        </div>
    );
};

export default Cancel;
