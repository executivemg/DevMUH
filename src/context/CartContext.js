"use client";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [proquantity, setProquantity] = useState(1);

	const addToCart = (product, quantity = 1) => {
		setCart((prevCart) => {
			const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

			if (existingProductIndex !== -1) {
				return prevCart.map((item, index) => {
					if (index === existingProductIndex) {
						return {
							...item,
							quantity: item.quantity + quantity,
						};
					}
					return item;
				});
			} else {
				return [
					...prevCart,
					{
						...product,
						quantity: quantity,
					},
				];
			}
		});
		
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId, newQuantity) => {
		setCart((prevCart) =>
			prevCart.map((item) => {
				if (item.id === productId) {
					return {
						...item,
						quantity: newQuantity,
					};
				}
				return item;
			})
		);
	};

	const clearCart = () => {
		setCart([]);
	};

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, proquantity, setProquantity }}>{children}</CartContext.Provider>;
};
