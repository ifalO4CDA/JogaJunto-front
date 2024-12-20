import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArenaService } from "../../services/arenaService";
import CardQuadra from "../../components/cardQuadra";
import "../../styles/pages/arena/arenasDisponiveis.css";

const ArenasDisponiveis = () => {
  const { id_sala, id_arena } = useParams();
  const navigate = useNavigate();
  const [quadras, setQuadras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuadras = async () => {
      try {
        const response = await ArenaService.getCourts();
        setQuadras(response.data);
        setError(false);
      } catch (err) {
        console.error("Erro ao buscar quadras disponíveis:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuadras();
  }, []);

  const handleSelecionarQuadra = (idQuadra) => {
    navigate(`/arena/${idQuadra}`, { state: { idSala: id_sala } });
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h4>Carregando quadras...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">Erro ao carregar quadras disponíveis.</p>
      </div>
    );
  }

  return (
    <div className="quadras-page-container">
      <div className="quadras-title-box">
        <h2>Quadras Disponíveis</h2>
      </div>
      <div className="quadras-list-container">
        {quadras.length > 0 ? (
          quadras.map((quadra) => (
            <div key={quadra.id_quadra} className="quadra-card-wrapper">
              <CardQuadra
                id={quadra.id_quadra}
                imagem={quadra.imagem}
                nome={quadra.nome}
                precoHora={`R$ ${parseFloat(quadra.preco_hora).toFixed(2)}`}
                bairro={quadra.bairro}
                tipo={quadra.tipo}
                onClick={() => handleSelecionarQuadra(quadra.id_quadra)}
              />
            </div>
          ))
        ) : (
          <p className="text-muted">Nenhuma quadra disponível no momento.</p>
        )}
      </div>
    </div>
  );
};

export default ArenasDisponiveis;
