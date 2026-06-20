import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]); // Lista de pedidos para o gerente validar
  const [carregando, setCarregando] = useState(true);

  // 1. Ao carregar o site, recupera o usuário do localStorage
  useEffect(() => {
    const salvo = localStorage.getItem('anteiku_user');
    if (salvo) {
      setUsuario(JSON.parse(salvo));
    }
    setCarregando(false);
  }, []);

  // 2. Função de Login
  const login = (dados) => {
    setUsuario(dados);
    localStorage.setItem('anteiku_user', JSON.stringify(dados));
  };

  // 3. Função de Logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('anteiku_user');
  };

  // 4. Função para o GERENTE buscar os pedidos do Banco de Dados (Movi para FORA!)
  const buscarPedidos = async () => {
    try {
      const resposta = await fetch('http://localhost:5000/api/pedidos');
      const dados = await resposta.json();
      setPedidos(dados); // Preenche a tela do gerente com os dados reais
    } catch (error) {
      console.error("Erro ao buscar pedidos do banco:", error);
    }
  };

  // 5. Função para o CLIENTE registrar o pedido (chamada no PagamentoPix)
  const registrarPedido = async (dadosPedido) => {
    const novoPedido = {
      clienteNome: usuario?.nome || "Anônimo",
      clienteEmail: usuario?.email,
      valor: dadosPedido.valor,
      status: 'Pendente',
    };

    try {
      // 🚀 MANDA PRO MONGO DB E GUARDA A RESPOSTA
      const resposta = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPedido)
      });

  const pedidoSalvoNoBanco = await resposta.json();
    
    // Usamos o "prev" para garantir que pegamos a lista atualizada
    setPedidos(prev => [...prev, pedidoSalvoNoBanco]);
    console.log("Pedido registrado no sistema:", pedidoSalvoNoBanco);

    } catch (error) {
      console.error("Erro ao registrar pedido:", error);
    }
  };

  // 5. Função para o GERENTE confirmar o pagamento e dar os pontos
  const confirmarTransacao = async (pedidoId) => {
    // Primeiro, achamos o pedido na lista atual
    const pedidoParaConfirmar = pedidos.find(p => p._id === pedidoId);
    
    if (pedidoParaConfirmar && pedidoParaConfirmar.status === 'Pendente') {
      const pontosGanhos = Math.round(pedidoParaConfirmar.valor * 100);
      

      try {
        // Salva no banco
        await fetch('http://localhost:5000/api/usuarios/pontos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: pedidoParaConfirmar.clienteEmail, pontosGanhos: pontosGanhos })
        });

        setUsuario(prev => {
          if (prev && prev.email === pedidoParaConfirmar.clienteEmail) {
            const novosPontos = (prev.pontos || 0) + pontosGanhos;
            
            // Atualiza também o localStorage para não perder o sincronismo se ele atualizar depois
            const usuarioAtualizado = { ...prev, pontos: novosPontos };
            localStorage.setItem('anteiku_user', JSON.stringify(usuarioAtualizado));
            
            return usuarioAtualizado;
          }
          return prev;
        });

        // 2. Manda o banco MUDAR O STATUS do pedido para 'Confirmado'
        await fetch(`http://localhost:5000/api/pedidos/${pedidoId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Confirmado' })
        });

                setPedidos(prev => prev.filter(p => p._id !== pedidoId));
        
        
       
        
      } catch (error) {
        console.error("Erro ao confirmar pontos:", error);
      }
    }
  };
     
     

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      setUsuario, 
      login, 
      logout, 
      pedidos, 
      buscarPedidos,
      registrarPedido, 
      confirmarTransacao ,
      carregando
    }}>
      {children}
    </AuthContext.Provider>
  );
};