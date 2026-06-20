import React, { useState, useContext } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


function VerificarEmail() {

    const [codigo, setCodigo] = useState('');
    const [mensagem, setMensagem] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext);

    const email = location.state?.emailDigitado;

    if (!email) {
        navigate('/cadastro');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem("Verificando o código");

        try {
            const resposta = await fetch  ('http://localhost:5000/api/verificar-codigo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, codigo})
            });

            const dados = await resposta.json();

            if (resposta.ok) {
               setMensagem(`✅ Conta verificada! Seu cupom de 15% é: ${dados.usuario.cupom}`);
                login(dados.usuario);
                setTimeout(() => navigate('/selecionar'), 5000);
            } else {
                setMensagem(`${dados.erro}`);
            }
        } catch (error) {
            setMensagem("Erro de conexão com o servidor.");
        }
    };

    return (
    <div className="card border-0 shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px', borderRadius: '15px', backgroundColor: '#fcfaf7' }}>
      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ color: '#2c1e16' }}>Verifique seu E-mail</h3>
        <p className="text-muted small">Enviamos um código de 6 dígitos para <strong>{email}</strong>.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control text-center fs-4 letter-spacing-2" 
            placeholder="000000"
            maxLength="6"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))} // O replace impede de digitar letras!
            required
          />
        </div>

        <button type="submit" className="btn w-100 fw-bold mb-3" style={{ backgroundColor: '#2c1e16', color: '#d4a373' }}>
          Confirmar Código
        </button>

        {mensagem && (
          <div className="alert alert-info small text-center" role="alert">
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}

export default VerificarEmail;