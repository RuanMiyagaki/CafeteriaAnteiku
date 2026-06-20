import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Cadastro.module.css';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // 🚨 A TRAVA DE SEGURANÇA DA SENHA
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!regexSenha.test(senha)) {
      return setMensagem ("As senhas devem ter no mínimo 8 caracteres,incluindo uma letra maiúscula, um número e um símbolo especial");
    }

    if (senha !== confirmarSenha) {
        return setMensagem("❌ As senhas não conferem.");
    }
    
    

    

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
       
       setMensagem("✅ Cadastro quase lá! Um código de 6 dígitos foi enviado para o seu e-mail.");

        setTimeout(() => {
         navigate('/verificar-codigo', { state: { emailDigitado: email } });
        }, 2500);

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
            type="text" 
            placeholder="Crie uma Senha (mínimo 8 dígitos)" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            className={styles.inputCustom}
            type="text" 
            name="senha"
            placeholder="Confirme sua senha" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.botaoCadastrar}>
          CRIAR MINHA CONTA
        </button>

       
      </form>
    </div>
  );
}

export default CadastroUsuario;