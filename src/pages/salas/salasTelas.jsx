import React, { useState } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import CardQuadra from "../../components/cardQuadra";
import CadastroSalaModal from "../../components/cadastroSalaModal"; // Modal para criar salas
import "../../styles/pages/salas/salasTelas.css"; // Estilos específicos da tela

function SalasTela() {
  const [isPublic, setIsPublic] = useState(true); // Controla se estamos mostrando salas públicas ou privadas
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal

  const publicRooms = [
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Sala Estratégica",
      precoHora: "R$ 50/H",
      bairro: "Centro",
      tipo: "Reunião",
    },
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Sala de Estudos",
      precoHora: "R$ 30/H",
      bairro: "Jatiúca",
      tipo: "Estudos",
    },
  ];

  const privateRooms = [
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Sala Privativa",
      precoHora: "R$ 100/H",
      bairro: "Pajuçara",
      tipo: "Consultoria",
    },
    {
      imagem: "https://via.placeholder.com/150",
      nome: "Sala Fechada",
      precoHora: "R$ 80/H",
      bairro: "Serraria",
      tipo: "Oficina",
    },
  ];

  // Funções para abrir/fechar o modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="rooms-page">
      {/* Barra de Pesquisa */}
      <div className="search-bar-container">
        <BarraDePesquisa
          campos={[
            {
              label: "Buscar Salas",
              type: "text",
              placeholder: "Digite o nome da sala",
              onChange: (value) => console.log("Buscando:", value),
            },
          ]}
          onSearch={() => console.log("Buscar Salas")}
        />
      </div>

      {/* Botões de Público/Privado e Criar Sala */}
      <div className="rooms-page__actions">
        <div className="toggle-buttons">
          <button
            className={`btn ${isPublic ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setIsPublic(true)} // Atualiza o estado para Público
          >
            Públicas
          </button>
          <button
            className={`btn ${!isPublic ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setIsPublic(false)} // Atualiza o estado para Privado
          >
            Privadas
          </button>
        </div>
        <button className="btn btn-success create-room" onClick={handleShowModal}>
          Criar Sala
        </button>
      </div>

      {/* Lista de Salas */}
      <div className="rooms-page__list">
        {(isPublic ? publicRooms : privateRooms).map((room, index) => (
          <CardQuadra
            key={index}
            imagem={room.imagem}
            nome={room.nome}
            precoHora={room.precoHora}
            bairro={room.bairro}
            tipo={room.tipo}
          />
        ))}
      </div>

      {/* Modal de Criação de Sala */}
      <CadastroSalaModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default SalasTela;
