import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/cardGrupo.css";

function CardGrupo({ id, nome, maxIntegrantes, qtdAtualIntegrantes, criador }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/grupos/informacoes/${id}`); // Redireciona com o ID do grupo
  };

  return (
    <div
      className="card-grupo"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleCardClick()}
    >
      <img
        src="https://via.placeholder.com/300x150"
        alt={`Grupo ${nome}`}
        className="card-grupo-imagem"
      />
      <div className="card-grupo-conteudo">
        <h5 className="card-grupo-nome">{nome || "Grupo sem Nome"}</h5>
        <p className="card-grupo-info">Criador: {criador}</p>
        <p className="card-grupo-integrantes">
          {qtdAtualIntegrantes}/{maxIntegrantes || "∞"} Integrantes
        </p>
      </div>
    </div>
  );
}

export default CardGrupo;
