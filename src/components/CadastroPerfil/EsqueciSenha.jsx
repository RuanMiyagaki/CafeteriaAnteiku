import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("Se esse e-mail estiver cadastrado, você receberá a mensagem em instante.");

    try {
      // Bate na rota do Backend para disparar o e-mail
      const resposta = await fetch('http://localhost:5000/api/esqueci-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem(`✅ ${dados.mensagem}`);
      } else {
        setMensagem(`❌ ${dados.erro}`);
      }
    } catch (error) {
      setMensagem("❌ O servidor está offline ou deu erro de conexão.");
    }
  };

  return (
    <div className="card border-0 shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px', borderRadius: '15px', backgroundColor: '#fcfaf7' }}>
      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ color: '#2c1e16' }}>Recuperar Senha</h3>
        <p className="text-muted small">Digite seu e-mail para receber as instruções de recuperação.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold" style={{ color: '#4b2c20' }}>E-mail cadastrado</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="exemplo@ghoul.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn w-100 fw-bold mb-3" style={{ backgroundColor: '#2c1e16', color: '#d4a373' }}>
          Enviar link de recuperação
        </button>

        {mensagem && (
          <div className={`alert small text-center ${mensagem.includes('❌') ? 'alert-danger' : mensagem.includes('⏳') ? 'alert-warning' : 'alert-success'}`} role="alert">
            {mensagem}
          </div>
        )}

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#d4a373' }}>
            <i className="bi bi-arrow-left me-1"></i> Voltar para o Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EsqueciSenha;