import React from 'react';
import imagemBanner from '../assets/Banner/banner-coffe.png'

function Hero() {
  return (
    <div className="hero-container" style={{
      height: '100vh',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${imagemBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      color: 'white'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5">
            <h5 className="text-uppercase" style={{ letterSpacing: '3px', color: '#d4a373' }}>Bem-vindo!</h5>
            <h1 className="display-2 fw-bold mb-4">Servimos o café mais rico da cidade!</h1>
            <p className="lead mb-4">Descubra sabores intensos e momentos de paz na Cafeteria Anteiku. O refúgio perfeito para amantes de grãos selecionados.</p>
            <button className="btn btn-outline-light btn-lg px-5 rounded-pill shadow-lg">Peça Agora</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;