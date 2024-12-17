import React, { useState } from "react";
import "../styles/components/modalConvite.css";

const ModalConvite = ({ onClose, tipo, nome }) => {
  const [linkConvite, setLinkConvite] = useState(
    `http://localhost:3000/${tipo}/convite/${Math.random().toString(36).substring(2, 10)}`
  );

  // Função para gerar um novo link
  const gerarNovoLink = () => {
    const novoLink = `http://localhost:3000/${tipo}/convite/${Math.random().toString(36).substring(2, 10)}`;
    setLinkConvite(novoLink);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Convite para {nome}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Corpo */}
        <div className="modal-body">
          <p>Compartilhe este link com outras pessoas para convidá-las:</p>
          <div className="link-container">
            <input
              type="text"
              className="form-control"
              value={linkConvite}
              readOnly
            />
            <button
              className="btn btn-primary btn-copy"
              onClick={() => navigator.clipboard.writeText(linkConvite)}
            >
              Copiar Link
            </button>
          </div>

          <div className="text-center mt-3">
            <button
              className="btn btn-success"
              onClick={gerarNovoLink}
            >
              Gerar Novo Link
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConvite;
