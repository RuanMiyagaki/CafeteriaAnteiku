import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import QRCode from 'react-qr-code';
// ❌ DEMITIMOS A BIBLIOTECA qrcode-pix AQUI!

// 🧠 ALGORITMO MATEMÁTICO DO PIX (Frontend Safe)
const gerarPayloadPix = (chave, nome, cidade, valor) => {
  const pad = (str) => {
    const len = str.length.toString().padStart(2, '0');
    return len + str;
  };

  const payloadFormat = "000201";
  const merchantAccount = "0014br.gov.bcb.pix" + "01" + pad(chave);
  const merchantAccountFull = "26" + pad(merchantAccount);
  const merchantCategory = "52040000";
  const transactionCurrency = "5303986";
  const transactionAmount = "54" + pad(valor.toFixed(2));
  const countryCode = "5802BR";
  const merchantName = "59" + pad(nome.substring(0, 25).trim());
  const merchantCity = "60" + pad(cidade.substring(0, 15).trim());
  const additionalData = "62070503***"; 

  let payload = payloadFormat + merchantAccountFull + merchantCategory + transactionCurrency + transactionAmount + countryCode + merchantName + merchantCity + additionalData + "6304";

  // Cálculo de segurança CRC16 exigido pelo Banco Central
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
};

function PagamentoPix({ valorTotal = 0 }) {
  const { registrarPedido } = useContext(AuthContext);
  const [payloadPix, setPayloadPix] = useState("");
  const [copiado, setCopiado] = useState(false);

  // 1. Pega os seus dados REAIS do arquivo .env
  const CHAVE = (import.meta.env.VITE_PIX_KEY || "suachave@email.com").replace(/['"]+/g, '');
  const NOME = (import.meta.env.VITE_PIX_NAME || "Anteiku Coffee").replace(/['"]+/g, '');
  const CIDADE = (import.meta.env.VITE_PIX_CITY || "SAO PAULO").replace(/['"]+/g, '');
  const VALOR = Number(valorTotal) || 0;

  const pedidoJaRegistrado = useRef(false);

  useEffect(() => {
    // Adicionamos a verificação: se o cadeado for falso, ele entra.
    if (CHAVE && VALOR > 0 && !pedidoJaRegistrado.current) {
      // 2. Chama a nossa função segura em vez da biblioteca que travava o site
      const codigoGerado = gerarPayloadPix(CHAVE, NOME, CIDADE, VALOR);
      setPayloadPix(codigoGerado);
      registrarPedido({ valor: VALOR });

      // 🚀 FECHA O CADEADO! O React não consegue mais gerar duplicado.
      pedidoJaRegistrado.current = true;
    }
  }, [VALOR, CHAVE]);

  const copiarCodigo = () => {
    if (payloadPix) {
      navigator.clipboard.writeText(payloadPix);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  return (
    <div className="card border-0 shadow-sm p-4 text-center mx-auto" style={{ maxWidth: '400px', borderRadius: '20px' }}>
      <h4 className="fw-bold mb-3" style={{ color: '#2c1e16' }}>Pagamento via Pix</h4>
      
      <p className="text-muted small mb-4">
        Escaneie o QR Code no app do seu banco para pagar 
        <strong className="text-success fs-5 ms-1">R$ {VALOR.toFixed(2)}</strong>
      </p>

      {/* 3. Desenha o QR Code na tela usando a biblioteca segura (react-qr-code) */}
      <div className="bg-white p-3 rounded-4 shadow-sm mx-auto mb-4" style={{ width: 'fit-content', border: '2px dashed #d4a373' }}>
        {payloadPix ? (
          <QRCode value={payloadPix} size={200} fgColor="#1a1a1a" />
        ) : (
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        )}
      </div>

      {/* Botão Copia e Cola */}
      <div className="mb-3">
        <p className="small text-muted mb-2">Ou use o código Copia e Cola:</p>
        <button 
          onClick={copiarCodigo}
          className={`btn w-100 fw-bold transition-all ${copiado ? 'btn-success' : 'btn-outline-dark'}`}
          style={{ borderRadius: '10px' }}
        >
          {copiado ? <><i className="bi bi-check2-circle me-2"></i>Código Copiado!</> : <><i className="bi bi-clipboard me-2"></i>Copiar Código Pix</>}
        </button>
      </div>

      <div className="alert alert-warning small border-0 mb-0 mt-3 text-start" style={{ borderRadius: '10px' }}>
        <i className="bi bi-info-circle-fill me-2"></i>
        Após o pagamento, aguarde a confirmação do nosso gerente.
      </div>
    </div>
  );
}

export default PagamentoPix;