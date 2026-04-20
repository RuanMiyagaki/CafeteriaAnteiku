import React, { useState, useEffect, useContext } from 'react'; // ✅ O segredo está aqui entre as chaves!
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cardapio from './components/Cardapio';
import CardItem from './components/CardItem';
import PainelPedidos from './components/PainelPedidos';
import CadastroUsuario from './components/CadastroPerfil/CadastroUsuario'
import EsqueciSenha from './components/CadastroPerfil/EsqueciSenha';
import RedefinirSenha from './components/CadastroPerfil/RedefinirSenha';
import LoginUsuario from './components/CadastroPerfil/LoginUsuario'
import SobreNos from './components/SobreNos';
import './App.css'; // 👈 Se o arquivo estiver na mesma pasta que o App.jsx
import Avaliacoes from './components/Avaliacoes';
import Footer from './components/Footer';
import SelecionarPersonagem from './components/SelecionarPersonagem';



// ☕ Mock de dados para a Home (Já que o CAFES original está no Cardapio.jsx)
const DESTAQUES_HOME = [
  { id: 1, nome: "Expresso Latte da Paz", preco: 7.50, desc: "O delicioso café Latte tradicional", img: "/coffes/Cafe-Latte.png", categoria: "Cafés", tags: ["leite", "doce", "suave"] },
  { id: 2, nome: "Pour Over Coffee", preco: 6.00, desc: "O bom e tradicional café coado", img: "/coffes/Pour-Over-Coffe.png", categoria: "Cafés", tags: ["forte", "preto", "quente"] },
  { id: 3, nome: "Yhoshimura Blend", preco: 4.00, desc: "O café pacífico leve e suave", img: "/coffes/Cafe-Latte.png", categoria: "Especiais", tags: ["suave", "paz", "leve"] },
  { id: 5, nome: "Drink Tea Ghoul", preco: 20.00, desc: "Chá mate de limão com morango", img: "/tea/Drink-Tea-Ghoul.png", categoria: "Bebidas Geladas", tags: ["gelado", "frio", "ice", "fruta"] },
  { id: 6, nome: "Black Goat", preco: 5.00, desc: "Café forte e sem açúcar", img: "./coffes/", categoria: "Especiais", tags: ["forte", "amargo", "preto", "intenso"] }
];

function App() {
    const { usuario, carregando } = useContext(AuthContext);
  // false = Humano (Claro) | true = Ghoul (Escuro)

  const [modoGhoul, setmodoGhoul] = useState(() => {
    const salvo = localStorage.getItem('anteiku-tema');
    return salvo ? JSON.parse(salvo) : false;
  });

  useEffect (() => {
    window.localStorage.setItem('anteiku-tema', JSON.stringify(modoGhoul));
  },[modoGhoul]);

  // Função para alternar entre os modos

  const alternarTema = () => setmodoGhoul(!modoGhoul);

  // Definimos as cores baseado no estado

 const estiloTema = {
  backgroundColor: modoGhoul ? '#1a1a1a' : '#fcfaf7', 
  color: modoGhoul ? '#ff4d4d' : '#4b2c20',
  minHeight: '100vh',
  transition: '0.5s' // 👈 Adicionei o 's' de segundos
};

  
// 2. SE ESTIVER CARREGANDO, NÃO MOSTRA AS ROTAS AINDA!
  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
        <div className="spinner-border text-danger" role="status"></div>
        <span className="ms-2 text-white fw-bold">CARREGANDO ANTEIKU...</span>
      </div>
    );
  }
  
  return (
    <CartProvider>
    <Router>
   <div style={estiloTema}>
        {/* Passamos as props para a Navbar funcionar */}
        <Navbar aoAlternar={alternarTema} modoGhoul={modoGhoul} />
     

      
      <div style={{ paddingTop: '100px' }}></div>

      <Routes>
        <Route path="/" element={
          <>
      <Hero />

    
     <main className="container py-5">
      
        <div className="text-center mb-5 mt-5">
          
          <h5 style={{ color: '#d4a373' }} className="text-uppercase">Nossa Seleção</h5>
          <h2 className="display-5 fw-bold text-white">CAFÉS ESPECIAIS</h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#d4a373', margin: '10px auto' }}></div>
        </div>
         
         <div className="row g-4">
                  {DESTAQUES_HOME.map(cafe => (
                    <div className="col-md-4" key={cafe.id}>
                      <CardItem cafe={cafe} />
                    </div>
                  ))}
                </div>
                <div className="text-center mt-5">
                  <Link to="/Cardapio" className="btn btn-outline-warning rounded-pill px-5 py-3 fw-bold">
                    VER CARDÁPIO COMPLETO
                  </Link>
                </div>
    
          <Avaliacoes/>
          <Footer/>
      </main>

</>
          } />

          
          <Route path="/SobreNos" element={<SobreNos />} />
          <Route path="/selecionar" element={<SelecionarPersonagem modoGhoul={modoGhoul} />}/>
           <Route path="/Cardapio" element={<Cardapio />} />

          {/* ROTA DA PÁGINA DE CADASTRO (Página Separada) */}
          <Route path="/cadastro" element={
            <div className="container py-5 mt-5">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <CadastroUsuario />
                </div>
              </div>
            </div>
          } />
          
            {/* ROTA DA PÁGINA DE ESQUECI SENHA */}

          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
           
           {/* ROTA DA PÁGINA DE MUDAR SENHA*/}
        
          <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />

        {/* ROTA DA PÁGINA DE LOGIN (Página Separada) */}
          <Route path="/login" element={
            <div className="container py-5 mt-5">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <LoginUsuario />
                </div>
              </div>
            </div>
          } />


{/* 🕵️ ROTA ESCONDIDA E PROTEGIDA */}
      <Route 
        path="/painel-yoshimura-secret" 
        element={
          // Só entra se o email for o seu. Se não for, volta pra Home.
          usuario?.email === 'kakashacafe@gmail.com' ? (
            <PainelPedidos />
          ) : (
            <Navigate to="/" />
          )
        } 
      />

        </Routes>




      <footer className="py-5 text-center text-white-50" style={{ backgroundColor: '#111' }}>
        <p>© 2026 Cafeteria Anteiku - Todos os direitos reservados.</p>
      </footer>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;