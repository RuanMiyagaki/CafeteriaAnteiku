import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-5 text-white" style={{ backgroundColor: '#111', borderTop: '1px solid #333' }}>
      <div className="container">
        <div className="row g-4 text-center text-md-start">
          
          {/* 1. COLUNA: SOBRE A MARCA */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3" style={{ color: '#d4a373', fontFamily: "'Playfair Display', serif" }}>
              ANTEIKU<span className="text-white">COFFEE</span>
            </h4>
            <p className="text-white-50 small" style={{ lineHeight: '1.8' }}>
              Um refúgio de paz no coração do 20º distrito. Servimos mais do que apenas café; oferecemos um lugar onde todos podem ser eles mesmos.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
              <a href="#" className="text-white-50 fs-5 transition-all hover-gold"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white-50 fs-5 transition-all hover-gold"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white-50 fs-5 transition-all hover-gold"><i className="bi bi-facebook"></i></a>
            </div>
          </div>

          {/* 2. COLUNA: HORÁRIO DE FUNCIONAMENTO */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-4" style={{ color: '#d4a373' }}>Horário de Funcionamento</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">
                <span className="text-white fw-bold">Segunda - Sexta:</span><br />
                08:00 — 22:00
              </li>
              <li className="mb-2">
                <span className="text-white fw-bold">Sábado - Domingo:</span><br />
                09:00 — 18:00
              </li>
              <li className="mt-3 text-warning italic" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-clock-history me-2"></i>
                Distrito 20 — Aberto até as 22h
              </li>
            </ul>
          </div>

          {/* 3. COLUNA: LOCALIZAÇÃO (MAPA SIMBÓLICO) */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-4" style={{ color: '#d4a373' }}>Onde Estamos</h5>
            <div className="d-flex align-items-start gap-3 justify-content-center justify-content-md-start">
              <div 
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{ 
                  minWidth: '45px', 
                  height: '45px', 
                  backgroundColor: '#222', 
                  borderRadius: '12px',
                  border: '1px solid #d4a373'
                }}
              >
                <i className="bi bi-geo-alt-fill fs-5" style={{ color: '#d4a373' }}></i>
              </div>
              <div>
                <p className="text-white fw-bold mb-0">20º Distrito, Tokyo</p>
                <p className="text-white-50 small mb-0">Rua da Estação, Próximo à Ward 20</p>
               <Link to="/localizacao" className="text-decoration-none small" style={{ color: '#d4a373' }}>
  Ver no mapa simbólico →
</Link>
              </div>
            </div>
          </div>

        </div>

        <hr className="my-5 opacity-25" />

        <div className="text-center text-white-50 small">
          <p className="mb-0">© 2026 Cafeteria Anteiku. Todos os direitos reservados.</p>
          <p className="mt-1" style={{ fontSize: '0.7rem' }}>Desenvolvido com maestria para ghouls e humanos.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

