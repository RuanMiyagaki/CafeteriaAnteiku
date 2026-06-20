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
  const login = (dadosUsuario, token) => {
    setUsuario(dadosUsuario);
    localStorage.setItem('anteiku_user', JSON.stringify(dadosUsuario));
    if (token) {
      localStorage.setItem('anteiku_token', token);
    }
  };

  // 3. Função de Logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('anteiku_user');
    localStorage.removeItem('anteiku_token');
    localStorage.removeItem('usuario_anteiku'); // Limpa personagem selecionado
  };

  // 4. Função para o GERENTE buscar os pedidos do Banco de Dados
  const buscarPedidos = async () => {
    const token = localStorage.getItem('anteiku_token');
    try {
      const resposta = await fetch('http://localhost:5000/api/pedidos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        setPedidos(dados);
      } else {
        console.error("Erro na resposta de buscar pedidos:", dados.erro);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos do banco:", error);
    }
  };

  // 5. Função para o CLIENTE registrar o pedido (chamada no PagamentoPix)
  const registrarPedido = async ({ valor, itens, cupomDigitado }) => {
    const token = localStorage.getItem('anteiku_token');
    const novoPedido = {
      clienteNome: usuario?.nome || "Cliente Anônimo",
      clienteEmail: usuario?.email || "anonimo@anteiku.com",
      valor: valor,
      itens: itens || [],
      cupomDigitado: cupomDigitado || "",
      status: 'Pendente',
    };

    try {
      // 🚀 MANDA PRO MONGO DB COM HEADERS SEGUROS E GUARDA A RESPOSTA
      const resposta = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(novoPedido)
      });

      const pedidoSalvoNoBanco = await resposta.json();
      
      if (resposta.ok) {
        // Usamos o "prev" para garantir que pegamos a lista atualizada
        setPedidos(prev => [...prev, pedidoSalvoNoBanco]);
        console.log("Pedido registrado no sistema:", pedidoSalvoNoBanco);
      } else {
        console.error("Erro no registro do pedido:", pedidoSalvoNoBanco.erro);
      }

    } catch (error) {
      console.error("Erro ao registrar pedido:", error);
    }
  };

  // 6. Função para o GERENTE confirmar o pagamento e dar os pontos
  const confirmarTransacao = async (pedidoId) => {
    const token = localStorage.getItem('anteiku_token');
    const pedidoParaConfirmar = pedidos.find(p => p._id === pedidoId);
    
    if (pedidoParaConfirmar && pedidoParaConfirmar.status === 'Pendente') {
      const pontosGanhos = Math.round(pedidoParaConfirmar.valor * 10); // 10% do valor gasto vira pontos!
      
      try {
        // 1. Salva os pontos no banco
        const resPontos = await fetch('http://localhost:5000/api/usuarios/pontos', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ email: pedidoParaConfirmar.clienteEmail, pontosGanhos: pontosGanhos })
        });

        if (resPontos.ok) {
          setUsuario(prev => {
            if (prev && prev.email === pedidoParaConfirmar.clienteEmail) {
              const novosPontos = (prev.pontos || 0) + pontosGanhos;
              const usuarioAtualizado = { ...prev, pontos: novosPontos };
              localStorage.setItem('anteiku_user', JSON.stringify(usuarioAtualizado));
              return usuarioAtualizado;
            }
            return prev;
          });
        }

        // 2. Manda o banco MUDAR O STATUS do pedido para 'Confirmado'
        const resStatus = await fetch(`http://localhost:5000/api/pedidos/${pedidoId}/status`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'Confirmado' })
        });

        if (resStatus.ok) {
          setPedidos(prev => prev.filter(p => p._id !== pedidoId));
        }
        
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
      confirmarTransacao,
      carregando
    }}>
      {children}
    </AuthContext.Provider>
  );
};