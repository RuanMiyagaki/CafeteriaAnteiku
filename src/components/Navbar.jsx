import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProfileHeader from './ProfileHeader';
import CarrinhoLateral from './CarrinhoLateral';

function Navbar({ aoAlternar, modoGhoul }) {
  const { totalItens } = useCart();
  const location = useLocation();

  // Função para verificar se o link está ativo (para estilizar o menu)
  const isAtivo = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top custom-navbar ${modoGhoul ? 'ghoul-mode' : 'human-mode'}`}>
        <div className="container px-lg-4">
          
          {/* ☕ LOGO */}
          <Link className="navbar-brand logo-anteiku" to="/">
            <span className="brand-accent">ANTEIKU</span>
            <span className="brand-main text-white">COFFEE</span>
          </Link>

          {/* 📱 MOBILE TOGGLER */}
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <i className={`bi bi-grid-fill ${modoGhoul ? 'text-danger' : 'text-warning'}`}></i>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* 1. LINKS CENTRAIS */}
            <ul className="navbar-nav mx-auto gap-2">
              <li className="nav-item">
                <Link className={`nav-link custom-link ${isAtivo('/') ? 'active' : ''}`} to="/">HOME</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-link ${isAtivo('/Cardapio') ? 'active' : ''}`} to="/Cardapio">CARDÁPIO</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-link ${isAtivo('/SobreNos') ? 'active' : ''}`} to="/SobreNos">SOBRE NÓS</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link custom-link ${isAtivo('/cadastro') ? 'active' : ''}`} to="/cadastro">CADASTRE-SE</Link>
              </li>
            </ul>

            {/* 2. GRUPO DE AÇÕES (DIREITA) */}
            <div className="d-flex align-items-center gap-3 actions-group">
              
              {/* 🔍 BUSCA MINIMALISTA */}
              <div className="search-box d-none d-xl-flex">
                <i className="bi bi-search search-icon"></i>
                <input type="text" placeholder="Buscar sabor..." className="search-input" />
              </div>

              {/* 👁️ TOGGLE MODO */}
              <button 
                onClick={aoAlternar} 
                className={`mode-toggle-btn ${modoGhoul ? 'is-ghoul' : 'is-human'}`}
                title={modoGhoul ? "Voltar ao normal" : "Ativar instinto"}
              >
                {modoGhoul ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-cup-hot-fill"></i>}
                <span className="d-none d-sm-inline ms-1">{modoGhoul ? 'GHOUL' : 'HUMANO'}</span>
              </button>

              {/* 🛍️ CARRINHO */}
              <button 
                className="cart-btn position-relative" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#menuPedidos"
              >
                <i className="bi bi-bag-heart-fill"></i>
                {totalItens > 0 && (
                  <span className="cart-badge animate__animated animate__bounceIn">
                    {totalItens}
                  </span>
                )}
              </button>

              <ProfileHeader modoGhoul={modoGhoul} />
            </div>
          </div>
        </div>
      </nav>

      {/* OFFCANVAS (Sem alterações aqui, ele já está bom) */}
      <div className="offcanvas offcanvas-end custom-offcanvas" tabIndex="-1" id="menuPedidos" style={{ 
        backgroundColor: modoGhoul ? '#0a0a0a' : '#fcfaf7', 
        color: modoGhoul ? '#ff4d4d' : '#2c1e16',
        borderLeft: `3px solid ${modoGhoul ? '#ff4d4d' : '#d4a373'}` 
      }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold"><i className="bi bi-bag-check-fill me-2"></i>SUA SACOLA</h5>
          <button type="button" className={`btn-close ${modoGhoul ? 'btn-close-white' : ''}`} data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <CarrinhoLateral />
        </div>
      </div>
    </>
  );
}

export default Navbar;