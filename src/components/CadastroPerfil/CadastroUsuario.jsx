import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Cadastro.module.css';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🧠 FUNÇÃO DE VALIDAÇÃO DE SENHA
  const validarSenha = (senhaDigitada) => {
    if (senhaDigitada.length < 8) {
      return "A senha deve ter no mínimo 8 caracteres";
    }

    // Regra: Pelo menos 3 números ou símbolos
    const qtdSymbolNumber = (senhaDigitada.match(/[^a-zA-Z]/g) || []).length;
    
    if (qtdSymbolNumber < 3) {
      return "A senha precisa de pelo menos 3 números ou símbolos";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const campoSenha = e.target.senha; 
    const erro = validarSenha(senha);

    if (erro) {
      campoSenha.setCustomValidity(erro);
      campoSenha.reportValidity();
      setMensagem(erro);
      return; 
    }

    // ✅ AJUSTE 1: Limpa o erro para permitir o envio
    campoSenha.setCustomValidity("");

    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }), 
      });

      const data = await response.json();

      if (response.ok) {
        login(data.usuario);
        setMensagem(`Bem-vindo! Seu cupom de 15% é: ${data.usuario.cupom}`);

        // ✅ AJUSTE 2: Deixamos apenas o timeout para o usuário ver a mensagem
        setTimeout(() => {
          navigate('/selecionar');
        }, 1500);

      } else {
        setMensagem(data.erro || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      setMensagem("O servidor está desligado!");
    }
  };

  return (
    <div className={styles.containerCadastro}>
      <h2 className={styles.titulo}>Seja um Cliente Anteiku</h2>
      
      {/* Exibição visual do erro/sucesso */}
      {mensagem && <p className="text-center fw-bold text-danger">{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGrupo}>
          <input 
            className={styles.inputCustom}
            type="text" 
            placeholder="Nome Completo" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGrupo}>
          <input 
            className={styles.inputCustom}
            type="email" 
            placeholder="E-mail de Acesso" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            className={styles.inputCustom}
            type="password" 
            name="senha"
            placeholder="Crie uma Senha (mínimo 8 dígitos)" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.botaoCadastrar}>
          CRIAR MINHA CONTA
        </button>

        <p className="text-center mt-3 cursor-pointer"> Esqueceu sua senha? </p>
      </form>
    </div>
  );
}

export default CadastroUsuario;