import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ⚠️ PEQUENO TRUQUE OBRIGATÓRIO PARA O REACT-LEAFLET:
// O React às vezes "perde" a imagem do pino do mapa. Isso aqui garante que o pino vai aparecer!
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapaLocalizacao() {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    // 1. O React bate na porta do nosso backend e pede a lista de unidades
    fetch('http://localhost:5000/api/unidades')
      .then(res => res.json())
      .then(data => setUnidades(data))
      .catch(err => console.error("Erro ao buscar unidades:", err));
  }, []);

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center mb-4" style={{ color: '#d4a373', fontFamily: "'Playfair Display', serif" }}>
        Nossas Unidades
      </h2>
      
      {/* 2. A "Caixa" onde o mapa vai morar. Precisa ter altura definida, senão o mapa some! */}
      <div style={{ height: '500px', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '2px solid #d4a373' }}>
        
        {/* 3. O Mapa em si. 'center' é onde a câmera do mapa começa olhando (Tóquio) */}
       <MapContainer center={[35.6895, 139.6917]} zoom={13} style={{ height: '500px', width: '100%' }}>
          
          {/* O TileLayer é o "desenho" das ruas, pegamos de graça do OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* 4. Fazemos um "map" na lista que veio do banco e colocamos um pino para cada unidade */}
          {unidades.map(unidade => (
            <Marker key={unidade._id} position={[unidade.latitude, unidade.longitude]}>
              <Popup>
                <strong>{unidade.nome}</strong> <br />
                📍 {unidade.endereco} <br />
                🕒 {unidade.horario} <br />
                {/* Link mágico que abre direto no Google Maps de verdade! */}
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${unidade.latitude},${unidade.longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#d4a373', fontWeight: 'bold', textDecoration: 'none', display: 'block', marginTop: '8px' }}
                >
                  Abrir no Google Maps 🗺️
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

      </div>
    </div>
  );
}

export default MapaLocalizacao;