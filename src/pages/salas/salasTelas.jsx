import React, { useState, useEffect } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import CardSala from "../../components/cardSala";
import CadastroSalaModal from "../../components/cadastroSalaModal";
import { SalasService } from "../../services/salaService";
import "../../styles/pages/salas/salasTelas.css";

function SalasTela() {
  const [salas, setSalas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    tipo: "todos", // opções: "todos", "publicas", "privadas"
    reserva: "todos", // opções: "todos", "comReserva", "semReserva"
  });

  const idUsuario = localStorage.getItem("id");

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const resposta = await SalasService.getSalasPorUsuario(idUsuario);
        setSalas(resposta);
      } catch (error) {
        console.error("Erro na requisição de salas:", error);
      }
    };

    fetchSalas();
  }, [idUsuario]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const salasParaExibir = salas.filter((sala) => {
    const isPublic = !sala.privada;
    const hasReserva = sala.reserva_ativa;

    const tipoFiltro =
      filters.tipo === "todos" ||
      (filters.tipo === "publicas" && isPublic) ||
      (filters.tipo === "privadas" && !isPublic);

    const reservaFiltro =
      filters.reserva === "todos" ||
      (filters.reserva === "comReserva" && hasReserva) ||
      (filters.reserva === "semReserva" && !hasReserva);

    return tipoFiltro && reservaFiltro;
  });

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

      {/* Filtros */}
      <div className="rooms-page__actions">
        <div className="filters">
          <select
            className="form-select filter-select"
            value={filters.tipo}
            onChange={(e) => handleFilterChange("tipo", e.target.value)}
          >
            <option value="todos">Todas as Salas</option>
            <option value="publicas">Públicas</option>
            <option value="privadas">Privadas</option>
          </select>
          <select
            className="form-select filter-select"
            value={filters.reserva}
            onChange={(e) => handleFilterChange("reserva", e.target.value)}
          >
            <option value="todos">Todas as Reservas</option>
            <option value="comReserva">Com Reserva Ativa</option>
            <option value="semReserva">Sem Reserva Ativa</option>
          </select>
        </div>
        <button className="btn btn-success create-room" onClick={handleShowModal}>
          Criar Sala
        </button>
      </div>

      {/* Lista de Salas */}
      <div className="rooms-page__list">
        {salasParaExibir.length > 0 ? (
          salasParaExibir.map((sala) => (
            <CardSala
              key={sala.id_sala}
              id={sala.id_sala}
              imagem={null}
              nome={`Sala #${sala.id_sala}`}
              maxIntegrantes={sala.max_integrantes}
              qtdAtualIntegrantes={sala.qtd_atual_integrantes}
              privada={sala.privada}
              reservaAtiva={sala.reserva_ativa}
              grupo={sala.grupo}
            />
          ))
        ) : (
          <p>Nenhuma sala encontrada.</p>
        )}
      </div>

      {/* Modal de Criação de Sala */}
      <CadastroSalaModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default SalasTela;
