import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';


  function RedefinirSenha () {

    const { token } = useParams(); // Pega o código secreto da URL!
    const navigate = useNavigate();


    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

     const handleSubmit = async (e) => {
        e.preventDefault();


        if ( novaSenha !== confirmarSenha) {
            return setMensagem("❌ As senhas não são iguais!");
        }

        try {
            setMensagem("Processando as informações");
            const resposta = await fetch('http://localhost:5000/api/redefinir-senha', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({token, novaSenha})
            });

            const dados = await resposta.json();

            if(resposta.ok) {
                setMensagem(`✅ ${dados.mensagem}`);
                setTimeout(() => navigate('/login'), 3000); // Manda pro login após 3s
                 } else {
                   setMensagem(`❌ ${dados.erro}`);
                 }
                } catch (error) {
                    setMensagem("❌ Erro de conexão com o servidor.");
                    
                }
            };
        
     return (
    <div className="card border-0 shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px', borderRadius: '15px', backgroundColor: '#fcfaf7' }}>
      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ color: '#2c1e16' }}>Criar Nova Senha</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control mb-2" 
            placeholder="Digite a nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required minLength="4"
          />
          <input 
            type="password" 
            className="form-control" 
            placeholder="Confirme a nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required minLength="4"
          />
        </div>

        <button type="submit" className="btn w-100 fw-bold mb-3" style={{ backgroundColor: '#2c1e16', color: '#d4a373' }}>
          Redefinir Senha
        </button>

        {mensagem && (
          <div className="alert alert-info small text-center" role="alert">
            {mensagem}
          </div>
        )}
        
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#d4a373' }}>
            Voltar para o Login
          </Link>
        </div>
      </form>
    </div>
  );
  
  }

  export default RedefinirSenha;