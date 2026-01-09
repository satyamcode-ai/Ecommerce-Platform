import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 flex items-center">
            <div className="container mx-auto px-8 flex justify-between items-center w-full">
                <Link to="/" className="text-2xl font-extrabold text-slate-900 tracking-tight">LuxeStore.</Link>
                <div className="flex items-center gap-8">
                    <Link to="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Shop</Link>
                    <Link to="/cart">
                        <div className="relative text-2xl text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
                            <FaShoppingCart />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
