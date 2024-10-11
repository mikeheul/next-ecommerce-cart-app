"use client"; // Ensure this file is treated as a client component

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useCart } from '@/app/context/CartContext';
import { ShoppingCart } from 'lucide-react'; // Assuming you have lucide-react installed

export default function Navbar() {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems(); // Get the total items count from the context

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/products" className="text-white text-lg font-bold">
                    E-commerce
                </Link>
                <Link href="/cart" className="text-white text-lg font-bold relative flex items-center">
                    <ShoppingCart className="w-6 h-6 mr-1" /> {/* Cart icon */}
                    <span className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-red-600 rounded-full text-white text-xs font-semibold px-2 py-1">
                        {totalItems} {/* Total items displayed */}
                    </span>
                </Link>
                <ThemeToggle />
            </div>
        </nav>
    );
}