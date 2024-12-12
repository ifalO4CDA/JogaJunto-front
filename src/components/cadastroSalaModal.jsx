import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/cadastroSalaModal.css"; // Estilos do modal

function CadastroSalaModal({ show, handleClose }) {
  const [fotoSala, setFotoSala] = useState(null);

  const handleFotoChange = (e) => {
    setFotoSala(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Criação de Sala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="form-wrapper p-4 rounded shadow-sm">
            {/* Upload de Foto */}
            <div className="mb-4 text-center">
              <label htmlFor="fotoSalaInput" className="upload-button">
                {fotoSala ? (
                  <img
                    src={fotoSala}
                    alt="Foto da Sala"
                    className="uploaded-image"
                  />
                ) : (
                  <span>Adicionar Foto da Sala</span>
                )}
              </label>
              <input
                type="file"
                id="fotoSalaInput"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Formulário */}
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome da Sala"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bairro"
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tipo de Sala"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Criar Sala
              </button>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CadastroSalaModal;
