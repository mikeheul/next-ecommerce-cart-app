"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types/types';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${productId}`);
            const data = await res.json();
            setProduct(data);
        }
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col lg:flex-row">
                <img src={product.image} alt={product.name} className="w-full lg:w-1/2 h-96 object-cover rounded-md mb-4" />
                <div className="lg:ml-8">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-600 my-4">{product.description}</p>
                    <p className="text-green-600 font-bold text-lg">${product.price}</p>
                    
                    <div className="flex items-center mt-4">
                        <label htmlFor="quantity" className="mr-2">Quantity:</label>
                        <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border rounded p-1 w-16 text-center"
                        />
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-6"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
