import React from 'react';

const DEPOIMENTOS = [
  { id: 1, nome: "Ken Kaneki", texto: "O melhor café que já provei. O ambiente é muito calmo e acolhedor, ideal para quem precisa de um tempo de paz no Distrito 20.", estrelas: 5, avatar: "⭐" },
  { id: 2, nome: "Touka Kirishima", texto: "Atendimento excelente e café impecável. Recomendo fortemente o Yoshimura Blend especial preparado na mesa.", estrelas: 5, avatar: "☕" },
  { id: 3, nome: "Hideyoshi Nagachika", texto: "Sempre passo aqui depois da universidade. O café é fantástico e a equipe é extremamente atenciosa!", estrelas: 5, avatar: "🥪" }
];

function Avaliacoes() {
  return (
    <section className="py-5" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text-main)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h5 className="text-uppercase fw-bold" style={{ color: 'var(--theme-accent)', letterSpacing: '3px', fontSize: '0.9rem' }}>Depoimentos</h5>
          <h2 className="responsive-title fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>O que dizem sobre nós</h2>
          <div style={{ width: '65px', height: '3px', backgroundColor: 'var(--theme-accent)', margin: '15px auto', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4">
          {DEPOIMENTOS.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div 
                className="card border-0 p-4 h-100 transition-all shadow-sm" 
                style={{ 
                  backgroundColor: 'var(--theme-bg-card)', 
                  color: 'var(--theme-text-main)',
                  borderRadius: '20px',
                  border: '1px solid var(--theme-border)',
                  boxShadow: 'var(--theme-shadow)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--theme-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--theme-border)';
                }}
              >
                <div className="card-body p-0 d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{ fontSize: '1.5rem' }}>{item.avatar}</span>
                    <div style={{ color: 'var(--theme-accent)' }}>
                      {"★".repeat(item.estrelas)}
                    </div>
                  </div>
                  <p className="card-text fst-italic mb-4 flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.85 }}>
                    "{item.texto}"
                  </p>
                  <footer className="blockquote-footer mt-auto pt-3 border-top" style={{ color: 'var(--theme-accent)', borderColor: 'var(--theme-border)', fontSize: '0.85rem', fontWeight: '600' }}>
                    {item.nome}
                  </footer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Avaliacoes;