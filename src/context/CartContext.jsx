import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const salvo = localStorage.getItem('anteiku-cart');
    return salvo ? JSON.parse(salvo) : [];
  })

  useEffect (() => {
    localStorage.setItem('anteiku-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (produto) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prevCart.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCart, { ...produto, quantidade: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItens = cart.reduce((sum, item) => sum + item.quantidade, 0);
  const valorTotal = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItens, valorTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);