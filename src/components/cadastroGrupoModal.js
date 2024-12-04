import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/cadastroGrupoModal.css"; // Caminho correto após mover o arquivo

function CadastroGrupoModal({ show, handleClose }) {
  const [fotoGrupo, setFotoGrupo] = useState(null);

  const handleFotoChange = (e) => {
    setFotoGrupo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static" // Impede que o modal seja fechado ao clicar fora
      keyboard={false}  // Impede que o modal seja fechado ao pressionar "Esc"
    >
      <Modal.Header closeButton>
        <Modal.Title>Criação de Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Coluna do Formulário */}
            <div className="col-md-12 col-lg-8">
              <div className="form-wrapper p-4 rounded shadow-sm">
                {/* Botão para Upload de Foto do Grupo */}
                <div className="mb-4 text-center">
                  <label htmlFor="fotoGrupoInput" className="upload-button">
                    {fotoGrupo ? (
                      <img
                        src={fotoGrupo}
                        alt="Foto do Grupo"
                        className="uploaded-image"
                      />
                    ) : (
                      <span>Adicionar Foto do Grupo</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="fotoGrupoInput"
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
                      placeholder="Nome do Grupo"
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
                        placeholder="Região"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Somente Maiores?</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="somenteMaiores"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="somenteMaiores"
                        >
                          Sim
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Grupo Privado?</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="grupoPrivado"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="grupoPrivado"
                        >
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Criar Grupo
                  </button>
                </form>
              </div>
            </div>
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

export default CadastroGrupoModal;
