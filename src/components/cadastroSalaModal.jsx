import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/cadastroSalaModal.css"; // Estilos do modal
import { SalasService } from "../services/salaService";

function CadastroSalaModal({ show, handleClose }) {
  const [erro, setErro] = useState(null);
  const [dadosSala, setDadosSala] = useState({
    privada: false, // Default para público
    id_usuario: localStorage.getItem("id"), // Obtendo o ID do usuário logado
    max_integrantes: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setDadosSala((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await SalasService.criarSala(dadosSala);
      handleClose();
      window.location.reload();
    } catch (error) {
      setErro(error.response?.data?.message || error.message);
    }
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
            <form onSubmit={handleSubmit}>
              {/* Campo para definir se a sala é privada */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="privada"
                  name="privada"
                  checked={dadosSala.privada}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="privada">
                  Sala Privada
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="maxIntegrantes" className="form-label">
                  Máximo de Integrantes: {dadosSala.max_integrantes}
                </label>
                <input
                  type="range"
                  name="max_integrantes"
                  id="maxIntegrantes"
                  className="form-range"
                  min="2"
                  max="30"
                  step="1"
                  value={dadosSala.max_integrantes || 10} // Valor padrão 10
                  onChange={handleInputChange}
                  required
                />
              </div>
              {erro && <div className="alert alert-danger">{erro}</div>}
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
