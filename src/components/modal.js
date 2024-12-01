import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalLogin({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleBackgroundClick = (e) => {
    // Fecha o modal se o clique for fora do conteúdo
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent", // Fundo transparente
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 1050,
      }}
      onClick={handleBackgroundClick}
    >
      <div
        className="modal-dialog"
        style={{
          margin: "0",
          position: "relative",
          top: "100px", // Ajustado para ficar abaixo do header
          right: "20px",
        }}
      >
        <div
          className="modal-content"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="modal-body text-center">
            <h5 className="mb-1">Seja bem-vindo!</h5>
            <p className="text-muted mb-4">Entrar ou criar conta</p>
            <form>
              {/* Campo de E-mail */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  style={{
                    borderRadius: "8px",
                    height: "50px",
                    fontSize: "16px",
                  }}
                  required
                />
              </div>
              {/* Campo de Senha */}
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Senha"
                  style={{
                    borderRadius: "8px",
                    height: "50px",
                    fontSize: "16px",
                  }}
                  required
                />
                <button
                  type="button"
                  className="btn position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)", // Centraliza o botão verticalmente
                    fontSize: "20px",
                    background: "none",
                    border: "none",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Botão de Continuar */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "8px",
                  height: "50px",
                  fontSize: "16px",
                  backgroundColor: "#2FD151", // Cor verde
                  borderColor: "#2FD151", // Borda verde
                  color: "white",
                }}
              >
                Continuar
              </button>
              {/* Botão de Cadastrar */}
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3"
                style={{
                  borderRadius: "8px",
                  height: "50px",
                  fontSize: "16px",
                }}
                onClick={onClose}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
