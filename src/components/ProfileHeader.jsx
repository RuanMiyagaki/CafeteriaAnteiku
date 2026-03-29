import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; // 👈 IMPORTANTE: Adicionamos o Link do React Router
import {AuthContext} from '../context/AuthContext';

function ProfileHeader({ modoGhoul }) {

  const {usuario: usuarioLogado, logout: deslogarSistema } = useContext(AuthContext); 
  const [personagem, setPersonagem] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    // Busca os dados do personagem que foram salvos no cadastro
    const dadosSalvos = localStorage.getItem('usuario_anteiku');
    if (dadosSalvos) {
      setPersonagem(JSON.parse(dadosSalvos));
    }
  }, []);

  const logout = () => {
    // Removemos tanto o personagem quanto o login do sistema por segurança
    localStorage.removeItem('usuario_anteiku');
    deslogarSistema(); // Usa a função do seu AuthContext para limpar o login
    window.location.reload();
  };

  return (
    // Adicionei d-flex e align-items-center para o texto ficar alinhado com o botão
    <div className="position-relative ms-3 d-flex align-items-center">
      
      {usuarioLogado ? (
        // ✅ SE Está logado
        <>
        {personagem ? (
          // Situação A: Logado E escolheu personagem (Mostra a foto)
          <img 
            src={modoGhoul ? personagem.imgGhoul : personagem.imgHumano}
            alt="Perfil"
            onClick={() => setMenuAberto(!menuAberto)}
            style={{ width: '40px', height: '40px', cursor: 'pointer', border: `2px solid ${modoGhoul ? '#ff4d4d' : '#d4a373'}` }}
            className="rounded-circle shadow-sm"
          />

          ) : (

            // Situação B: Logado, mas AINDA NÃO escolheu personagem (Mostra ícone cinza)
            <div 
              onClick={() => window.location.href = "/selecionar"}
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: '40px', height: '40px', cursor: 'pointer', border: '2px solid #ccc' }}
              title="Escolher Personagem"
            >
              <i className="bi bi-person text-white"></i>
            </div>
          )}
          
          {/* Menu Dropdown (Sair / Alterar) */}
          {menuAberto && (
            <div className="position-absolute end-0 mt-2 p-2 shadow rounded" 
                 style={{ backgroundColor: modoGhoul ? '#1a1a1a' : '#fff', minWidth: '150px', zIndex: 1000, top: '45px' }}>
              <button className="btn btn-sm w-100 text-start" onClick={() => window.location.href = "/selecionar"}>
                🔄 Alterar Imagem
              </button>
              <hr className="my-1" />
              <button className="btn btn-sm w-100 text-start text-danger" onClick={logout}>
                🚪 Sair
              </button>
            </div>
          )}
        </>
      ) : (
        // ✅ SE NÃO EXISTE USUÁRIO: Mostra o link de Entrar
        <Link 
          to="/login" 
          className="nav-link fw-bold" 
          style={{ color: '#d4a373', whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
          Entrar
        </Link>
      )}
    </div>
  );
}

export default ProfileHeader;