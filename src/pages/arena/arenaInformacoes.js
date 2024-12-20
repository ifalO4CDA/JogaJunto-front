import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaService } from "../../services/arenaService";
import { ReservaService } from "../../services/reservaService";
import { SalasService } from "../../services/salaService";
import CadastroSalaModal from "../../components/cadastroSalaModal";

const ArenaInformacoes = () => {
  const { id } = useParams();
  const [arenaData, setArenaData] = useState(null);
  const [salasSemReserva, setSalasSemReserva] = useState([]);
  const [novaReserva, setNovaReserva] = useState({
    id_quadra: parseInt(id, 10),
    data_reserva: "",
    horario_inicio: "",
    horario_fim: "",
    valor_total: 0,
    id_sala: "",
  });
  const [showModalCriarSala, setShowModalCriarSala] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        const response = await ArenaService.getArenaById(id);
        setArenaData(response.data);

        const salasResponse = await SalasService.getSalasPorUsuario(localStorage.getItem("id"));
        const salasDisponiveis = salasResponse.filter((sala) => !sala.reserva_ativa);
        setSalasSemReserva(salasDisponiveis);

        setError(false);
      } catch (err) {
        console.error("Erro ao buscar informações:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArenaData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaReserva((prev) => ({ ...prev, [name]: value }));
  };

  const handleCriarReserva = async (e) => {
    e.preventDefault();
    try {
      await ReservaService.criarReserva(novaReserva);
      alert("Reserva criada com sucesso!");
      setNovaReserva({
        id_quadra: parseInt(id, 10),
        data_reserva: "",
        horario_inicio: "",
        horario_fim: "",
        valor_total: 0,
        id_sala: "",
      });
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      alert("Erro ao criar a reserva. Verifique os dados e tente novamente.");
    }
  };

  const handleCriarNovaSala = () => {
    setShowModalCriarSala(true);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Carregando informações da arena...</h2>
      </div>
    );
  }

  const placeholderData = {
    nome: "Arena Não Encontrada",
    descricao: "Desculpe, não encontramos informações sobre essa arena.",
    imagem: "https://via.placeholder.com/600x300?text=Arena+Não+Encontrada",
    preco_hora: "Indisponível",
    tipo: "Desconhecido",
    endereco: {
      logradouro: "Endereço desconhecido",
      numero: "N/A",
      bairro: "Desconhecido",
      cidade: "Desconhecida",
      estado: "Desconhecido",
    },
    proprietario: {
      nome: "Não informado",
      email: "Não disponível",
    },
    esportes: [],
    comodidades: [],
  };

  const dataToDisplay = error || !arenaData
    ? placeholderData
    : {
      ...arenaData,
      esportes: arenaData.esportes || [],
      comodidades: arenaData.comodidades || [],
      endereco: arenaData.endereco || placeholderData.endereco,
      proprietario: arenaData.proprietario || placeholderData.proprietario,
    };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Detalhes da Arena */}
        <div className="col-md-8">
          <h2 className="mb-3">{dataToDisplay.nome}</h2>
          <img
            src={dataToDisplay.imagem}
            alt={dataToDisplay.nome}
            className="img-fluid rounded"
          />
          <p className="mt-3">{dataToDisplay.descricao}</p>
          <p>
            <strong>Tipo:</strong> {dataToDisplay.tipo}
          </p>

          {/* Esportes */}
          <div className="mt-3">
            <h5>Esportes Disponíveis</h5>
            {dataToDisplay.esportes.length > 0 ? (
              <div className="d-flex flex-wrap">
                {dataToDisplay.esportes.map((esporte, index) => (
                  <span key={index} className="badge bg-primary me-2 mb-2">
                    {esporte}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-muted">Nenhum esporte disponível</span>
            )}
          </div>

          {/* Comodidades */}
          <div className="mt-3">
            <h5>Comodidades</h5>
            {dataToDisplay.comodidades.length > 0 ? (
              <div className="d-flex flex-wrap">
                {dataToDisplay.comodidades.map((comodidade, index) => (
                  <span key={index} className="badge bg-secondary me-2 mb-2">
                    {comodidade}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-muted">Nenhuma comodidade disponível</span>
            )}
          </div>

          {/* Endereço */}
          <div className="mt-4">
            <h5>Localização</h5>
            <p>
              {dataToDisplay.endereco.logradouro}, {dataToDisplay.endereco.numero},{" "}
              {dataToDisplay.endereco.bairro}, {dataToDisplay.endereco.cidade} -{" "}
              {dataToDisplay.endereco.estado}
            </p>
          </div>

          {/* Proprietário */}
          <div className="mt-4">
            <h5>Proprietário</h5>
            <p>
              Nome: <strong>{dataToDisplay.proprietario.nome}</strong>
            </p>
            <p>Email: {dataToDisplay.proprietario.email}</p>
          </div>
        </div>

        {/* Formulário de Reserva */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">
              Preço por Hora: R$ {parseFloat(dataToDisplay.preco_hora || 0).toFixed(2)}
            </h3>
            <form onSubmit={handleCriarReserva}>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Data
                </label>
                <input
                  type="date"
                  name="data_reserva"
                  value={novaReserva.data_reserva}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start-time" className="form-label">
                  Começa
                </label>
                <input
                  type="time"
                  name="horario_inicio"
                  value={novaReserva.horario_inicio}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end-time" className="form-label">
                  Termina
                </label>
                <input
                  type="time"
                  name="horario_fim"
                  value={novaReserva.horario_fim}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="valor_total" className="form-label">
                  Valor Total
                </label>
                <input
                  type="number"
                  name="valor_total"
                  value={novaReserva.valor_total}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3 d-flex align-items-center">
                <div className="flex-grow-1">
                  <label htmlFor="id_sala" className="form-label">
                    Selecionar Sala
                  </label>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <select
                      name="id_sala"
                      value={novaReserva.id_sala}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Selecione uma sala</option>
                      {salasSemReserva.map((sala) => (
                        <option key={sala.id_sala} value={sala.id_sala}>
                          Sala #{sala.id_sala}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={handleCriarNovaSala}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Criar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModalCriarSala && (
        <CadastroSalaModal show={showModalCriarSala} handleClose={() => setShowModalCriarSala(false)} />
      )}
    </div>
  );
};

export default ArenaInformacoes;
