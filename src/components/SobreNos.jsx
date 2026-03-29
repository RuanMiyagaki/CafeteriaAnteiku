import React from 'react';
import imagemCafeteria from '../assets/CafeteriaAnteiku/cafeteria-anteiku.png'

function SobreNos() {

    return (
        <section className="py-5 mt-4 bg-light" id="sobre">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            {/* Aqui você coloca uma foto da cafeteria ou do anime */}
            <img src={imagemCafeteria} 
  className="img-fluid rounded shadow" 
  alt="Sobre a Anteiku"/>
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold" style={{ color: '#d4a373' }}>Nossa História</h2>
            <p className="lead">A Anteiku não é apenas uma cafeteria, é um refúgio para todos.</p>
            <p>Localizada no 20º distrito, focamos em oferecer o melhor café artesanal, com grãos selecionados e um ambiente pacífico.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreNos;