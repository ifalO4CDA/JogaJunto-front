import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ArenaInformacoes = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [arenaData, setArenaData] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Novos estados para os campos adicionais
  const [capacidade, setCapacidade] = useState(50); // Estado para o slider
  const [publica, setPublica] = useState(true); // Estado para o toggle
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [aceitouRegras, setAceitouRegras] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://sua-api.com/arenas/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar os dados da arena");
        return response.json();
      })
      .then((data) => {
        setArenaData(data);
        setError(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar a arena:", err);
        setError(true);
        setArenaData(undefined);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const placeholderData = {
    nome: "Arena Não Encontrada",
    descricao: "Desculpe, não encontramos informações sobre essa arena.",
    imagem: "https://via.placeholder.com/600x300?text=Arena+Não+Encontrada",
    precoHora: "Indisponível",
    esportes: [],
    comodidades: [],
    bairro: "Localização desconhecida",
  };

  const dataToDisplay = error || !arenaData ? placeholderData : arenaData;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Carregando informações da arena...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mt-5">
        <div className="col-md-8">
          <h2 className="mb-3">{dataToDisplay.nome}</h2>
          <img
            src={dataToDisplay.imagem}
            alt={dataToDisplay.nome}
            className="img-fluid rounded"
          />
          <p className="mt-3">{dataToDisplay.descricao}</p>

          {/* Esportes e Comodidades */}
          <div className="d-flex justify-content-start align-items-center mt-3">
            {dataToDisplay.esportes.map((esporte, index) => (
              <span key={index} className="badge bg-primary me-2">
                {esporte}
              </span>
            ))}
          </div>
          <div className="d-flex justify-content-start align-items-center mt-3">
            {dataToDisplay.comodidades.map((comodidade, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {comodidade}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <span className="text-muted">{dataToDisplay.bairro}</span>
            <br />
            {!error && <span className="text-warning">⭐ 4.1 | 30 comentários</span>}
          </div>
        </div>

        {/* Formulário de Reserva */}
        <div className="col-md-4">
          <div className="card p-3">
            <h3 className="text-center">{dataToDisplay.precoHora}</h3>
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

              {/* Capacidade */}
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

              {/* Toggle Pública */}
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

              {/* Termos e Condições */}
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
