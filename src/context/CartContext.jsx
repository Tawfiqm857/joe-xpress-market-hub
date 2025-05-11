
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('joeXpressCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        setCart([]);
      }
    }
  }, []);

  // Update localStorage and totals whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('joeXpressCart', JSON.stringify(cart));
    }
    
    // Calculate totals
    let items = 0;
    let price = 0;
    
    cart.forEach(item => {
      items += item.quantity;
      price += item.price * item.quantity;
    });
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity of ${product.name} in your cart!`);
        return updatedCart;
      } else {
        // Add new item to cart
        toast.success(`${product.name} added to your cart!`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      if (updatedCart.length === 0) {
        localStorage.removeItem('joeXpressCart');
      }
      toast.info('Item removed from cart');
      return updatedCart;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      return updatedCart;
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('joeXpressCart');
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
