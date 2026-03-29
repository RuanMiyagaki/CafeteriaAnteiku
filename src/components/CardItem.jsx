import React, { useState } from 'react';
import { useCart } from '../context/CartContext'

function CardItem({ cafe, temCupom }) {
  // 🧠 Estado para controlar se o coração está marcado ou não
  const [favorito, setFavorito] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const { addToCart } = useCart();


  // Função para decidir a cor da tag
  const getCorDaTag = (tag) => {
    const t = tag.toLowerCase();
    if (t === 'gelado' || t === 'frio' || t === 'ice') return '#3498db'; // Azul gelo
    if (t === 'forte' || t === 'preto') return '#2c3e50'; // Cinza bem escuro
    if (t === 'doce' || t === 'suave') return '#e67e22'; // Laranja suave
    if (t === 'leite') return '#f39c12'; // Amarelo queimado
    return '#d4a373'; // Cor dourada padrão da Anteiku
  };

  // 3. FUNÇÃO: Clique no botão "Adicionar"
  const handleAdicionar = () => {

    const valorCarrinho = temCupom ? cafe.precoFinal : cafe.preco;

    addToCart({
      ...cafe,
      preco: valorCarrinho // Garante que o preço no carrinho seja o correto
    });
    setAdicionado(true); // Muda o estado para "Adicionado"
    
    // Depois de 1.5 segundos (1500ms), o botão volta ao estado normal
    setTimeout(() => {
      setAdicionado(false);
    }, 1500);
  };
  
  return (
    <div 
      className="card h-100 border-0" 
      style={{ 
        borderRadius: '20px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease-in-out'
      }}
      // Efeito de levantar o card ao passar o mouse
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
      }}
    >
      {/* 🖼️ CONTAINER DA IMAGEM E DOS ÍCONES FLUTUANTES */}
      <div className="position-relative">
        <img 
          src={cafe.img} 
          className="card-img-top" 
          alt={cafe.nome} 
          style={{ height: '220px', objectFit: 'cover' }} 
        />
        
        {/* ❤️ BOTÃO DE FAVORITO (Coração) */}
        <button 
          onClick={() => setFavorito(!favorito)}
          className="position-absolute d-flex justify-content-center align-items-center shadow-sm"
          style={{
            top: '15px',
            right: '15px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            zIndex: 10
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.8)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Alterna entre coração vazio escuro e coração cheio vermelho */}
          <i className={`bi ${favorito ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'} fs-5`}></i>
        </button>

        {/* 🏷️ TAG DE DESTAQUE (Pega a primeira tag do banco de dados) */}
        {cafe.tags && cafe.tags[0] && (
          <span 
            className="position-absolute badge shadow-sm" 
            style={{ 
              bottom: '15px', 
              left: '15px', 
              backgroundColor: getCorDaTag(cafe.tags[0]),
              padding: '8px 12px',
              fontSize: '0.75rem',
              letterSpacing: '1px'
            }}
          >
            {cafe.tags[0].toUpperCase()}
          </span>
        )}
      </div>

      {/* 📝 CONTEÚDO DO CARD (Textos e Botão) */}
      <div className="card-body d-flex flex-column p-4 text-center">
        <h5 className="card-title fw-bold mb-2" style={{ color: '#2c1e16' }}>{cafe.nome}</h5>
        <p className="card-text text-muted small mb-4 flex-grow-1">{cafe.desc}</p>
        
        <div className="mt-auto">
          {/* Exibição Inteligente de Preço */}
          {temCupom ? (
            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
              <span className="text-muted text-decoration-line-through small">
                R$ {cafe.preco.toFixed(2)}
              </span>
              <span className="fw-bold fs-4" style={{ color: '#27ae60' }}>
                R$ {cafe.precoFinal.toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="mb-3">
              <span className="fw-bold fs-4" style={{ color: '#d4a373' }}>
                R$ {cafe.preco.toFixed(2)}
              </span>
            </div>
          )}
          
          
         {/* 🔘 BOTÃO COM FEEDBACK VISUAL */}
          <button 
            onClick={handleAdicionar}
            className="btn w-100 fw-bold shadow-sm d-flex justify-content-center align-items-center"
            style={{ 
              backgroundColor: adicionado ? '#27ae60' : '#1a1a1a', 
              color: adicionado ? '#fff' : '#d4a373', 
              borderRadius: '10px',
              padding: '10px',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
          >
            {adicionado ? (
              <><i className="bi bi-check-circle me-2 fs-5"></i> Adicionado!</>
            ) : (
              <><i className="bi bi-bag-plus me-2 fs-5"></i> Adicionar</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardItem;