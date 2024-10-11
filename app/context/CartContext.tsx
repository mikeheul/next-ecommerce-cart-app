"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '@/types/types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (itemId: string, newQuantity: number) => void;
    removeItem: (itemId: string) => void;
    totalPrice: number;
    getTotalItems: () => number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const itemInCart = prevItems.find((cartItem) => cartItem.id === item.id);
            if (itemInCart) {
                // Update existing item quantity
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
                );
            } else {
                // Add new item to cart
                return [...prevItems, item];
            }
        });
    };

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(itemId); // Remove item if quantity is less than 1
            return;
        }
        setCartItems((current) =>
            current.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
        );
    };

    const removeItem = (itemId: string) => {
        setCartItems((current) => current.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]); // This will clear all items from the cart
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, totalPrice, getTotalItems, clearCart }}>
            {children} 
        </CartContext.Provider>
    );
};
