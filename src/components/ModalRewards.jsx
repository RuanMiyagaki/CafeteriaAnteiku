import React, { useContext, useState } from 'react';
import { PointsContext } from '../context/PointsContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Nosso catálogo VIP de itens que não podem ser comprados com dinheiro
const RECOMPENSAS_VIP = [
  { id: 101, nome: "Drink Tea Ghoul", custo: 300, desc: "Chá mate especial da casa", emoji: "🍷" },
  { id: 102, nome: "Cupom 50% OFF", custo: 500, desc: "Metade do preço no próximo pedido", emoji: "🎟️" },
  { id: 103, nome: "Caneca Anteiku", custo: 1000, desc: "Caneca oficial de porcelana", emoji: "☕" }
];

function ModalRewards({ show, onClose, modoGhoul }) {
  const { pontos, gastarPontos } = useContext(PointsContext);
  const [mensagem, setMensagem] = useState(null);

  if (!show) return null;

  const handleResgatar = async (recompensa) => {
    const sucesso = await gastarPontos(recompensa.custo);
    
    if (sucesso) {
      setMensagem({ tipo: 'success', texto: `🎉 Você resgatou: ${recompensa.nome}!` });
      // Aqui você poderia adicionar o item VIP ao carrinho de graça!
    } else {
      setMensagem({ tipo: 'danger', texto: "❌ Pontos insuficientes para este item." });
    }

    // Limpa a mensagem depois de 3 segundos
    setTimeout(() => setMensagem(null), 3000);
  };

  // Estilo que respeita o tema claro/escuro da sua Navbar
  const modalStyle = {
    backgroundColor: modoGhoul ? '#1a1a1a' : '#fcfaf7',
    color: modoGhoul ? '#fff' : '#4b2c20',
    border: modoGhoul ? '1px solid #ff4d4d' : '1px solid #d4a373'
  };

  const btnCor = modoGhoul ? 'btn-outline-danger' : 'btn-outline-warning';

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
      <div className="card shadow-lg p-4" style={{ ...modalStyle, width: '90%', maxWidth: '500px', borderRadius: '15px' }}>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            Clube de Recompensas
          </h4>
          <button onClick={onClose} className="btn-close" style={{ filter: modoGhoul ? 'invert(1)' : 'none' }}></button>
        </div>

        <div className="text-center mb-4 p-3 rounded" style={{ backgroundColor: modoGhoul ? 'rgba(255,77,77,0.1)' : 'rgba(212,163,115,0.2)' }}>
          <h5 className="mb-0">Seu Saldo Atual</h5>
          <h2 className="display-4 fw-bold mb-0" style={{ color: modoGhoul ? '#ff4d4d' : '#d4a373' }}>
            ⭐ {pontos}
          </h2>
          <small>Pts</small>
        </div>

        {mensagem && (
          <div className={`alert alert-${mensagem.tipo} text-center py-2`} role="alert">
            {mensagem.texto}
          </div>
        )}

        <div className="recompensas-lista">
          {RECOMPENSAS_VIP.map(item => (
            <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom border-secondary py-3">
              <div className="d-flex align-items-center">
                <span className="fs-2 me-3">{item.emoji}</span>
                <div>
                  <h6 className="fw-bold mb-0">{item.nome}</h6>
                  <small className="opacity-75">{item.desc}</small>
                </div>
              </div>
              <div className="text-end">
                <div className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{item.custo} pts</div>
                <button 
                  onClick={() => handleResgatar(item)}
                  className={`btn btn-sm ${btnCor} fw-bold`}
                  disabled={pontos < item.custo}
                >
                  Resgatar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ModalRewards;