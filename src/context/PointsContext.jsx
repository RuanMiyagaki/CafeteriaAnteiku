import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext'; 


export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  
  const { usuario, setUsuario } = useContext(AuthContext);
  const [pontos, setPontos] = useState(0);

  // Quando o usuário logar ou a página recarregar, puxamos os pontos dele
  useEffect(() => {
    if (usuario && usuario.pontos !== undefined) {
      setPontos(usuario.pontos);
    } else if (usuario) {
      setPontos(150); 
    }
  }, [usuario]);

  // Função para quando o cliente resgata uma recompensa (Gasta pontos)
  const gastarPontos = async (recompensa) => {
    if (!usuario || !usuario.email) {
      console.error("Usuário não logado!");
      return false;
    }

    // Verifica se tem pontos antes de tentar ir no banco
    if (pontos >= recompensa.custo) {
      try {
        const token = localStorage.getItem('anteiku_token');
        const response = await fetch('http://localhost:5000/api/usuarios/resgatar-pontos', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            email: usuario.email, 
            gasto: recompensa.custo,
            recompensaCodigo: recompensa.codigo || '' // Envia o cupom se houver!
          }) 
        });

        if (response.ok) {
          const data = await response.json();
          const novosPontos = pontos - recompensa.custo;
          
          // Atualiza o estado visual do modal na hora
          setPontos(novosPontos);

          if (setUsuario) {
            // 💥 CORREÇÃO 3: Monta o objeto atualizado unificando os pontos e o cupom de forma limpa
            const usuarioAtualizado = { 
              ...usuario, 
              pontos: novosPontos,
              cupom: recompensa.codigo ? recompensa.codigo : (usuario.cupom || '')
            };
            
            // Atualiza a Navbar instantaneamente
            setUsuario(usuarioAtualizado); 
            
            // Salva na memória do navegador para o F5 não quebrar nada
            localStorage.setItem('anteiku_user', JSON.stringify(usuarioAtualizado));
          }

          return true; // Sucesso!
        } else {
          console.error("Servidor recusou a compra de pontos");
        }
      } catch (error) {
        console.error("Erro ao tentar descontar pontos no servidor", error);
      }
    }
    return false; 
  };

  return (
    <PointsContext.Provider value={{ pontos, setPontos, gastarPontos }}>
      {children}
    </PointsContext.Provider>
  );
};