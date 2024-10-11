"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '@/types/types';
import Image from 'next/image';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        }

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold dark:text-white">Products</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border dark:border-gray-700 p-4 rounded-lg shadow-lg dark:bg-gray-700 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-semibold dark:text-white">{product.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
                        <p className="text-green-600 font-bold mt-2">{product.price} €</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-primary text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
