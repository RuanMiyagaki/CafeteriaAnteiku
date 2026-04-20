import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CardItem from './CardItem'; // Certifique-se que o caminho está correto
import listaDeCafes from '../data/cafes.json';

// Import das imagens (use os caminhos que já funcionam no seu projeto)
const CATEGORIAS = ["Todos", "Cafés", "Bebidas Geladas", "Especiais", "Acompanhamentos"];





function Cardapio() {
  const { usuario } = useContext(AuthContext);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const temCupom = usuario && usuario.cupom;

  // Lógica de Filtro por Categoria e Busca
  const cafesParaMostrar = listaDeCafes.filter(cafe => {
    const termo = busca.toLowerCase();
    const bateCategoria = categoriaAtiva === "Todos" || cafe.categoria === categoriaAtiva;
    const bateTexto = cafe.nome.toLowerCase().includes(termo) || cafe.desc.toLowerCase().includes(termo);
    const bateTag = cafe.tags?.some(tag => tag.includes(termo));
    
    return bateCategoria && (bateTexto || bateTag);
  }).map(cafe => ({
    ...cafe,
    precoFinal: temCupom ? cafe.preco * 0.85 : cafe.preco
  }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfaf7' }}>
      {/* 🌟 BANNER DE CABEÇALHO (Hero do Cardápio) */}
      <div 
        className="py-5 mb-5 text-center text-white" 
        style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0 0 50px 50px'
        }}
      >
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-2">Nosso Cardápio</h1>
          <p className="lead opacity-75">Sinta o aroma e o sabor da paz no 20º distrito</p>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#d4a373', margin: '20px auto' }}></div>
        </div>
      </div>

      <div className="container">
        {/* 🔍 BARRA DE BUSCA E FILTROS */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '25px' }}>
              <div className="row g-3 align-items-center">
                <div className="col-lg-4">
                  <div className="input-group bg-light rounded-pill px-3">
                    <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-transparent shadow-none" 
                      placeholder="O que deseja beber?"
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-flex gap-2 justify-content-lg-end overflow-auto pb-2">
                    {CATEGORIAS.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategoriaAtiva(cat)}
                        className={`btn btn-sm rounded-pill px-4 fw-bold transition-all ${categoriaAtiva === cat ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ☕ GRADE DE ITENS */}
        <div className="row g-4 mb-5">
          {cafesParaMostrar.length > 0 ? (
            cafesParaMostrar.map((cafe) => (
              <div className="col-12 col-md-6 col-lg-4" key={cafe.id}>
                <CardItem cafe={cafe} temCupom={temCupom} />
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-cup-hot fs-1 text-muted mb-3 d-block"></i>
              <h4 className="text-muted">Nenhum item encontrado...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cardapio;