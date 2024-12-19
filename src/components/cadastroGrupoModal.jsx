import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/cadastroGrupoModal.css";
import { GruposService } from "../services/grupoService";

function CadastroGrupoModal({ show, handleClose }) {
  const [nomeGrupo, setNomeGrupo] = useState(""); // Nome do grupo
  const [maxIntegrantes, setMaxIntegrantes] = useState(20); // Máximo de integrantes, padrão inicial
  const [loading, setLoading] = useState(false); // Indica requisição em andamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomeGrupo) {
      alert("Por favor, preencha o nome do grupo.");
      return;
    }

    const idCriador = localStorage.getItem("id"); // ID do usuário criador

    const dadosGrupo = {
      nome_grupo: nomeGrupo,
      id_criador: idCriador,
      max_integrantes: maxIntegrantes,
    };

    try {
      setLoading(true);
      const resposta = await GruposService.criarGrupo(dadosGrupo);
      console.log("Grupo criado com sucesso:", resposta);
      alert("Grupo criado com sucesso!");
      handleClose(); // Fecha o modal após a criação do grupo
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      alert("Erro ao criar o grupo. Tente novamente.");
    } finally {
      setLoading(false);
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
        <Modal.Title>Criação de Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Nome do Grupo */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Grupo"
              value={nomeGrupo}
              onChange={(e) => setNomeGrupo(e.target.value)}
              required
            />
          </div>

          {/* Slider para Máximo de Integrantes */}
          <div className="mb-3">
            <label htmlFor="maxIntegrantesSlider">Máximo de Integrantes:</label>
            <input
              type="range"
              id="maxIntegrantesSlider"
              className="form-range"
              min="2"
              max="50"
              step="1"
              value={maxIntegrantes}
              onChange={(e) => setMaxIntegrantes(Number(e.target.value))}
            />
            <div className="text-center">
              <span>{maxIntegrantes} integrantes</span>
            </div>
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Grupo"}
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CadastroGrupoModal;
