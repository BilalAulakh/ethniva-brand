'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/supabase';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  customMeasurements?: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, customMeasurements?: string) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, change: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('zehra_cart');
      const savedWishlist = localStorage.getItem('zehra_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (err) {
      console.error('Error loading local storage state:', err);
    }
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('zehra_cart', JSON.stringify(cart));
      localStorage.setItem('zehra_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Error saving local storage state:', err);
    }
  }, [cart, wishlist]);

  const addToCart = (product: Product, quantity = 1, selectedSize = 'M', customMeasurements = '') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedSize, customMeasurements }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId: string, selectedSize: string, change: number) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.product.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(item => item.id === productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        wishlistCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
