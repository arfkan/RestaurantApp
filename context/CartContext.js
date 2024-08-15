// CartContext.js
import React, { createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Uygulama başladığında sepet öğelerini AsyncStorage'dan yükleyin
    loadCartItems();
  }, []);

  useEffect(() => {
    // Sepet öğeleri her değiştiğinde AsyncStorage'a kaydedin
    saveCartItems();
  }, [cartItems]);

  const loadCartItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@cart_items');
      if (jsonValue != null) {
        setCartItems(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load cart items from AsyncStorage');
    }
  };

  const saveCartItems = async () => {
    try {
      const jsonValue = JSON.stringify(cartItems);
      await AsyncStorage.setItem('@cart_items', jsonValue);
    } catch (e) {
      console.error('Failed to save cart items to AsyncStorage');
    }
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
      
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);