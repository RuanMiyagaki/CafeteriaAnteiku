import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' // O CSS DO BOOTSTRAP
import 'bootstrap-icons/font/bootstrap-icons.css' // OS ÍCONES
// No seu arquivo main.jsx
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 👈 ESSA LINHA É OBRIGATÓRIA
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
);