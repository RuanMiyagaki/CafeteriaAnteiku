import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    // Ao carregar o site, verifica se o usuário já estava logado
    useEffect(() => {
        const salvo = localStorage.getItem('anteiku_user')
        if 
  (salvo) setUsuario(JSON.parse(salvo));
  }, []);

  const login = (dados) => {
    setUsuario(dados);
    localStorage.setItem('anteiku_user', JSON.stringify(dados));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('anteiku_user');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};