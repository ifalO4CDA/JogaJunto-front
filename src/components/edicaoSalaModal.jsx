import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/edicaoSalaModal.css"; // Estilos do modal

function EdicaoSalaModal({ show, handleClose, dadosSala, handleSalvar }) {
  const [fotoSala, setFotoSala] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    cidade: "",
    bairro: "",
    tipo: "",
  });

  // Preenche os campos ao abrir o modal
  useEffect(() => {
    if (dadosSala) {
      setFormData({
        nome: dadosSala.nome || "",
        cidade: dadosSala.cidade || "",
        bairro: dadosSala.bairro || "",
        tipo: dadosSala.tipo || "",
      });
      setFotoSala(dadosSala.foto || null);
    }
  }, [dadosSala]);

  const handleFotoChange = (e) => {
    setFotoSala(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSalvar({ ...formData, foto: fotoSala });
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
        <Modal.Title>Editar Sala</Modal.Title>
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
                  <span>Alterar Foto da Sala</span>
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome da Sala"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tipo de Sala"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Salvar Alterações
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

export default EdicaoSalaModal;
