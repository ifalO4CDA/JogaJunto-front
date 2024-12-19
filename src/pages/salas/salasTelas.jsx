import React, { useState, useEffect } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import CardSala from "../../components/cardSala"; // Importa o novo card
import CadastroSalaModal from "../../components/cadastroSalaModal";
import { SalasService } from "../../services/salaService";
import "../../styles/pages/salas/salasTelas.css";

function SalasTela() {
  const [salasPublicas, setSalasPublicas] = useState([]);
  const [salasPrivadas, setSalasPrivadas] = useState([]);
  const [isPublic, setIsPublic] = useState(true); // Controla se estamos mostrando salas públicas ou privadas
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal

  const idUsuario = localStorage.getItem("id");

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const resposta = await SalasService.getSalasPorUsuario(idUsuario); // Já retorna o array de salas
        const publicas = resposta.filter((sala) => !sala.privada);
        const privadas = resposta.filter((sala) => sala.privada);
  
        setSalasPublicas(publicas);
        setSalasPrivadas(privadas);
      } catch (error) {
        console.error("Erro na requisição de salas:", error);
      }
    };
  
    fetchSalas();
  }, [idUsuario]);
  

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
            onClick={() => setIsPublic(true)}
          >
            Públicas
          </button>
          <button
            className={`btn ${!isPublic ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setIsPublic(false)}
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
        {(isPublic ? salasPublicas : salasPrivadas).map((sala) => (
          <CardSala
            key={sala.id_sala}
            id={sala.id_sala}
            imagem={null} // Caso queira adicionar imagens no futuro
            nome={`Sala #${sala.id_sala}`}
            maxIntegrantes={sala.max_integrantes}
            qtdAtualIntegrantes={sala.qtd_atual_integrantes}
            privada={sala.privada}
            reservaAtiva={sala.reserva_ativa}
            grupo={sala.grupo}
          />
        ))}
      </div>

      {/* Modal de Criação de Sala */}
      <CadastroSalaModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default SalasTela;
