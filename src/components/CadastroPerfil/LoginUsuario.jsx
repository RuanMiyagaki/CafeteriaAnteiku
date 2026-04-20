import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Cadastro.module.css';
import CadastroUsuario from './CadastroUsuario';
import EsqueciSenha from './EsqueciSenha';



function LoginUsuario () {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Bate na rota nova que criamos no server.js
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if(response.ok) {
        login(data.usuario);
        setMensagem('Acesso liberado, bem vindo de volta a Anteiku');

        // Manda o usuário de volta para a Home
        setTimeout(() => {
          navigate('/selecionar');
        }, 1000);
      } else {
        // Mostra o erro exato que o backend mandou (ex: "Senha incorreta")
        setMensagem(data.erro);
      }
    } catch (error) {
      setMensagem("O servidor está desligado!");
    }
  };


  return (
    <div className={styles.containerCadastro}>
      <h2 className={styles.titulo}>Bem-vindo de volta!</h2>
      
      {mensagem && <p className="text-center fw-bold text-danger">{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGrupo}>
          <input 
            className={styles.inputCustom}
            type="email" 
            placeholder="Seu E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            className={styles.inputCustom}
            type="password" 
            placeholder="Sua Senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.botaoCadastrar}>
          ENTRAR
        </button>

        <div className="text-center mt-4">
          
          <p className="mb-1 cursor-pointer text-muted">  <Link to="/esqueci-senha" style={{ color: '#d4a373', fontSize: '0.9rem', textDecoration: 'none' }}>Esqueci minha senha</Link></p>
          <p className="text-muted">
            Ainda não é cliente? <Link to="/cadastro" className="fw-bold" style={{ color: '#d4a373', textDecoration: 'none' }}>Cadastre-se aqui</Link>
          </p>
        </div>
      </form>
    </div>

  );
      }

  
export default LoginUsuario;


