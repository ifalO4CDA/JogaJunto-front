import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/edicaoGrupoModal.css";

function EdicaoGrupoModal({ show, handleClose, dadosGrupo, handleSalvar }) {
  const [fotoGrupo, setFotoGrupo] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  useEffect(() => {
    if (dadosGrupo) {
      setFormData({
        nome: dadosGrupo.nome || "",
        descricao: dadosGrupo.descricao || "",
      });
      setFotoGrupo(dadosGrupo.foto || null);
    }
  }, [dadosGrupo]);

  const handleFotoChange = (e) => {
    setFotoGrupo(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSalvar({ ...formData, foto: fotoGrupo });
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-wrapper p-4 rounded shadow-sm">
          {/* Upload de Foto */}
          <div className="mb-4 text-center">
            <label htmlFor="fotoGrupoInput" className="upload-button">
              {fotoGrupo ? (
                <img src={fotoGrupo} alt="Foto do Grupo" className="uploaded-image" />
              ) : (
                <span>Alterar Foto do Grupo</span>
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Grupo"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Descrição do Grupo"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Salvar Alterações
            </button>
          </form>
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

export default EdicaoGrupoModal;
