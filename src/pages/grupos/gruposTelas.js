import React, { useState } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import CardQuadra from "../../components/cardQuadra";
import CadastroGrupoModal from "../../components/cadastroGrupoModal"; // Importando o modal
import "../../styles/pages/grupos/gruposTelas.css";

function GruposTela() {
  const [isPublic, setIsPublic] = useState(true); // Controla se estamos mostrando grupos públicos ou privados
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal

  const publicGroups = [
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Galera da Grota",
      precoHora: "R$ 80/H",
      bairro: "Serraria",
      tipo: "Futsal",
    },
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Arena Central",
      precoHora: "R$ 100/H",
      bairro: "Centro",
      tipo: "Vôlei",
    },
  ];

  const privateGroups = [
    {
      imagem: "https://via.placeholder.com/150",
      nome: "O Racha é Realidade",
      precoHora: "R$ 70/H",
      bairro: "Jatiúca",
      tipo: "Basquete",
    },
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Os Bagunceiros",
      precoHora: "R$ 60/H",
      bairro: "Pajuçara",
      tipo: "Tênis",
    },
  ];

  // Funções para abrir/fechar o modal
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

      {/* Botões de Público/Privado e Criar Grupo */}
      <div className="groups-page__actions d-flex justify-content-between mb-4">
        <div className="d-flex flex-fill">
          <button
            className={`btn ${isPublic ? "btn-primary" : "btn-outline-primary"} flex-fill me-2`}
            onClick={() => setIsPublic(true)} // Atualiza o estado para Público
          >
            Públicos
          </button>
          <button
            className={`btn ${!isPublic ? "btn-primary" : "btn-outline-primary"} flex-fill`}
            onClick={() => setIsPublic(false)} // Atualiza o estado para Privado
          >
            Privados
          </button>
        </div>
        <button className="btn btn-success ms-2" onClick={handleShowModal}>
          Criar Grupo
        </button>
      </div>

      {/* Lista de Grupos */}
      <div className="groups-page__list row">
        {(isPublic ? publicGroups : privateGroups).map((group, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <CardQuadra
              imagem={group.imagem}
              nome={group.nome}
              precoHora={group.precoHora}
              bairro={group.bairro}
              tipo={group.tipo}
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
