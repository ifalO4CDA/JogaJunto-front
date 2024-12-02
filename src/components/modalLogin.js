import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/modalLogin.css"; // Importa o arquivo CSS

function ModalLogin({ onClose, position }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="modal-overlay"
      onClick={handleBackgroundClick}
    >
      <div
        className="modal-dialog"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-body text-center">
            <h5 className="mb-1">Seja bem-vindo!</h5>
            <p className="text-muted mb-4">Entrar ou criar conta</p>
            <form>
              {/* Campo de E-mail */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control modal-input"
                  placeholder="E-mail"
                  required
                />
              </div>
              {/* Campo de Senha */}
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control modal-input"
                  placeholder="Senha"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Botão de Continuar */}
              <button type="submit" className="btn btn-primary w-100 btn-primary-custom">
                Continuar
              </button>
              {/* Botão de Cadastrar */}
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3 btn-outline-custom"
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
