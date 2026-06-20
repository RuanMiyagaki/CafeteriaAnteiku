import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const BASES = [
  { id: 'espresso', nome: 'Espresso Forte', preco: 5.00, cor: '#3d2314', desc: 'Dose dupla de grãos selecionados.' },
  { id: 'mate', nome: 'Chá Mate Anteiku', preco: 6.00, cor: '#c87f28', desc: 'Infusão de ervas colhidas no Distrito 20.' },
  { id: 'leite', nome: 'Leite Vaporizado', preco: 4.50, cor: '#f8f5f0', desc: 'Leite integral vaporizado ultra cremoso.' }
];

const ADOCANTES = [
  { id: 'nenhum', nome: 'Sem Adoçar', preco: 0.00, desc: 'Sabor puro da bebida.' },
  { id: 'acucar', nome: 'Açúcar Refinado', preco: 0.50, desc: 'Adoçante tradicional.' },
  { id: 'mel', nome: 'Mel Silvestre', preco: 2.00, desc: 'Um toque natural e floral.' },
  { id: 'adocante', nome: 'Adoçante Stevia', preco: 1.00, desc: 'Zero calorias.' }
];

const EXTRAS = [
  { id: 'chantilly', nome: 'Chantilly Doce', preco: 3.00, desc: 'Nuvem de chantilly cremoso no topo.' },
  { id: 'caramelo', nome: 'Calda de Caramelo', preco: 2.50, desc: 'Fios de calda de caramelo artesanal.' },
  { id: 'cubo', nome: 'Cubo de Açúcar Yoshimura', preco: 4.00, desc: 'Cubo especial de açúcar que acalma instintos.' }
];

const GHOUL_EXTRAS = [
  { id: 'nectar', nome: 'Néctar Escarlate', preco: 8.00, cor: '#990000', desc: 'Suplemento líquido vital para o paladar Ghoul.' }
];

function MontadorBebidas({ modoGhoul }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [base, setBase] = useState(BASES[0]);
  const [adocante, setAdocante] = useState(ADOCANTES[0]);
  const [extrasSelecionados, setExtrasSelecionados] = useState([]);
  const [animando, setAnimando] = useState(false);
  const [adicionado, setAdicionado] = useState(false);

  // Lista dinâmica de extras disponíveis (Ghoul extras apenas em Ghoul Mode)
  const todosExtras = modoGhoul ? [...EXTRAS, ...GHOUL_EXTRAS] : EXTRAS;

  const handleToggleExtra = (extra) => {
    if (extrasSelecionados.some(e => e.id === extra.id)) {
      setExtrasSelecionados(extrasSelecionados.filter(e => e.id !== extra.id));
    } else {
      setExtrasSelecionados([...extrasSelecionados, extra]);
    }
  };

  // Cálculo de Preço Total
  const precoTotal = base.preco + adocante.preco + extrasSelecionados.reduce((sum, e) => sum + e.preco, 0);

  // Lógica de Renderização Visual da Altura da Bebida
  const temExtra = extrasSelecionados.length > 0;
  const alturaLiquido = base ? (temExtra ? '85%' : '65%') : '0%';
  
  // Cor final do líquido (se tem néctar escarlate, puxa uma tonalidade mais escura/vermelha)
  const temNectar = extrasSelecionados.some(e => e.id === 'nectar');
  const corLiquido = temNectar ? '#751010' : base.cor;

  const handleAdicionarAoCarrinho = () => {
    setAnimando(true);
    
    // Constrói descrição rica da bebida
    const descBebida = `Bebida personalizada (Base: ${base.nome}, Adoçante: ${adocante.nome}${extrasSelecionados.length > 0 ? `, Extras: ${extrasSelecionados.map(e => e.nome).join(', ')}` : ''})`;
    
    addToCart({
      id: Date.now(), // Gera um ID único dinâmico para não colidir com o cardápio
      nome: modoGhoul ? 'Bebida Customizada Ghoul 🩸' : 'Bebida Customizada Humana ☕',
      preco: precoTotal,
      desc: descBebida,
      img: temNectar ? 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop',
      categoria: 'Especiais',
      tags: ['personalizado', modoGhoul ? 'ghoul' : 'humano']
    });

    setTimeout(() => {
      setAnimando(false);
      setAdicionado(true);
      setTimeout(() => {
        setAdicionado(false);
        navigate('/');
      }, 1200);
    }, 1000);
  };

  return (
    <div className="pb-5 main-content-spacer transition-all" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text-main)' }}>
      <div className="container py-4">
        
        {/* TÍTULO */}
        <div className="text-center mb-5">
          <h5 className="text-uppercase fw-bold" style={{ color: 'var(--theme-accent)', letterSpacing: '4px', fontSize: '0.9rem' }}>Laboratório Anteiku</h5>
          <h2 className="responsive-title fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {modoGhoul ? 'PREPARE SEU ANTÍDOTO OU CAFÉ' : 'MONTE SUA BEBIDA PERFEITA'}
          </h2>
          <p className="lead text-muted" style={{ fontSize: '1rem' }}>Combine ingredientes selecionados pelo Gerente Yoshimura para criar seu blend único.</p>
          <div style={{ width: '80px', height: '3.5px', backgroundColor: 'var(--theme-accent)', margin: '15px auto', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-5 align-items-stretch">
          
          {/* SIMULADOR VISUAL (ESQUERDA) */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center">
            <div 
              className="card border-0 p-5 w-100 d-flex flex-column align-items-center justify-content-center"
              style={{ 
                backgroundColor: 'var(--theme-bg-card)', 
                border: '1px solid var(--theme-border)',
                borderRadius: '30px',
                boxShadow: 'var(--theme-shadow)',
                minHeight: '480px'
              }}
            >
              
              {/* ESTRUTURA DO COPO (CSS) */}
              <div 
                className="position-relative d-flex align-items-end justify-content-center shadow-inner"
                style={{
                  width: '160px',
                  height: '260px',
                  border: `4px solid ${modoGhoul ? 'rgba(255, 77, 77, 0.4)' : 'rgba(181, 131, 90, 0.4)'}`,
                  borderBottomWidth: '12px',
                  borderRadius: '15px 15px 40px 40px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  overflow: 'hidden',
                  backdropFilter: 'blur(3px)'
                }}
              >
                
                {/* LÍQUIDO DENTRO DO COPO */}
                <div 
                  className="w-100 transition-all duration-500 ease-in-out position-relative"
                  style={{
                    height: alturaLiquido,
                    backgroundColor: corLiquido,
                    borderRadius: '0 0 30px 30px',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  
                  {/* ANIMAÇÃO DE FLUTUAÇÃO DE ESPUMA */}
                  <div className="w-100 position-absolute top-0 start-0" style={{
                    height: '10px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    filter: 'blur(2px)'
                  }}></div>
                  
                </div>

                {/* VISUAL EXTRAS: CHANTILLY (Topo) */}
                {extrasSelecionados.some(e => e.id === 'chantilly') && (
                  <div 
                    className="position-absolute animate__animated animate__fadeInDown"
                    style={{
                      top: '15px',
                      width: '130px',
                      height: '45px',
                      backgroundColor: '#fefefe',
                      borderRadius: '30px 30px 10px 10px',
                      boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
                      border: '1.5px solid rgba(200,200,200,0.1)',
                      zIndex: 5
                    }}
                  />
                )}

                {/* VISUAL EXTRAS: CALDA DE CARAMELO */}
                {extrasSelecionados.some(e => e.id === 'caramelo') && (
                  <div 
                    className="position-absolute w-100"
                    style={{
                      top: '55px',
                      height: '80px',
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 15px, #c08535 15px, #c08535 18px)',
                      opacity: 0.6,
                      zIndex: 4
                    }}
                  />
                )}

                {/* VISUAL EXTRAS: CUBO DE AÇÚCAR */}
                {extrasSelecionados.some(e => e.id === 'cubo') && (
                  <div 
                    className="position-absolute bg-white border border-light animate__animated animate__bounceInDown"
                    style={{
                      bottom: '25px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                      zIndex: 6,
                      transform: 'rotate(15deg)'
                    }}
                  />
                )}
                
              </div>

              {/* ROTULAGEM DE PREÇO */}
              <div className="mt-4 text-center">
                <span className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Preço Estimado</span>
                <h3 className="fw-bold mt-1" style={{ color: 'var(--theme-accent)' }}>R$ {precoTotal.toFixed(2)}</h3>
              </div>
              
            </div>
          </div>

          {/* PAINEL DE CONTROLE (DIREITA) */}
          <div className="col-lg-7">
            <div 
              className="card border-0 p-4 p-md-5 text-start"
              style={{ 
                backgroundColor: 'var(--theme-bg-card)', 
                border: '1px solid var(--theme-border)',
                borderRadius: '30px',
                boxShadow: 'var(--theme-shadow)',
                height: '100%'
              }}
            >
              {/* PASSO 1: ESCOLHER BASE */}
              <div className="mb-4">
                <h5 className="fw-bold d-flex align-items-center gap-2 mb-3">
                  <span className="badge rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px', backgroundColor: 'var(--theme-accent)', color: '#fff', fontSize: '0.8rem' }}>1</span>
                  Escolha a Base da Bebida
                </h5>
                <div className="row g-3">
                  {BASES.map(b => (
                    <div className="col-md-4" key={b.id}>
                      <button
                        type="button"
                        onClick={() => setBase(b)}
                        className="btn w-100 text-start p-3 h-100 transition-all rounded-3"
                        style={{
                          border: `2px solid ${base.id === b.id ? 'var(--theme-accent)' : 'var(--theme-border)'}`,
                          backgroundColor: base.id === b.id ? 'rgba(181, 131, 90, 0.05)' : 'transparent',
                          color: 'var(--theme-text-main)'
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="fw-bold small">{b.nome}</span>
                          <span className="badge rounded-pill bg-secondary-subtle text-dark" style={{ fontSize: '0.7rem' }}>+ R$ {b.preco.toFixed(2)}</span>
                        </div>
                        <p className="small text-muted mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{b.desc}</p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* PASSO 2: ESCOLHER ADOÇANTE */}
              <div className="mb-4">
                <h5 className="fw-bold d-flex align-items-center gap-2 mb-3">
                  <span className="badge rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px', backgroundColor: 'var(--theme-accent)', color: '#fff', fontSize: '0.8rem' }}>2</span>
                  Adoçante de Preferência
                </h5>
                <div className="row g-3">
                  {ADOCANTES.map(a => (
                    <div className="col-md-6 col-lg-3" key={a.id}>
                      <button
                        type="button"
                        onClick={() => setAdocante(a)}
                        className="btn w-100 text-start p-3 h-100 transition-all rounded-3"
                        style={{
                          border: `2px solid ${adocante.id === a.id ? 'var(--theme-accent)' : 'var(--theme-border)'}`,
                          backgroundColor: adocante.id === a.id ? 'rgba(181, 131, 90, 0.05)' : 'transparent',
                          color: 'var(--theme-text-main)'
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="fw-bold small">{a.nome}</span>
                        </div>
                        <p className="small text-muted mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{a.preco > 0 ? `+ R$ ${a.preco.toFixed(2)}` : 'Incluso'}</p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* PASSO 3: EXTRAS ADICIONAIS */}
              <div className="mb-5">
                <h5 className="fw-bold d-flex align-items-center gap-2 mb-3">
                  <span className="badge rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px', backgroundColor: 'var(--theme-accent)', color: '#fff', fontSize: '0.8rem' }}>3</span>
                  Adicionais Extras {modoGhoul && <span className="text-danger fw-bold">(Exclusivos Ghoul Ativos)</span>}
                </h5>
                <div className="row g-3">
                  {todosExtras.map(e => {
                    const ativo = extrasSelecionados.some(sel => sel.id === e.id);
                    return (
                      <div className="col-md-6" key={e.id}>
                        <button
                          type="button"
                          onClick={() => handleToggleExtra(e)}
                          className="btn w-100 text-start p-3 h-100 transition-all rounded-3"
                          style={{
                            border: `2px solid ${ativo ? (e.id === 'nectar' ? '#ff3333' : 'var(--theme-accent)') : 'var(--theme-border)'}`,
                            backgroundColor: ativo ? 'rgba(181, 131, 90, 0.05)' : 'transparent',
                            color: 'var(--theme-text-main)'
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className={`fw-bold small ${e.id === 'nectar' ? 'text-danger' : ''}`}>{e.nome}</span>
                            <span className="badge rounded-pill bg-secondary-subtle text-dark" style={{ fontSize: '0.7rem' }}>+ R$ {e.preco.toFixed(2)}</span>
                          </div>
                          <p className="small text-muted mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{e.desc}</p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOTÕES DE AÇÃO */}
              <div className="mt-auto d-flex flex-column gap-3">
                <button
                  onClick={handleAdicionarAoCarrinho}
                  className={`btn py-3 w-100 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all ${adicionado ? 'btn-success' : 'btn-dark'}`}
                  disabled={animando || adicionado}
                  style={{
                    borderRadius: '16px',
                    fontSize: '1rem',
                    backgroundColor: adicionado ? '#27ae60' : 'var(--theme-text-main)',
                    color: adicionado ? '#fff' : 'var(--theme-bg)',
                    border: 'none',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  {animando ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Misturando ingredientes...
                    </>
                  ) : adicionado ? (
                    <>
                      <i className="bi bi-check-circle-fill"></i>
                      Bebida Adicionada! Redirecionando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-bag-plus-fill fs-5"></i>
                      ADICIONAR BEBIDA PERSONALIZADA R$ {precoTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MontadorBebidas;
