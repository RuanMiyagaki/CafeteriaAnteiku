import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CarrinhoLateral from './CarrinhoLateral'; // 👈 Adicione isso lá nas primeiras linhas!
import { PointsContext } from '../context/PointsContext';
import ProfileHeader from './ProfileHeader';

function Navbar({ aoAlternar, modoGhoul }) {
  const { usuario } = useContext(AuthContext);
  const { pontos } = useContext(PointsContext);
  
  // 🐛 O ERRO ESTAVA AQUI: Faltava puxar o cart, valorTotal e removeFromCart do contexto!
  const { cart, totalItens, valorTotal, removeFromCart } = useCart();
  
  const location = useLocation();

  // Função para verificar se o link está ativo (para estilizar o menu)
  const isAtivo = (path) => location.pathname === path;

  const btnStyle = {
    backgroundColor: modoGhoul ? 'rgba(255, 77, 77, 0.08)' : 'rgba(212, 163, 115, 0.12)',
    color: modoGhoul ? '#ff4d4d' : 'var(--theme-accent)',
    backdropFilter: 'blur(5px)',
    border: `1px solid ${modoGhoul ? 'rgba(255,77,77,0.2)' : 'rgba(212,163,115,0.3)'}`
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top custom-navbar ${modoGhoul ? 'ghoul-mode' : 'human-mode'}`}>
        <div className="container-fluid px-4 px-md-5 d-flex align-items-center">
          
          {/* LOGO - Com espaçamento de grife e alinhamento forçado */}
          <Link className="navbar-brand logo-anteiku fw-bold d-flex align-items-center m-0 p-0" to="/" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1.5px', fontSize: '1.4rem' }}>
            <span style={{ color: 'var(--theme-accent)', marginRight: '6px' }}>ANTEIKU</span>
            <span className={modoGhoul ? 'text-white' : 'text-dark'}>COFFEE</span>
          </Link>

          {/* MOBILE TOGGLER */}
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <i className={`bi bi-grid-fill ${modoGhoul ? 'text-danger' : 'text-warning'}`}></i>
          </button>
          
          <div className="collapse navbar-collapse align-items-center" id="navbarNav">
  {/* 1. LINKS CENTRAIS */}
  <ul className="navbar-nav mx-auto gap-4 align-items-center mb-0">
              <li className="nav-item">
                <Link className={`nav-link custom-link m-0 ${isAtivo('/') ? 'active' : ''} ${modoGhoul ? 'text-light' : 'text-dark'}`} to="/">HOME</Link>
              </li>
              
              {usuario?.email === 'kakashacafe@gmail.com' && (
                <li className="nav-item">
                  <Link to="/painel-yoshimura-secret" className={`nav-link custom-link m-0 ${modoGhoul ? 'text-light' : 'text-dark'}`}>
                    ☕ PAINEL
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className={`nav-link custom-link m-0 ${isAtivo('/Cardapio') ? 'active' : ''} ${modoGhoul ? 'text-light' : 'text-dark'}`} to="/Cardapio">CARDÁPIO</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-link m-0 ${isAtivo('/montador') ? 'active' : ''} ${modoGhoul ? 'text-light' : 'text-dark'}`} to="/montador">MONTADOR</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-link m-0 ${isAtivo('/SobreNos') ? 'active' : ''} ${modoGhoul ? 'text-light' : 'text-dark'}`} to="/SobreNos">SOBRE NÓS</Link>
              </li>
              {!usuario && (
                <li className="nav-item">
                  <Link className={`nav-link custom-link m-0 ${isAtivo('/cadastro') ? 'active' : ''} ${modoGhoul ? 'text-light' : 'text-dark'}`} to="/cadastro">CADASTRE-SE</Link>
                </li>
              )}
            </ul>

            {/* 2. GRUPO DE AÇÕES (DIREITA) */}
            <div className="d-flex align-items-center justify-content-lg-end gap-3 gap-lg-4">
              
              {/* TOGGLE MODO */}
              <button 
                onClick={aoAlternar} 
                className="btn rounded-circle d-flex align-items-center justify-content-center p-0 transition-all hover-glow"
                style={{ ...btnStyle, width: '42px', height: '42px' }}
                title={modoGhoul ? "Voltar ao normal" : "Ativar instinto"}
              >
                {modoGhoul ? <i className="bi bi-eye-fill fs-5"></i> : <i className="bi bi-cup-hot-fill fs-5"></i>}
              </button>

              {/* LINK RECOMPENSAS */}
              {usuario && (
                 <Link 
                   to="/recompensas" 
                   className="btn rounded-pill px-4 d-flex align-items-center gap-2 text-decoration-none transition-all hover-glow"
                   style={{ ...btnStyle, height: '42px', fontSize: '0.9rem', fontWeight: '600' }}
                 >
                   <span>Recompensas</span>
                   <i className="bi bi-star-fill" style={{ fontSize: '1.1rem' }}></i>
                 </Link>
              )}

              {/* CARRINHO */}
              <button 
                className="btn border-0 position-relative p-0 d-flex align-items-center justify-content-center hover-glow" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#menuPedidos"
                style={{ color: modoGhoul ? '#ff4d4d' : 'var(--theme-accent)', width: '42px', height: '42px' }}
              >
                <i className="bi bi-bag-fill fs-4"></i>
                {totalItens > 0 && (
                  <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${modoGhoul ? 'bg-danger' : 'bg-warning text-dark'}`} style={{ fontSize: '0.7rem', transform: 'translate(-30%, -20%)' }}>
                    {totalItens}
                  </span>
                )}
              </button>

              {/* PERFIL */}
              <div className={`profile-wrapper d-flex align-items-center ${modoGhoul ? 'glow-ghoul' : 'glow-human'}`}>
                <ProfileHeader modoGhoul={modoGhoul} />
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* GAVETA DE PEDIDOS (Intacta) */}
     <div className="offcanvas offcanvas-end" tabIndex="-1" id="menuPedidos" 
           style={{ backgroundColor: modoGhoul ? '#121212' : '#fcfaf7', color: modoGhoul ? '#fff' : '#2c1e16', width: '400px', borderLeft: `1px solid ${modoGhoul ? 'rgba(255,77,77,0.2)' : 'rgba(212,163,115,0.3)'}` }}>
        
        <div className="offcanvas-header p-4" style={{ borderBottom: `1px solid ${modoGhoul ? 'rgba(255,77,77,0.1)' : 'rgba(212,163,115,0.2)'}` }}>
          <h5 className="offcanvas-title fw-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>
            <i className="bi bi-bag-check-fill me-2" style={{ color: modoGhoul ? '#ff4d4d' : 'var(--theme-accent)' }}></i>
            Sua Sacola
          </h5>
          <button type="button" className={`btn-close ${modoGhoul ? 'btn-close-white' : ''} shadow-none`} data-bs-dismiss="offcanvas"></button>
        </div>

        {/* 👇 A MÁGICA ACONTECE AQUI: Chamamos o seu componente que tem o botão do PIX! 👇 */}
        <div className="offcanvas-body p-0">
           <CarrinhoLateral />
        </div>

      </div>
    </>
  );
}
     


export default Navbar;