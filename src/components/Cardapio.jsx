import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PointsContext } from '../context/PointsContext';
import CardItem from './CardItem';
import listaDeCafes from '../data/cafes.json';

const CATEGORIAS = ["Todos", "Cafés", "Bebidas Geladas", "Especiais", "Acompanhamentos"];

function Cardapio() {
  const { usuario } = useContext(AuthContext);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  const temCupom = usuario && usuario.cupom;

  // Lógica de Filtro otimizada com useMemo para performance excelente de TI
  const cafesParaMostrar = useMemo(() => {
    return listaDeCafes.filter(cafe => {
      const termo = busca.toLowerCase();
      const bateCategoria = categoriaAtiva === "Todos" || cafe.categoria === categoriaAtiva;
      const bateTexto = cafe.nome.toLowerCase().includes(termo) || cafe.desc.toLowerCase().includes(termo);
      const bateTag = cafe.tags?.some(tag => tag.toLowerCase().includes(termo));
      
      return bateCategoria && (bateTexto || bateTag);
    }).map(cafe => ({
      ...cafe,
      precoFinal: temCupom ? cafe.preco * 0.85 : cafe.preco
    }));
  }, [busca, categoriaAtiva, temCupom]);

  return (
    <div className="pb-5 main-content-spacer">
      
      {/* 🌟 HERO DO CARDÁPIO (Com overlay responsivo) */}
      <div 
        className="py-5 mb-5 text-center text-white" 
        style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0 0 40px 40px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
        }}
      >
        <div className="container py-4">
          <h1 className="responsive-title mb-2">CARDÁPIO ANTEIKU</h1>
          <p className="responsive-subtitle opacity-75">Sinta o aroma e o sabor da paz no 20º distrito</p>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--theme-accent)', margin: '20px auto', borderRadius: '2px' }}></div>
        </div>
      </div>

      <div className="container">
        {/* 🔍 BARRA DE BUSCA E FILTROS PREMIUM */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-11 col-lg-10">
            <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: '24px', backgroundColor: 'var(--theme-bg-card)', border: '1px solid var(--theme-border)' }}>
              <div className="row g-3 align-items-center">
                <div className="col-md-12 col-lg-4">
                  <div className="input-group rounded-pill px-3 py-1" style={{ backgroundColor: 'rgba(150, 150, 150, 0.08)', border: '1px solid var(--theme-border)' }}>
                    <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-transparent shadow-none" 
                      placeholder="O que deseja saborear?"
                      style={{ color: 'var(--theme-text-main)', fontSize: '0.95rem' }}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-8">
                  <div className="d-flex gap-2 justify-content-lg-end overflow-auto pb-2 scrollbar-none">
                    {CATEGORIAS.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategoriaAtiva(cat)}
                        className={`btn btn-sm rounded-pill px-4 fw-bold transition-all`}
                        style={{
                          whiteSpace: 'nowrap',
                          backgroundColor: categoriaAtiva === cat ? 'var(--theme-accent)' : 'transparent',
                          color: categoriaAtiva === cat ? '#fff' : 'var(--theme-text-muted)',
                          border: `1.5px solid ${categoriaAtiva === cat ? 'var(--theme-accent)' : 'var(--theme-border)'}`
                        }}
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

        {/* ☕ GRADE DE ITENS REDESENHADA */}
        <div className="row g-4 mb-5 justify-content-center">
          {cafesParaMostrar.length > 0 ? (
            cafesParaMostrar.map((cafe) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={cafe.id}>
                <CardItem cafe={cafe} temCupom={temCupom} />
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-cup-hot display-2 text-muted mb-3 d-block opacity-25"></i>
              <h4 className="text-muted fw-light">Nenhuma iguaria encontrada na Anteiku...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cardapio;