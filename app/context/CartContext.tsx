"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  size: string;
  flavour: string;
  quantity: number;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, size: string, flavour: string, quantity: number) => void; // ✅ new
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔥 Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // 🔥 Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: string, size: string, flavour: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.flavour === flavour
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (x) =>
          x.id === item.id &&
          x.size === item.size &&
          x.flavour === item.flavour
      );
      if (existing) {
        return prev.map((x) =>
          x === existing ? { ...x, quantity: x.quantity + item.quantity } : x
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
