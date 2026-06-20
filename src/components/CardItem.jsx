import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function CardItem({ cafe, temCupom }) {
  const [favorito, setFavorito] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const { addToCart } = useCart();

  // 🧪 Estilização de vidro (Glassmorphism) para as Tags
  const getCorDaTag = (tag) => {
    const t = tag ? tag.toLowerCase() : '';
    if (t === 'gelado' || t === 'frio' || t === 'ice') return 'rgba(52, 152, 219, 0.15)'; 
    if (t === 'forte' || t === 'preto') return 'rgba(26, 15, 10, 0.15)'; 
    if (t === 'doce' || t === 'suave') return 'rgba(230, 126, 34, 0.15)'; 
    if (t === 'leite') return 'rgba(243, 156, 18, 0.15)'; 
    return 'rgba(181, 131, 90, 0.15)'; 
  };

  const handleAdicionar = () => {
    const valorCarrinho = temCupom ? (cafe?.precoFinal || cafe?.preco) : (cafe?.preco || 0);

    addToCart({
      ...cafe,
      preco: valorCarrinho 
    });
    setAdicionado(true); 
    
    setTimeout(() => {
      setAdicionado(false);
    }, 1500);
  };

  // 🛡️ BLINDAGEM ANTI-TELA BRANCA: Se os preços não carregaram do banco ainda, assume "0.00" em vez de quebrar
  const precoExibido = cafe?.preco ? cafe.preco.toFixed(2) : '0.00';
  const precoFinalExibido = cafe?.precoFinal ? cafe.precoFinal.toFixed(2) : '0.00';

  return (
    <div className="card h-100 premium-card">
      
      {/* 🖼️ CONTAINER DA IMAGEM COM EFEITO OVERFLOW ZOOM */}
      <div className="position-relative overflow-hidden" style={{ borderTopLeftRadius: '23px', borderTopRightRadius: '23px' }}>
        <img 
          src={cafe?.img} 
          className="card-img-top" 
          alt={cafe?.nome} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop";
          }}
          style={{ 
            height: 'clamp(140px, 22vw, 220px)', 
            objectFit: 'cover',
            width: '100%',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }} 
          // 🚀 Micro-interação: Zoom suave na foto ao passar o mouse
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* ❤️ BOTÃO DE FAVORITO ELEGANTE */}
        <button 
          onClick={() => setFavorito(!favorito)}
          className="position-absolute d-flex justify-content-center align-items-center shadow-sm"
          style={{
            top: '15px',
            right: '15px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className={`bi ${favorito ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'} fs-5`}></i>
        </button>

        {/* 🏷️ TAG DE VITRO TRANSLÚCIDO */}
        {cafe?.tags && cafe.tags[0] && (
          <span 
            className="position-absolute badge shadow-sm" 
            style={{ 
              bottom: '15px', 
              left: '15px', 
              backgroundColor: getCorDaTag(cafe.tags[0]),
              color: 'var(--theme-text-main)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--theme-border)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.7rem',
              fontWeight: '600',
              letterSpacing: '1px'
            }}
          >
            {cafe.tags[0].toUpperCase()}
          </span>
        )}
      </div>

      {/* 📝 CONTEÚDO DO CARD ALINHADO À ESQUERDA (Visual muito mais limpo e caro) */}
      <div className="card-body d-flex flex-column p-4 text-start">
        <h5 className="card-title fw-bold mb-2" style={{ color: 'var(--theme-text-main)', letterSpacing: '0.5px' }}>
          {cafe?.nome}
        </h5>
        <p className="card-text text-muted small mb-4 flex-grow-1" style={{ lineHeight: '1.5' }}>
          {cafe?.desc}
        </p>
        
        {/* 💸 FILEIRA MODERNA: Preço organizado de um lado, botão elegante do outro */}
        <div className="mt-auto d-flex align-items-center justify-content-between gap-2 pt-2">
          <div>
            {temCupom ? (
              <div className="d-flex flex-column">
                <span className="text-decoration-line-through text-muted" style={{ fontSize: '0.75rem' }}>
                  R$ {precoExibido}
                </span>
                <span className="fw-bold fs-4 text-success" style={{ lineHeight: '1.2' }}>
                  R$ {precoFinalExibido}
                </span>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <span className="text-muted text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px', fontWeight: '600' }}>Preço</span>
                <span className="fw-bold fs-4" style={{ color: 'var(--theme-accent)', lineHeight: '1.2' }}>
                  R$ {precoExibido}
                </span>
              </div>
            )}
          </div>
          
          {/* 🔘 BOTÃO PREMIUM QUE SE ADAPTA AO MODO ATUAL */}
          <button 
            onClick={handleAdicionar}
            className="btn fw-bold d-flex justify-content-center align-items-center transition-all"
            style={{ 
              backgroundColor: adicionado ? '#27ae60' : 'var(--theme-text-main)', 
              color: adicionado ? '#fff' : 'var(--theme-bg)', 
              borderRadius: '14px',
              padding: '10px 18px',
              fontSize: '0.85rem',
              border: 'none',
              minWidth: '115px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
            }}
          >
            {adicionado ? (
              <><i className="bi bi-check-lg me-1 fs-6"></i> Pronto</>
            ) : (
              <><i className="bi bi-bag-plus me-1 fs-6"></i> Pedir</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CardItem;