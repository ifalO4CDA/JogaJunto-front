import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/cardSala.css"; // Crie um estilo específico para este card

function CardSala({ id, imagem, nome, maxIntegrantes, qtdAtualIntegrantes, privada, reservaAtiva, grupo }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/salas/informacoes/${id}`); // Navega para a rota /sala/:id
  };

  return (
    <div
      className="card-sala"
      onClick={handleCardClick}
      role="button"
      tabIndex={0} // Torna o elemento acessível via teclado
      onKeyPress={(e) => e.key === "Enter" && handleCardClick()} // Suporte para "Enter" no teclado
    >
      <img src={imagem || "https://via.placeholder.com/150"} alt={nome} className="card-sala-imagem" />
      <div className="card-sala-conteudo">
        <h5 className="card-sala-nome">{nome || "Sala sem Nome"}</h5>
        <p className="card-sala-info">
          {privada ? "Privada" : "Pública"} | {reservaAtiva ? "Ativa" : "Inativa"}
        </p>
        <p className="card-sala-integrantes">
          {qtdAtualIntegrantes}/{maxIntegrantes} Integrantes
        </p>
        {grupo && <p className="card-sala-grupo">Grupo: {grupo.nome_grupo}</p>}
      </div>
    </div>
  );
}

export default CardSala;
