import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

function PainelPedidos() {
  const { pedidos, confirmarTransacao, buscarPedidos } = useContext(AuthContext);


  useEffect(() => {
    // Busca os pedidos do banco de dados ao abrir a página
    buscarPedidos();
  }, []);



  return (
    <div className="container mt-5 pt-5">
      <h2 className="fw-bold mb-4" style={{ color: '#2c1e16' }}>
        <i className="bi bi-person-badge me-2"></i>Área do Gerente (Yoshimura)
      </h2>
      
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Hora</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4 text-muted">Nenhum pedido realizado ainda.</td></tr>
            ) : (
              pedidos.map(p => (
                <tr key={p._id} className="align-middle">
                  <td className="fw-bold">{p.clienteNome}</td>
                  <td className="text-success">R$ {p.valor.toFixed(2)}</td>
                  <td>{p.data}</td>
                  <td>
                    <span className={`badge rounded-pill ${p.status === 'Pendente' ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.status === 'Pendente' && (
                      <button 
                        onClick={() => confirmarTransacao(p._id)}
                        className="btn btn-sm btn-dark rounded-pill px-3"
                      >
                        Confirmar e Dar Pontos
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PainelPedidos;