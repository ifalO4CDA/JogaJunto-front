import React, { useState, useEffect } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import CardGrupo from "../../components/cardGrupo";
import CadastroGrupoModal from "../../components/cadastroGrupoModal";
import { GruposService } from "../../services/grupoService";
import "../../styles/pages/grupos/gruposTelas.css";

function GruposTela() {
  const [grupos, setGrupos] = useState([]); // Lista de grupos
  const [showModal, setShowModal] = useState(false);
  const idUsuario = localStorage.getItem("id"); // ID do usuário logado

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const resposta = await GruposService.getGruposPorUsuario(idUsuario);
        setGrupos(resposta); // Define os grupos retornados
      } catch (error) {
        console.error("Erro ao buscar os grupos do usuário:", error);
      }
    };

    fetchGrupos();
  }, [idUsuario]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="groups-page container">
      {/* Barra de Pesquisa */}
      <div className="search-bar-container mb-4">
        <BarraDePesquisa
          campos={[
            {
              label: "Buscar Grupos",
              type: "text",
              placeholder: "Digite o nome do grupo",
            },
          ]}
          onSearch={() => ({})}
        />
      </div>

      {/* Botões de Criar Grupo */}
      <div className="groups-page__actions d-flex justify-content-end mb-4">
        <button className="btn btn-success ms-2" onClick={handleShowModal}>
          Criar Grupo
        </button>
      </div>

      {/* Lista de Grupos */}
      <div className="groups-page__list row">
        {grupos.map((grupo) => (
          <div className="col-lg-4 col-md-6 mb-4" key={grupo.id_grupo}>
            <CardGrupo
              id={grupo.id_grupo}
              nome={grupo.nome_grupo}
              maxIntegrantes={grupo.max_integrantes}
              qtdAtualIntegrantes={grupo.qtd_atual_integrantes}
              criador={grupo.id_criador}
            />
          </div>
        ))}
      </div>

      {/* Modal de Criação de Grupo */}
      <CadastroGrupoModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default GruposTela;
