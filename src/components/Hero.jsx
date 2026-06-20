import React from 'react';
import { Link } from 'react-router-dom';
import imagemBanner from '../assets/Banner/banner-coffe.png';

function Hero({ modoGhoul }) {
  // 🎨 Degradê dinâmico: No modo humano é um marrom/preto suave, no modo Ghoul é uma névoa sombria escarlate
  const gradientOverlay = modoGhoul 
    ? 'linear-gradient(to right, rgba(9, 5, 5, 0.95), rgba(255, 51, 51, 0.25))'
    : 'linear-gradient(to right, rgba(26, 15, 10, 0.9), rgba(44, 30, 22, 0.4))';

  return (
    <div className="hero-container position-relative overflow-hidden d-flex align-items-center" style={{
      height: '85vh',
      backgroundImage: `${gradientOverlay}, url(${imagemBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'all 0.5s ease'
    }}>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-12 col-md-8 col-lg-6 text-start px-4 px-md-3">
            <h5 className="text-uppercase fw-bold mb-2 animate-fade-in" style={{ letterSpacing: '4px', color: 'var(--theme-accent)', fontSize: '0.9rem' }}>
              Cafeteria Anteiku
            </h5>
            <h1 className="responsive-title fw-bold text-white mb-3" style={{ lineHeight: '1.1' }}>
              Servimos o café mais rico da cidade!
            </h1>
            <p className="lead mb-4 text-white-50" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: '300' }}>
              Descubra sabores intensos e momentos de paz no 20º distrito. O refúgio perfeito para amantes de grãos selecionados e ghouls integrados.
            </p>
            <Link to="/Cardapio" className="btn-premium-accent text-decoration-none px-5 py-3 d-inline-block text-center shadow-lg">
              Peça Agora
            </Link>
          </div>
        </div>
      </div>
      
      {/* 🔮 Sombra na borda inferior para mesclar perfeitamente com a listagem de produtos */}
      <div className="position-absolute bottom-0 start-0 w-100" style={{
        height: '150px',
        background: 'linear-gradient(to top, var(--theme-bg), transparent)',
        zIndex: 1
      }}></div>
    </div>
  );
}

export default Hero;