import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const salvo = localStorage.getItem('anteiku-cart');
    return salvo ? JSON.parse(salvo) : [];
  })

  const [cupomAtivo, setCupomAtivo] = useState('');
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

  const limparCarrinho = () => {
    setCart([]);
    setCupomAtivo('');
  };

  const totalItens = cart.reduce((sum, item) => sum + item.quantidade, 0);
 const calcularValorTotal = () => {
  let total = 0;

  if (cupomAtivo !== '') {
      
      let itemMaisCaro = cart.length > 0 ? cart[0] : null;
      cart.forEach((item) => {
        if (item.preco > itemMaisCaro.preco) {
          itemMaisCaro = item;
        }
      });

      let descontoJaAplicado = false;
      
      cart.forEach((item) => {
        if (itemMaisCaro && item.id === itemMaisCaro.id && !descontoJaAplicado) {
          const valorComDesconto = item.preco * 0.5; 
          const valorRestanteCheio = item.preco * (item.quantidade - 1); // Se ele pediu 3 iguais, os outros 2 são preço cheio
          
          total += valorComDesconto + valorRestanteCheio;
          descontoJaAplicado = true; 
        } else {
       
          total += item.preco * item.quantidade;
        }
      });

    } else {

      cart.forEach((item) => {
        total += item.preco * item.quantidade;
      });
    }

  return total;
};

const valorTotal = calcularValorTotal();

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, limparCarrinho, totalItens, valorTotal, cupomAtivo, setCupomAtivo }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);