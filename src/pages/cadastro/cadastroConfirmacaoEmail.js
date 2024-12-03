import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Imagem from '../../assets/ilustracaoConfirmacaoEmail.png';

const CadastroConfirmacaoEmail = () => {
    // Estado para armazenar os valores dos inputs e controle do botão de reenviar
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30); // Timer de 30 segundos

  // Função para lidar com a mudança nos inputs
  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };

  // Função para mover para o próximo input automaticamente
  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`input-${index - 1}`).focus();
    } else if (index < 5 && e.target.value.length === 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  // Função para habilitar o botão de reenviar após 30 segundos
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Função para reenviar o código
  const handleResendCode = () => {
    setCanResend(false);
    setTimer(30);
    // Lógica de reenviar o código
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Imagem à esquerda */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={Imagem} // Substitua pelo caminho real da sua imagem
            alt="Imagem de confirmação"
            className="img-fluid"
            style={{ width: "60%" }} // Ajusta a largura da imagem
          />
        </div>

        {/* Informações à direita */}
        <div className="col-md-6">
          <div className="text-start mb-4" style={{marginLeft: 70}}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Verificar Email</h3>
            <p style={{ fontSize: "17px" }}>Enviamos um código de 6 dígitos para sua caixa de email.</p>
          </div>

          {/* Inputs para o código de confirmação */}
          <div className="d-flex justify-content-center mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={code[index]}
                onChange={(e) => handleInputChange(e, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                className="form-control text-center mx-3"
                style={{ width: "55px", fontSize: "20px", height: "65px", backgroundColor: "#D9D9D9" }}
              />
            ))}
          </div>

          {/* Botão de confirmação */}
          <div className="text-center mb-3">
            <button className="btn btn-primary"
                    style={{ width: "500px"}}
            >Confirmar</button>
          </div>

          {/* Texto "Não recebeu o código?" e "Enviar novamente" */}
      <div className="text-center">
        <p style={{ fontSize: "17px", marginBottom: "5px" }}>Não recebeu o código?</p>
        {canResend ? (
          <p
            onClick={handleResendCode}
            style={{
              color: "#007bff", // Cor de link
              textDecoration: "underline", // Sublinhado para parecer com link
              cursor: "pointer",
              fontSize: "17px",
              marginBottom: "0"
            }}
          >
            Enviar novamente
          </p>
        ) : (
          <p style={{ fontSize: "17px", marginBottom: "0" }}>
            Envie novamente em {timer} segundos.
          </p>
        )}
      </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroConfirmacaoEmail;