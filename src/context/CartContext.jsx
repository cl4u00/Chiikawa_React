// Ubicación: proyectoChiikawa/src/context/CartContext.jsx
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const item = prev.find(i => i.id === product.id);
      return item 
        ? prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i)
        : [...prev, {...product, quantity: 1}];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};