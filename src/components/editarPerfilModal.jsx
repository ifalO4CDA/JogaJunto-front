import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditarPerfilModal = ({ show, onClose, usuario }) => {
  const [formData, setFormData] = useState({
    foto: usuario.foto,
    nome: usuario.nome,
    sobrenome: usuario.sobrenome,
    senha: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      cidade: "",
      estado: "",
      complemento: "",
    },
    celular: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalvar = () => {
    console.log("Informações atualizadas:", formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="foto" className="form-label">
              Foto
            </label>
            <input
              type="file"
              className="form-control"
              id="foto"
              name="foto"
              onChange={(e) =>
                setFormData({ ...formData, foto: URL.createObjectURL(e.target.files[0]) })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sobrenome" className="form-label">
              Sobrenome
            </label>
            <input
              type="text"
              className="form-control"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
          {/* Campos para endereço, celular, etc. */}
          <Button variant="primary" onClick={handleSalvar} className="w-100">
            Salvar Alterações
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditarPerfilModal;
