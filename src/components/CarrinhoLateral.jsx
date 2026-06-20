import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import PagamentoPix from './PagamentoPix';

function CarrinhoLateral() {
  const { cart, valorTotal, removeFromCart, cupomAtivo, setCupomAtivo } = useCart();
  const { usuario } = useContext(AuthContext);

 
  const [mostrarPix, setMostrarPix] = useState(false);
  const [inputCupom, setInputCupom] = useState('');
  const [mensagemCupom, setMensagemCupom] = useState({ texto: '', tipo: '' });

  const handleAplicarCupom = () => {
    const cupomFormatado = inputCupom.trim().toUpperCase();


    if (cupomFormatado === 'BEMVINDO50' || cupomFormatado === usuario?.cupom) {
      setCupomAtivo(cupomFormatado); // Ativa na matemática do CartContext
      setMensagemCupom({ texto: '🎯 Cupom aplicado! 50% de desconto em 1 item.', tipo: 'success' });
    } else {
      setMensagemCupom({ texto: '❌ Cupom inválido ou não resgatado.', tipo: 'danger' });
    }
  };

  const handleRemoverCupom = () => {
    setCupomAtivo(''); // Tira o desconto da matemática
    setInputCupom(''); // Limpa o que ele digitou
    setMensagemCupom({ texto: '', tipo: '' }); // Limpa a mensagem de sucesso
  };

  // 🟢 TELA 2: SE CLICOU EM FINALIZAR, MOSTRA O PIX AQUI DENTRO
  if (mostrarPix) {
    return (
      <div className="d-flex flex-column h-100 p-3">
        {/* Botão para voltar para a sacola */}
        <button 
          className="btn btn-outline-danger mb-4 fw-bold" 
          onClick={() => setMostrarPix(false)}
          style={{ borderRadius: '10px' }}
        >
          <i className="bi bi-arrow-left me-2"></i> Voltar para a Sacola
        </button>
        
        {/* Renderiza o seu componente passando o valor correto */}
        <PagamentoPix valorTotal={valorTotal} />
      </div>
    );
  }

 
  return (
    <div className="d-flex flex-column h-100 p-3">
      {cart.length === 0 ? (
        <div className="text-center my-auto opacity-50">
          <i className="bi bi-cart-x display-1 mb-3 d-block"></i>
          <p className="fw-bold">Sua sacola está vazia.</p>
          <small>Que tal um Yoshimura Blend para começar?</small>
        </div>
      ) : (
        <>
          <div className="flex-grow-1 overflow-auto pe-2">
            {cart.map((item) => (
              <div key={item.id} className="d-flex align-items-center mb-4 pb-3 border-bottom border-secondary-subtle">
                <div style={{ width: '70px', height: '70px', borderRadius: '15px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.img} alt={item.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-0 fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>{item.nome}</h6>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span className="badge bg-secondary-subtle text-dark" style={{ fontSize: '0.7rem' }}>
                      {item.quantidade}x
                    </span>
                    <small className="text-muted">R$ {item.preco.toFixed(2)}</small>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="btn btn-sm text-danger border-0 opacity-75">
                  <i className="bi bi-trash3 fs-5"></i>
                </button>
              </div>
            ))}
          </div>

         
          <div className="p-3 mb-3 bg-light border rounded-3" style={{ color: '#333' }}>
            <label className="form-label small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
              Possui Cupom de Desconto?
            </label>
            <div className="input-group input-group-sm">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ex: BEMVINDO50" 
                value={inputCupom}
                onChange={(e) => setInputCupom(e.target.value)}
                disabled={cupomAtivo !== ''} // Trava o campo se já tiver um aplicado
              />
             {cupomAtivo === '' ? (
                <button 
                  className="btn btn-dark fw-bold" 
                  onClick={handleAplicarCupom}
                >
                  Aplicar
                </button>
              ) : (
                <button 
                  className="btn btn-danger fw-bold" 
                  onClick={handleRemoverCupom}
                >
                  <i className="bi bi-x-lg"></i> Remover
                </button>
              )}
            </div>
            
            {mensagemCupom.texto && (
              <small className={`d-block mt-2 fw-bold text-${mensagemCupom.tipo}`} style={{ fontSize: '0.75rem' }}>
                {mensagemCupom.texto}
              </small>
            )}
            
            {/* Dica amigável pro cliente saber se tem cupom na manga */}
            {usuario?.cupom && cupomAtivo === '' && (
              <small className="d-block mt-2 text-muted" style={{ fontSize: '0.7rem' }}>
                💡 Você tem o cupom <strong className="text-dark">{usuario.cupom}</strong> disponível!
              </small>
            )}
          </div>

          <div className="mt-auto pt-4 border-top border-secondary">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fw-bold text-uppercase small" style={{ letterSpacing: '2px' }}>Total</span>
              <span className="fs-4 fw-bold" style={{ color: '#27ae60' }}>
                R$ {(valorTotal || 0).toFixed(2)}
              </span>
            </div>

          
            <button 
              className="btn btn-success w-100 py-3 fw-bold shadow-lg" 
              style={{ borderRadius: '15px', letterSpacing: '1px' }}
              onClick={() => setMostrarPix(true)}
            >
              FINALIZAR PEDIDO NO PIX
            </button>
            <small className="d-block text-center mt-3 text-muted" style={{ fontSize: '0.7rem' }}>
              <i className="bi bi-shield-check me-1"></i> Pagamento Seguro Anteiku
            </small>
          </div>
        </>
      )}
    </div>
  );
}

export default CarrinhoLateral;