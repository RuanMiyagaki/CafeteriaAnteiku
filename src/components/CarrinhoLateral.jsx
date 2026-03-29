import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import PagamentoPix from './PagamentoPix';

function CarrinhoLateral() {
  const { cart, valorTotal, removeFromCart } = useCart();
  
  // 🛡️ O GATILHO: Começa falso para mostrar a sacola.
  const [mostrarPix, setMostrarPix] = useState(false);

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

  // 🟢 TELA 1: A SUA SACOLA ORIGINAL
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

          <div className="mt-auto pt-4 border-top border-secondary">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fw-bold text-uppercase small" style={{ letterSpacing: '2px' }}>Total</span>
              <span className="fs-4 fw-bold" style={{ color: '#27ae60' }}>
                R$ {(valorTotal || 0).toFixed(2)}
              </span>
            </div>

            {/* 🛡️ ESSE BOTÃO AGORA SÓ MUDA A TELA, NÃO CHAMA MODAL! */}
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