import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CardItem from './CardItem'; // Certifique-se que o caminho está correto

// Import das imagens (use os caminhos que já funcionam no seu projeto)


const CAFES = [
  { id: 1, nome: "Expresso Latte da Paz", preco: 7.50, desc: "O delicioso café Latte tradicional", img: "/coffes/Cafe-Latte.png", categoria: "Cafés", tags: ["leite", "doce", "suave"] },
  { id: 2, nome: "Pour Over Coffee", preco: 6.00, desc: "O bom e tradicional café coado", img: "/coffes/Pour-Over-Coffe.png", categoria: "Cafés", tags: ["forte", "preto", "quente"] },
  { id: 3, nome: "Yhoshimura Blend", preco: 4.00, desc: "O café pacífico leve e suave", img: "/coffes/Cafe-Latte.png", categoria: "Especiais", tags: ["suave", "paz", "leve"] },
  { id: 4, nome: "Drink Tea Ghoul", preco: 20.00, desc: "Chá mate de limão com morango", img: "/tea/Drink-Tea-Ghoul.png", categoria: "Bebidas Geladas", tags: ["gelado", "frio", "ice", "fruta"] },
  { id: 5, nome: "Black Goat", preco: 5.00, desc: "Café forte e sem açúcar", img: "./coffes/", categoria: "Especiais", tags: ["forte", "amargo", "preto", "intenso"] },
{ id: 6, nome: "Vanilla Latte", preco: 14.00, desc: "Espresso suave com leite vaporizado e um toque de baunilha.", img: "/coffes/vanilla-latte.png", categoria: "Cafés", tags: ["baunilha", "doce", "suave"] },
  { id: 7, nome: "Espresso Con Panna", preco: 8.50, desc: "Dose de espresso finalizada com uma generosa nuvem de chantilly.", img: "/coffes/con-panna.png", categoria: "Cafés", tags: ["forte", "doce", "chantilly"] },

  // --- GELADOS E FRAPPÉS (PASTA: /coffes/ ou /gelados/) ---
  { id: 8, nome: "Java Chip Frappuccino", preco: 19.50, desc: "Café batido com gelo, chocolate e pedaços crocantes de chocolate.", img: "/coffes/java-chip.png", categoria: "Bebidas Geladas", tags: ["gelado", "chocolate", "crocante"] },
  { id: 9, nome: "Caramel Frappuccino", preco: 18.50, desc: "Blend de café, leite e gelo com muito caramelo e chantilly.", img: "/coffes/caramel-frap.png", categoria: "Bebidas Geladas", tags: ["gelado", "caramelo", "doce"] },
  { id: 10, nome: "Cold Brew Tradicional", preco: 11.00, desc: "Café extraído a frio por 20 horas para um sabor suave e potente.", img: "/coffes/cold-brew.png", categoria: "Bebidas Geladas", tags: ["forte", "gelado", "puro"] },
  { id: 11, nome: "Iced Latte Macchiato", preco: 14.00, desc: "Camadas de leite gelado e espresso servidos sobre cubos de gelo.", img: "/coffes/iced-latte.png", categoria: "Bebidas Geladas", tags: ["gelado", "leite", "refrescante"] },
  { id: 12, nome: "Strawberry Frappuccino", preco: 18.00, desc: "Bebida cremosa à base de creme batida com calda de morango.", img: "/coffes/strawberry-frap.png", categoria: "Bebidas Geladas", tags: ["gelado", "morango", "sem-cafe"] },

  // --- REFRESHERS E CHÁS (PASTA: /tea/) ---
  { id: 13, nome: "Pink Drink (Morango Açaí)", preco: 17.00, desc: "Refresher de morango e açaí combinado com leite de coco.", img: "/tea/pink-drink.png", categoria: "Bebidas Geladas", tags: ["gelado", "fruta", "coco"] },
  { id: 14, nome: "Dragon Drink (Manga Dragonfruit)", preco: 17.00, desc: "Refresher exótico de manga e pitaya com leite de coco.", img: "/tea/dragon-drink.png", categoria: "Bebidas Geladas", tags: ["gelado", "fruta", "exótico"] },
  { id: 15, nome: "Iced Green Tea Lemonade", preco: 13.50, desc: "Chá verde batido com limonada e gelo.", img: "/tea/green-tea-lemonade.png", categoria: "Bebidas Geladas", tags: ["gelado", "chá", "limão"] },
  { id: 16, nome: "Iced Passion Tango", preco: 12.00, desc: "Infusão de hibisco, capim-limão e maçã. Naturalmente sem cafeína.", img: "/tea/passion-tango.png", categoria: "Bebidas Geladas", tags: ["gelado", "chá", "fruta"] },
  { id: 17, nome: "Chai Latte", preco: 15.50, desc: "Chá preto com especiarias, canela e leite vaporizado.", img: "/tea/chai-latte.png", categoria: "Especiais", tags: ["quente", "especiarias", "chá"] },

  // --- COMIDAS E SNACKS (PASTA: /snacks/) ---
  { id: 18, nome: "Pão de Queijo Clássico", preco: 7.00, desc: "Receita mineira tradicional, sempre quentinho.", img: "/snacks/pao-de-queijo.png", categoria: "Acompanhamentos", tags: ["salgado", "quente", "queijo"] },
  { id: 19, nome: "Croissant de Manteiga", preco: 11.50, desc: "Massa folhada francesa amanteigada e crocante.", img: "/snacks/croissant.png", categoria: "Acompanhamentos", tags: ["salgado", "folhado", "quente"] },
  { id: 20, nome: "Chocolate Brownie", preco: 12.00, desc: "Brownie de chocolate belga denso e molhadinho.", img: "/snacks/brownie.png", categoria: "Acompanhamentos", tags: ["doce", "chocolate", "sobremesa"] },
  { id: 21, nome: "Cinnamon Roll", preco: 13.00, desc: "Caracol de canela com cobertura de creme de queijo doce.", img: "/snacks/cinnamon-roll.png", categoria: "Acompanhamentos", tags: ["doce", "canela", "quente"] },
  { id: 22, nome: "Muffin de Blueberry", preco: 10.50, desc: "Bolinho macio recheado com mirtilos frescos.", img: "/snacks/muffin.png", categoria: "Acompanhamentos", tags: ["doce", "fruta", "lanche"] },
  { id: 23, nome: "Coxinha de Frango", preco: 9.50, desc: "Massa leve com recheio de frango desfiado temperado.", img: "/snacks/coxinha.png", categoria: "Acompanhamentos", tags: ["salgado", "quente", "frango"] },
  { id: 24, nome: "Cookies de Chocolate", preco: 8.00, desc: "Cookie americano com gotas de chocolate meio amargo.", img: "/snacks/cookie.png", categoria: "Acompanhamentos", tags: ["doce", "chocolate", "lanche"] },
   { id: 25, nome: "Flat White", preco: 13.00, desc: "Doses de Ristretto com leite vaporizado integral bem cremoso.", img: "/coffes/flat-white.png", categoria: "Cafés", tags: ["forte", "leite", "cremoso"] },
  { id: 26, nome: "Caramel Macchiato", preco: 15.00, desc: "Leite vaporizado com baunilha, marcado com espresso e calda de caramelo.", img: "/coffes/caramel-macchiato.png", categoria: "Cafés", tags: ["doce", "caramelo", "quente"] },
  { id: 27, nome: "Caffè Mocha", preco: 14.50, desc: "Espresso com calda de chocolate, leite vaporizado e chantilly.", img: "/coffes/mocha.png", categoria: "Cafés", tags: ["chocolate", "doce", "quente"] },
];



const CATEGORIAS = ["Todos", "Cafés", "Especiais", "Bebidas Geladas"];

function Cardapio() {
  const { usuario } = useContext(AuthContext);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const temCupom = usuario && usuario.cupom;

  // Lógica de Filtro por Categoria e Busca
  const cafesParaMostrar = CAFES.filter(cafe => {
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