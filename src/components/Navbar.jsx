import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProfileHeader from './ProfileHeader';
import CarrinhoLateral from './CarrinhoLateral';

function Navbar ( { aoAlternar, modoGhoul } ) {
  const { totalItens } = useCart();

  

return(
  <>
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-3"
      style={{ 
           backgroundColor: modoGhoul ? 'rgba(20, 0, 0, 0.9)' : 'rgba(0,0,0,0.8)', 
           backdropFilter: 'blur(10px)',
           transition: '0.5s'
         }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span style={{color: modoGhoul ? '#ff4d4d' : '#d4a373'}}>ANTEIKU</span>COFEE
       </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">

            <li className="nav-item"> 
              <Link className="nav-link" to="/">HOME</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cadastro">CADASTRE-SE</Link></li>
            <li className="nav-item"><Link className="nav-link" to="Cardapio">Cardápio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/SobreNos">Sobre Nós</Link></li>
              
              
        {/* BOTÃO MODO GHOUL */}
            <li className="nav-item d-flex align-items-center gap-2">
              <button 
                onClick={aoAlternar} 
                className={`btn btn-sm rounded-pill ${modoGhoul ? 'btn-danger' : 'btn-outline-warning'}`}
                style={{ transition: '0.3s' }}
              >
                {modoGhoul ? '👁️ MODO GHOUL' : '☕ MODO HUMANO'}
                
              </button>
              {/* 🛍️ BOTÃO: MEUS PEDIDOS (SACOLA) */}
<button 
  className="btn border-0 d-flex align-items-center gap-2 px-2 py-1 transition-all" 
  data-bs-toggle="offcanvas" 
  data-bs-target="#menuPedidos"
  style={{ color: modoGhoul ? '#ff4d4d' : '#d4a373', backgroundColor: 'transparent', borderRadius: '10px' }}
>
  <div className="position-relative d-flex align-items-center">
  <i className="bi bi-bag-heart fs-4"></i>
 
  {totalItens > 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                      style={{ fontSize: '0.6rem', border: `2px solid ${modoGhoul ? '#1a0000' : '#111'}` }}
                    >
                      {totalItens}
                    </span>
                  )}
                  </div>
                  <span className="d-none d-xl-inline fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                  Meus Pedidos
                </span>
</button>

              
               <ProfileHeader modoGhoul={modoGhoul} />
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* 🛒 GAVETA LATERAL (OFFCANVAS) - COLOQUE LOGO ABAIXO DO </nav> */}
    <div 
      className="offcanvas offcanvas-end" 
      tabIndex="-1" 
      id="menuPedidos" 
      aria-labelledby="menuPedidosLabel"
      style={{ 
        backgroundColor: modoGhoul ? '#121212' : '#fcfaf7', 
        color: modoGhoul ? '#fff' : '#2c1e16',
        borderLeft: `2px solid ${modoGhoul ? '#ff4d4d' : '#d4a373'}` 
      }}
    >
      <div className="offcanvas-header border-bottom border-secondary-subtle">
        <h5 className="offcanvas-title fw-bold" id="menuPedidosLabel">
          <i className="bi bi-bag-check me-2"></i>SUA SACOLA
        </h5>
        <button 
          type="button" 
          className={`btn-close ${modoGhoul ? 'btn-close-white' : ''}`} 
          data-bs-dismiss="offcanvas" 
          aria-label="Close"
        ></button>
      </div>
      
      <div className="offcanvas-body p-0">
        {/* Aqui chamamos o seu componente que mostra os itens */}
        <CarrinhoLateral />
      </div>
    </div>
    
    </>
    
  );
  
}
export default Navbar;