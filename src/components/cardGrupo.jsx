import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/cardGrupo.css";

function CardGrupo({ id, nome, maxIntegrantes, qtdAtualIntegrantes }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/grupos/informacoes/${id}`); // Navega para a rota do grupo
  };

  return (
    <div
      className="card-grupo"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleCardClick()}
    >
      <div className="card-grupo-conteudo">
        <h5 className="card-grupo-nome">{nome}</h5>
        <p className="card-grupo-integrantes">
          {qtdAtualIntegrantes}/{maxIntegrantes || "∞"} Integrantes
        </p>
      </div>
    </div>
  );
}

export default CardGrupo;
