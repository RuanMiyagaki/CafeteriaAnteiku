import React from 'react';
import imagemCafeteria from '../assets/CafeteriaAnteiku/cafeteria-anteiku.png';

function SobreNos() {
  return (
    <section 
      className="py-5 main-content-spacer transition-all" 
      style={{ 
        backgroundColor: 'var(--theme-bg)', 
        color: 'var(--theme-text-main)',
        minHeight: '80vh'
      }}
      id="sobre"
    >
      <div className="container py-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="position-relative overflow-hidden rounded-4 shadow-lg border" style={{ borderColor: 'var(--theme-border)' }}>
              <img 
                src={imagemCafeteria} 
                className="img-fluid w-100" 
                style={{ 
                  objectFit: 'cover', 
                  maxHeight: '450px',
                  transition: 'transform 0.5s ease'
                }} 
                alt="Sobre a Anteiku"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill">Distrito 20, Tokyo</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-start">
            <h5 className="text-uppercase fw-bold mb-2" style={{ color: 'var(--theme-accent)', letterSpacing: '3px', fontSize: '0.9rem' }}>
              Nossa História
            </h5>
            <h2 className="responsive-title fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Um Refúgio para Todos
            </h2>
            <div className="mb-4" style={{ width: '60px', height: '3.5px', backgroundColor: 'var(--theme-accent)', borderRadius: '2px' }}></div>
            
            <p className="lead mb-4 fw-normal" style={{ color: 'var(--theme-text-main)', opacity: 0.9 }}>
              A Anteiku não é apenas uma cafeteria comum. Ela foi fundada com uma missão nobre: servir como um ponto de paz e coexistência na agitada metrópole de Tokyo.
            </p>
            
            <p className="mb-4 text-muted" style={{ lineHeight: '1.8' }}>
              Localizada no pacífico 20º distrito, nós nos esforçamos para oferecer grãos da mais alta qualidade, preparados artesanalmente com técnicas refinadas. Nossos baristas dedicam-se a criar uma atmosfera segura e calorosa onde ghouls e humanos podem compartilhar momentos, relaxar e desfrutar do verdadeiro sabor do café.
            </p>

            <div className="row g-3 mt-2">
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)' }}>
                  <i className="bi bi-patch-check-fill fs-3" style={{ color: 'var(--theme-accent)' }}></i>
                  <div>
                    <h6 className="fw-bold mb-0">Grãos Selecionados</h6>
                    <small className="text-muted">Origem controlada</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)' }}>
                  <i className="bi bi-shield-heart-fill fs-3" style={{ color: 'var(--theme-accent)' }}></i>
                  <div>
                    <h6 className="fw-bold mb-0">Espaço Seguro</h6>
                    <small className="text-muted">Harmonia e respeito</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreNos;