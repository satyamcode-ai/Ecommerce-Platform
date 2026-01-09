import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Using localhost directly for now. In prod, use env var.
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:translate-y-[-4px] transition-all duration-200 flex flex-col h-full border border-slate-100">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{product.name}</h3>
                            <p className="text-slate-500 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
                            <div className="text-xl font-semibold text-blue-600 mb-4">${product.price.toFixed(2)}</div>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full py-3 px-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
