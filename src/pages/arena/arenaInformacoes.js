import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ArenaInformacoes = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [arenaData, setArenaData] = useState(undefined); // Estado para os dados da arena
  const [error, setError] = useState(false); // Estado para indicar erro na requisição
  const [loading, setLoading] = useState(true); // Estado para controlar carregamento

  useEffect(() => {
    // Simulação de futura requisição à API
    setLoading(true);
    fetch(`http://sua-api.com/arenas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da arena");
        }
        return response.json();
      })
      .then((data) => {
        setArenaData(data); // Define os dados retornados pela API
        setError(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar a arena:", err);
        setError(true); // Define o estado de erro
        setArenaData(undefined); // Garante que arenaData seja undefined no erro
      })
      .finally(() => {
        setLoading(false); // Carregamento concluído
      });
  }, [id]);

  // Placeholder para "Arena Não Encontrada"
  const placeholderData = {
    nome: "Arena Não Encontrada",
    descricao: "Desculpe, não encontramos informações sobre essa arena.",
    imagem: "https://via.placeholder.com/600x300?text=Arena+Não+Encontrada",
    precoHora: "Indisponível",
    esportes: [],
    comodidades: [],
    bairro: "Localização desconhecida",
  };

  // Se está carregando, exibe mensagem de carregamento
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Carregando informações da arena...</h2>
      </div>
    );
  }

  // Use os dados ou o placeholder em caso de erro
  const dataToDisplay = error || !arenaData ? placeholderData : arenaData;

  return (
    <div className="container mt-4">
      <div className="row mt-5">
        {/* Informações da Arena */}
        <div className="col-md-8">
          <h2 className="mb-3">{dataToDisplay.nome}</h2>
          <img
            src={dataToDisplay.imagem}
            alt={dataToDisplay.nome}
            className="img-fluid rounded"
          />
          <p className="mt-3">{dataToDisplay.descricao}</p>

          {/* Esportes Disponíveis */}
          <div className="d-flex justify-content-start align-items-center mt-3">
            {dataToDisplay.esportes.map((esporte, index) => (
              <span key={index} className="badge bg-primary me-2">
                {esporte}
              </span>
            ))}
          </div>

          {/* Comodidades */}
          <div className="d-flex justify-content-start align-items-center mt-3">
            {dataToDisplay.comodidades.map((comodidade, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {comodidade}
              </span>
            ))}
          </div>

          {/* Bairro e Avaliações */}
          <div className="mt-4">
            <span className="text-muted">{dataToDisplay.bairro}</span>
            <br />
            {!error && <span className="text-warning">⭐ 4.1 | 30 comentários</span>}
          </div>
        </div>

        {/* Formulário de Reserva */}
        {!error && (
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
                <button className="btn btn-primary w-100">Reservar Agora</button>
              </form>
              <p className="text-center text-muted mt-2">
                Você ainda não será cobrado
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArenaInformacoes;
