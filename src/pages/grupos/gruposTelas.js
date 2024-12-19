import React, { useState, useEffect } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import CardGrupo from "../../components/cardGrupo"; // Componente para exibir o card do grupo
import CadastroGrupoModal from "../../components/cadastroGrupoModal";
import { GruposService } from "../../services/grupoService"; // Importa o serviço
import "../../styles/pages/grupos/gruposTelas.css";

function GruposTela() {
  const [grupos, setGrupos] = useState([]); // Armazena os grupos do usuário
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [loading, setLoading] = useState(true); // Indica se os dados estão carregando

  const idUsuario = localStorage.getItem("id"); // Pega o ID do usuário logado

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        setLoading(true);
        const gruposUsuario = await GruposService.getGruposPorUsuario(idUsuario); // Chamada usando GET
        setGrupos(gruposUsuario); // Atualiza o estado com os grupos recebidos
      } catch (error) {
        console.error("Erro ao buscar os grupos do usuário:", error.response?.data || error.message);
        setGrupos([]); // Define um fallback vazio em caso de erro
      } finally {
        setLoading(false);
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
              onChange: (value) => console.log("Buscando:", value),
            },
          ]}
          onSearch={() => console.log("Buscar Grupos")}
        />
      </div>

      {/* Botões e Criar Grupo */}
      <div className="groups-page__actions d-flex justify-content-between mb-4">
        <h3>Seus Grupos</h3>
        <button className="btn btn-success ms-2" onClick={handleShowModal}>
          Criar Grupo
        </button>
      </div>

      {/* Lista de Grupos */}
      <div className="groups-page__list row">
        {loading ? (
          <div className="text-center">Carregando...</div>
        ) : grupos.length > 0 ? (
          grupos.map((grupo) => (
            <div className="col-lg-4 col-md-6 mb-4" key={grupo.id_grupo}>
              <CardGrupo
                id={grupo.id_grupo}
                nome={grupo.nome_grupo}
                maxIntegrantes={grupo.max_integrantes}
                qtdAtualIntegrantes={grupo.qtd_atual_integrantes}
              />
            </div>
          ))
        ) : (
          <div className="text-center">Nenhum grupo encontrado.</div>
        )}
      </div>

      {/* Modal de Criação de Grupo */}
      <CadastroGrupoModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default GruposTela;
