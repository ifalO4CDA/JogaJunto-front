import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaService } from "../../services/arenaService";

const ArenaInformacoes = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [arenaData, setArenaData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [capacidade, setCapacidade] = useState(50);
  const [publica, setPublica] = useState(true);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [aceitouRegras, setAceitouRegras] = useState(false);

  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        const response = await ArenaService.getArenaById(id);
        setArenaData(response.data);
        setError(false);
      } catch (err) {
        console.error("Erro ao buscar informações da arena:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArenaData();
  }, [id]);

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

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Carregando informações da arena...</h2>
      </div>
    );
  }

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
            <form>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Data
                </label>
                <input type="date" className="form-control" id="date" />
              </div>
              <div className="mb-3">
                <label htmlFor="start-time" className="form-label">
                  Começa
                </label>
                <input type="time" className="form-control" id="start-time" />
              </div>
              <div className="mb-3">
                <label htmlFor="end-time" className="form-label">
                  Termina
                </label>
                <input type="time" className="form-control" id="end-time" />
              </div>

              <div className="mb-3">
                <label htmlFor="capacidade" className="form-label">
                  Capacidade de Pessoas: {capacidade}
                </label>
                <input
                  type="range"
                  className="form-range"
                  id="capacidade"
                  min="0"
                  max="30"
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                />
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="publica"
                  checked={publica}
                  onChange={() => setPublica(!publica)}
                />
                <label className="form-check-label" htmlFor="publica">
                  Pública
                </label>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="aceitoTermos"
                    checked={aceitouTermos}
                    onChange={() => setAceitouTermos(!aceitouTermos)}
                  />
                  <label className="form-check-label" htmlFor="aceitoTermos">
                    Aceito os termos dos contratos
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="aceitoRegras"
                    checked={aceitouRegras}
                    onChange={() => setAceitouRegras(!aceitouRegras)}
                  />
                  <label className="form-check-label" htmlFor="aceitoRegras">
                    Aceito as regras do estabelecimento
                  </label>
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={!aceitouTermos || !aceitouRegras}
              >
                Reservar Agora
              </button>
            </form>
            <p className="text-center text-muted mt-2">
              Você ainda não será cobrado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaInformacoes;
