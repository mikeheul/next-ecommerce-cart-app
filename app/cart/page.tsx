"use client";

import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash } from "lucide-react"; // Import the icons

export default function CartPage() {
    const { cartItems, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="text-center sm:text-left flex flex-col sm:flex-row sm:justify-between items-center bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
                                <div>
                                    <h2 className="font-bold text-lg">{item.name}</h2>
                                    <p className="text-gray-500">${item.price}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 p-2 rounded-md transition-colors"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    >
                                        <Minus className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                                        className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 p-2 rounded-md transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="flex items-center justify-center text-red-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash className="w-4 h-4 mr-1" />
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
                        
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            onClick={clearCart} // Clear all items in the cart
                        >
                            Clear Cart
                        </button>
                        
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition-colors">
                            Checkout with Stripe
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
