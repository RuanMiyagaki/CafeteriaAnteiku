import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer 
      className="py-5 transition-all mt-5" 
      style={{ 
        backgroundColor: 'var(--theme-bg-card)', 
        borderTop: '1px solid var(--theme-border)',
        color: 'var(--theme-text-main)',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.02)'
      }}
    >
      <div className="container">
        <div className="row g-4 text-center text-md-start">
          
          {/* 1. COLUNA: SOBRE A MARCA */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3" style={{ color: 'var(--theme-accent)', fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>
              ANTEIKU<span style={{ color: 'var(--theme-text-main)' }}>COFFEE</span>
            </h4>
            <p className="text-muted small" style={{ lineHeight: '1.8', opacity: 0.85 }}>
              Um refúgio de paz no coração do 20º distrito. Servimos mais do que apenas café; oferecemos um lugar acolhedor onde todos podem ser eles mesmos, sem julgamentos.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-4">
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none transition-all" 
                 style={{ width: '38px', height: '38px', border: '1px solid var(--theme-border)', color: 'var(--theme-accent)', backgroundColor: 'rgba(150,150,150,0.05)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--theme-accent)'; e.currentTarget.style.color = '#fff'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(150,150,150,0.05)'; e.currentTarget.style.color = 'var(--theme-accent)'; }}
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none transition-all" 
                 style={{ width: '38px', height: '38px', border: '1px solid var(--theme-border)', color: 'var(--theme-accent)', backgroundColor: 'rgba(150,150,150,0.05)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--theme-accent)'; e.currentTarget.style.color = '#fff'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(150,150,150,0.05)'; e.currentTarget.style.color = 'var(--theme-accent)'; }}
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none transition-all" 
                 style={{ width: '38px', height: '38px', border: '1px solid var(--theme-border)', color: 'var(--theme-accent)', backgroundColor: 'rgba(150,150,150,0.05)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--theme-accent)'; e.currentTarget.style.color = '#fff'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(150,150,150,0.05)'; e.currentTarget.style.color = 'var(--theme-accent)'; }}
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          {/* 2. COLUNA: HORÁRIO DE FUNCIONAMENTO */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-4" style={{ color: 'var(--theme-accent)', fontFamily: "'Playfair Display', serif" }}>Horário de Funcionamento</h5>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2">
                <span className="fw-bold" style={{ color: 'var(--theme-text-main)' }}>Segunda - Sexta:</span><br />
                08:00 — 22:00
              </li>
              <li className="mb-2">
                <span className="fw-bold" style={{ color: 'var(--theme-text-main)' }}>Sábado - Domingo:</span><br />
                09:00 — 18:00
              </li>
              <li className="mt-3 text-warning italic" style={{ fontSize: '0.8rem', color: 'var(--theme-accent)' }}>
                <i className="bi bi-clock-history me-2"></i>
                Distrito 20 — Aberto até as 22h
              </li>
            </ul>
          </div>

          {/* 3. COLUNA: LOCALIZAÇÃO */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-4" style={{ color: 'var(--theme-accent)', fontFamily: "'Playfair Display', serif" }}>Onde Estamos</h5>
            <div className="d-flex align-items-start gap-3 justify-content-center justify-content-md-start">
              <div 
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{ 
                  minWidth: '45px', 
                  height: '45px', 
                  backgroundColor: 'rgba(150,150,150,0.05)', 
                  borderRadius: '12px',
                  border: '1px solid var(--theme-border)'
                }}
              >
                <i className="bi bi-geo-alt-fill fs-5" style={{ color: 'var(--theme-accent)' }}></i>
              </div>
              <div>
                <p className="fw-bold mb-0" style={{ color: 'var(--theme-text-main)' }}>20º Distrito, Tokyo</p>
                <p className="text-muted small mb-1" style={{ opacity: 0.85 }}>Rua da Estação, Próximo à Ward 20</p>
                <Link to="/localizacao" className="text-decoration-none small fw-bold transition-all" style={{ color: 'var(--theme-accent)' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Ver no mapa simbólico →
                </Link>
              </div>
            </div>
          </div>

        </div>

        <hr className="my-5" style={{ borderColor: 'var(--theme-border)', opacity: 0.6 }} />

        <div className="text-center text-muted small" style={{ opacity: 0.85 }}>
          <p className="mb-0">© 2026 Cafeteria Anteiku. Todos os direitos reservados.</p>
          <p className="mt-1" style={{ fontSize: '0.75rem' }}>Desenvolvido com maestria para ghouls e humanos.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
