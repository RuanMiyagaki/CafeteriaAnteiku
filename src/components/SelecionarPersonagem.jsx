import React from 'react';
import { useNavigate } from 'react-router-dom';

// Lista de personagens expandida e intuitiva
const Personagens = [
  { 
    id: 1, 
    nome: "Kaneki Ken", 
    imgHumano: "/Personagens/Kaneki-Humano.png", 
    imgGhoul: "/Personagens/Kaneki-Ghoul.png", 
    tagline: "O Rei de um Olho",
    desc: "Um jovem que busca o equilíbrio entre dois mundos."
  },
  { 
    id: 2, 
    nome: "Touka Kirishima", 
    imgHumano: "/Personagens/Touka-Humana.png", 
    imgGhoul: "/Personagens/Touka-Ghoul.png", 
    tagline: "O Coelho da Anteiku",
    desc: "Forte e protetora, ela cuida daqueles que ama."
  },
  { 
    id: 3, 
    nome: "Hinami Fueguchi", 
    imgHumano: "/Personagens/Hinami-Humana.png", 
    imgGhoul: "/Personagens/Hinami-Ghoul.png", 
    tagline: "A Irmãzinha de Kaneki",
    desc: "Gentil e inteligente, possui um potencial incrível."
  },
  { 
    id: 4, 
    nome: "Yoshimura", 
    imgHumano: "/Personagens/Yoshimura-Humano.png", 
    imgGhoul: "/Personagens/Yoshimura-Ghoul.png", 
    tagline: "O Gerente",
    desc: "O pilar de paz que fundou a cafeteria Anteiku."
  }
];

function SelecionarPersonagem({ modoGhoul }) {
  const navigate = useNavigate();

  const selecionarPerfil = (p) => {
    // Salva o objeto completo do personagem no LocalStorage
    localStorage.setItem('usuario_anteiku', JSON.stringify(p)); 
    
    // Redireciona para a Home
    navigate("/"); 
    
    // Recarrega para que todos os componentes (como a Navbar) atualizem a foto
    window.location.reload(); 
  };

  return (
    <div className="container py-5 main-content-spacer transition-all" style={{ color: 'var(--theme-text-main)' }}>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-center mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          QUEM É VOCÊ NA ANTEIKU?
        </h1>
        <p className="lead" style={{ color: 'var(--theme-text-muted)' }}>Escolha sua identidade para navegar na cafeteria</p>
        <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--theme-accent)', margin: '20px auto', borderRadius: '2px' }}></div>
      </div>

      <div className="row g-4 justify-content-center">
        {Personagens.map(p => (
          <div key={p.id} className="col-sm-12 col-md-6 col-lg-3">
            <div 
              className="card h-100 border-0 text-center overflow-hidden shadow-sm" 
              style={{ 
                backgroundColor: 'var(--theme-bg-card)', 
                color: 'var(--theme-text-main)',
                cursor: 'pointer', 
                transition: 'all 0.3s ease-in-out',
                borderRadius: '25px',
                border: '2px solid var(--theme-border)'
              }}
              onClick={() => selecionarPerfil(p)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.borderColor = 'var(--theme-accent)';
                e.currentTarget.style.boxShadow = modoGhoul 
                  ? '0 15px 35px rgba(255, 51, 51, 0.25)' 
                  : '0 15px 35px rgba(212, 163, 115, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--theme-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="p-4 d-flex justify-content-center">
                <div className="position-relative">
                  <img 
                    src={modoGhoul ? p.imgGhoul : p.imgHumano} 
                    className="rounded-circle shadow" 
                    style={{ 
                      width: '160px', 
                      height: '160px', 
                      objectFit: 'cover', 
                      border: '5px solid var(--theme-border)' 
                    }} 
                    alt={p.nome} 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/160?text=Avatar'; }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-person-check-fill text-dark fs-5"></i>
                  </div>
                </div>
              </div>
              
              <div className="card-body pt-0 px-4 pb-4">
                <h4 className="fw-bold mb-1" style={{ color: 'var(--theme-text-main)' }}>{p.nome}</h4>
                <p className="small text-uppercase fw-bold mb-3" style={{ letterSpacing: '1px', color: 'var(--theme-accent)' }}>
                  {p.tagline}
                </p>
                <p className="small mb-4 text-muted" style={{ minHeight: '40px', opacity: 0.85 }}>
                  {p.desc}
                </p>
                <button 
                  className="btn w-100 rounded-pill fw-bold py-2"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: '#fff',
                    border: 'none',
                    transition: 'opacity 0.2s'
                  }}
                >
                  SELECIONAR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button 
          onClick={() => navigate('/')}
          className="btn btn-link text-decoration-none"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          Desejo continuar sem perfil por enquanto
        </button>
      </div>
    </div>
  );
}

export default SelecionarPersonagem;