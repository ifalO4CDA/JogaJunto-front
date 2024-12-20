import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaService } from "../../services/arenaService";
import { ReservaService } from "../../services/reservaService";
import { SalasService } from "../../services/salaService";
import CadastroSalaModal from "../../components/cadastroSalaModal";

const generateTimeOptions = (startTime) => {
  const options = [];
  const start = startTime ? parseInt(startTime.split(":")[0], 10) : 0;
  const end = 24; // Horários até 23:30

  for (let hour = start; hour < end; hour++) {
    options.push(`${hour.toString().padStart(2, "0")}:00`);
    options.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  return startTime
    ? options.filter(
      (time) =>
        new Date(`1970-01-01T${time}:00`) >
        new Date(`1970-01-01T${startTime}:00`).getTime() + 60 * 60 * 999
    )
    : options;
};


const ArenaInformacoes = () => {
  const { id } = useParams();
  const location = useLocation(); // Para acessar o estado da navegação
  const idSalaInicial = location.state?.idSala || ""; // Pega o id_sala do estado ou usa vazio
  const [arenaData, setArenaData] = useState(null);
  const [salasSemReserva, setSalasSemReserva] = useState([]);
  const [novaReserva, setNovaReserva] = useState({
    id_quadra: parseInt(id, 10),
    data_reserva: "",
    horario_inicio: "",
    horario_fim: "",
    valor_total: 0,
    id_sala: idSalaInicial, // Inicializa com o id_sala se existir
  });
  const [showModalCriarSala, setShowModalCriarSala] = useState(false);
  const [errorFetchArena, setErrorFetchArena] = useState(false);
  const [errors, setErrors] = useState([]); // Lista de mensagens de erro
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        const response = await ArenaService.getArenaById(id);
        setArenaData(response.data);

        const salasResponse = await SalasService.getSalasPorUsuario(localStorage.getItem("id"));
        const salasDisponiveis = salasResponse.filter((sala) => !sala.reserva_ativa);
        setSalasSemReserva(salasDisponiveis);

        setErrorFetchArena(false);
      } catch {
        setErrorFetchArena(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArenaData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedReserva = { ...novaReserva, [name]: value };
  
    if (name === "horario_inicio" || name === "horario_fim") {
      const { horario_inicio, horario_fim } = updatedReserva;
  
      if (horario_inicio && horario_fim) {
        const inicio = new Date(`1970-01-01T${horario_inicio}:00`);
        const fim = new Date(`1970-01-01T${horario_fim}:00`);
        const hoursDiff = (fim - inicio) / (1000 * 60 * 60);
  
        if (hoursDiff > 0) {
          updatedReserva.valor_total = parseFloat(dataToDisplay.preco_hora) * hoursDiff;
        } else {
          updatedReserva.valor_total = 0; // Evita valores negativos
        }
      }
    }
  
    setNovaReserva(updatedReserva);
  };
  

  const handleCriarReserva = async (e) => {
    e.preventDefault();
    try {
      const resposta = await ReservaService.criarReserva(novaReserva);
      alert(resposta.message);
      setNovaReserva({
        id_quadra: parseInt(id, 10),
        data_reserva: "",
        horario_inicio: "",
        horario_fim: "",
        valor_total: 0,
        id_sala: "",
      });
      setErrors([]); // Limpa os erros ao criar com sucesso
    } catch (error) {
      const apiErrors = error.response?.data?.errors || [];
      setErrors(apiErrors.map((err) => err.msg)); // Extrai mensagens de erro do retorno da API
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

  const dataToDisplay = errorFetchArena || !arenaData
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
                  min={new Date().toISOString().split("T")[0]} // Limita a seleção a partir de hoje
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start-time" className="form-label">
                  Começa
                </label>
                <select
                  name="horario_inicio"
                  value={novaReserva.horario_inicio}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecione</option>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="end-time" className="form-label">
                  Termina
                </label>
                <select
                  name="horario_fim"
                  value={novaReserva.horario_fim}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecione</option>
                  {generateTimeOptions(novaReserva.horario_inicio).map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="valor_total" className="form-label">
                  Valor Total
                </label>
                <input
                  type="number"
                  name="valor_total"
                  value={novaReserva.valor_total}
                  className="form-control"
                  readOnly
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Criar Reserva
              </button>
              {errors.length > 0 && (
                <div className="alert alert-danger mt-3">
                  {errors.map((error, index) => (
                    <p key={index} className="mb-1">
                      {error}
                    </p>
                  ))}
                </div>
              )}
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
