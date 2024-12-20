import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/components/cadastroGrupoModal.css";
import { GruposService } from "../services/grupoService";

function CadastroGrupoModal({ show, handleClose }) {
  const [nomeGrupo, setNomeGrupo] = useState(""); // Nome do grupo
  const [maxIntegrantes, setMaxIntegrantes] = useState(20); // Máximo de integrantes, padrão inicial
  const [loading, setLoading] = useState(false); // Indica requisição em andamento
  const [erro, setErro] = useState(null); // Mensagem de erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomeGrupo) {
      setErro("Por favor, preencha o nome do grupo.");
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
      setErro(null); // Limpa erros anteriores
      await GruposService.criarGrupo(dadosGrupo);
      handleClose(); // Fecha o modal
      window.location.href = "/grupos"; // Recarrega a página de grupos
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Erro ao criar o grupo. Verifique os dados e tente novamente."
      );
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

          {/* Mensagem de erro */}
          {erro && <div className="alert alert-danger">{erro}</div>}

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
