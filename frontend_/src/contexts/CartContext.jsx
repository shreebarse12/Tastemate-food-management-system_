import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Update total when cart changes
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.mealType === item.mealType
    );

    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId, mealType) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === itemId && item.mealType === mealType)
    );
    setCart(updatedCart);
  };

  const updateQuantity = (itemId, mealType, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, mealType);
      return;
    }
    
    const updatedCart = cart.map(item => {
      if (item.id === itemId && item.mealType === mealType) {
        return { ...item, quantity };
      }
      return item;
    });
    
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      total, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}