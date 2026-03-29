const DEPOIMENTOS = [
  { id: 1, nome: "Kaneki", texto: "O melhor café que já provei, o ambiente é muito calmo.", estrelas: 5 },
  { id: 2, nome: "Touka", texto: "Atendimento excelente, recomendo o Blend Yoshimura.", estrelas: 4 },
  { id: 3, nome: "Hide", texto: "Sempre passo aqui depois da aula. A comida é ótima!", estrelas: 5 }
];

function Avaliacoes() {
  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-5">O que dizem sobre nós</h2>
        <div className="row">
          {DEPOIMENTOS.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card bg-secondary text-white border-0 p-3 h-100">
                <div className="card-body">
                  <h5 className="card-title text-warning">{"★".repeat(item.estrelas)}</h5>
                  <p className="card-text italic">"{item.texto}"</p>
                  <footer className="blockquote-footer text-light mt-2">{item.nome}</footer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Avaliacoes;