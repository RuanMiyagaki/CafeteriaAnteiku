import React, { useContext, useState } from 'react';
// CORREÇÃO: Removendo a importação que estava quebrando o código (o contexto vai injetar os pontos no main.jsx)
import { PointsContext } from '../context/PointsContext';
// CORREÇÃO: Usando a classe global do Bootstrap definida no main.jsx, em vez de importar direto aqui.

const RECOMPENSAS_VIP = [
  { 
    id: 101, 
    nome: "Cupom 50% OFF", 
    tipo: "cupom",
    codigo: "GHOUL50",
    custo: 500, 
    desc: "Metade do preço em qualquer pedido da nossa cafeteria.", 
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop" 
  },
  { 
    id: 102, 
    nome: "Bolo Red Velvet", 
    tipo: "produto",
    custo: 400, 
    desc: "Fatia deliciosa de bolo com calda especial.", 
    img: "https://images.unsplash.com/photo-1586788224331-947f68671caf?w=400&h=300&fit=crop" 
  },
  { 
    id: 103, 
    nome: "Caneca Anteiku", 
    tipo: "produto",
    custo: 1000, 
    desc: "Caneca oficial de porcelana com detalhes em dourado.", 
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop" 
  }
];

function PaginaRewards({ modoGhoul }) {
  const { pontos, gastarPontos } = useContext(PointsContext);
  const [mensagem, setMensagem] = useState(null);

  const handleResgatar = async (recompensa) => {
    const sucesso = await gastarPontos(recompensa);
    
    if (sucesso) {
      setMensagem({ tipo: 'success', texto: `🎉 Sucesso! Você resgatou: ${recompensa.nome}!` });
    } else {
      setMensagem({ tipo: 'danger', texto: "❌ Ops! Ocorreu um erro ou você não tem saldo suficiente." });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sobe a tela para o usuário ler a mensagem
    setTimeout(() => setMensagem(null), 4000);
  };

  // 🎨 PALETAS DE CORES PREMIUM
  const theme = {
    bgApp: modoGhoul ? '#0a0a0a' : '#f8f5f2',
    textMain: modoGhoul ? '#ffffff' : '#2c1e16',
    textMuted: modoGhoul ? '#aaaaaa' : '#6b503b',
    accent: modoGhoul ? '#ff4d4d' : '#d4a373',
    cardBg: modoGhoul ? '#1a1a1a' : '#ffffff',
    cardBorder: modoGhoul ? 'rgba(255, 77, 77, 0.2)' : 'rgba(212, 163, 115, 0.3)',
    cardHoverGlow: modoGhoul ? '0 8px 30px rgba(255, 77, 77, 0.3)' : '0 8px 30px rgba(212, 163, 115, 0.4)',
    saldoBg: modoGhoul ? 'linear-gradient(135deg, #2b0000 0%, #1a0000 100%)' : 'linear-gradient(135deg, #f5e6d3 0%, #ffffff 100%)',
  };

  return (
    <div style={{ backgroundColor: theme.bgApp, minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', transition: 'all 0.4s ease' }}>
      <div className="container">
        
        {/* CABEÇALHO DA PÁGINA (HERO) */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 mb-3" style={{ color: theme.accent, fontFamily: "'Playfair Display', serif" }}>
            Clube Anteiku
          </h1>
          <p className="lead" style={{ color: theme.textMuted, maxWidth: '600px', margin: '0 auto' }}>
            Transforme sua lealdade em experiências exclusivas. Escolha suas recompensas abaixo.
          </p>
        </div>

        {/* ALERTA DE MENSAGENS */}
        {mensagem && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-8">
              <div className={`alert alert-${mensagem.tipo} shadow-sm text-center fw-bold rounded-pill`} role="alert">
                {mensagem.texto}
              </div>
            </div>
          </div>
        )}

        {/* CARTÃO DE SALDO VIP */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6 col-lg-4">
            <div 
              className="card text-center p-4 shadow-lg border-0" 
              style={{ 
                background: theme.saldoBg,
                borderRadius: '20px',
                border: `1px solid ${theme.cardBorder}`
              }}
            >
              <h6 className="text-uppercase fw-bold mb-3" style={{ color: theme.textMuted, letterSpacing: '2px' }}>
                Seu Saldo
              </h6>
              <div className="d-flex justify-content-center align-items-center">
                <span style={{ fontSize: '3rem', marginRight: '10px' }}>⭐</span>
                <h1 className="display-2 fw-bold mb-0" style={{ color: theme.textMain }}>
                  {pontos}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* VITRINE DE RECOMPENSAS (GRID) */}
        <div className="row g-4">
          {RECOMPENSAS_VIP.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 border-0 p-4 transition-all reward-card"
                style={{ 
                  backgroundColor: theme.cardBg, 
                  borderRadius: '15px',
                  boxShadow: `0 4px 15px rgba(0,0,0,0.05)`,
                  border: `1px solid ${theme.cardBorder}`,
                  cursor: 'pointer',
                  color: theme.textMain
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = theme.cardHoverGlow;
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 15px rgba(0,0,0,0.05)`;
                  e.currentTarget.style.borderColor = theme.cardBorder;
                }}
              >

                <div style={{ height: '180px', width: '100%' }}>
          <img 
            src={item.img} 
            alt={item.nome} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="display-4">{item.emoji}</div>
                  <div 
                    className="fw-bold px-3 py-1 rounded-pill" 
                    style={{ 
                      backgroundColor: modoGhoul ? 'rgba(255,77,77,0.1)' : 'rgba(212,163,115,0.2)',
                      color: theme.accent,
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.custo} pts
                  </div>
                </div>
                
                <h4 className="fw-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.nome}
                </h4>
                
                <p style={{ color: theme.textMuted, fontSize: '0.95rem', minHeight: '50px' }}>
                  {item.desc}
                </p>

                <div className="mt-auto pt-3">
                  <button 
                    onClick={() => handleResgatar(item)}
                    className={`btn w-100 fw-bold py-2 rounded-pill`}
                    disabled={pontos < item.custo}
                    style={{
                      backgroundColor: pontos >= item.custo ? theme.accent : 'transparent',
                      color: pontos >= item.custo ? (modoGhoul ? '#fff' : '#fff') : theme.textMuted,
                      border: `2px solid ${pontos >= item.custo ? theme.accent : theme.cardBorder}`,
                      transition: 'all 0.3s'
                    }}
                  >
                    {pontos >= item.custo ? 'Resgatar Agora' : 'Pontos Insuficientes'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PaginaRewards;