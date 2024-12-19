import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/cardQuadra.css";

function CardQuadra({ id, imagem, nome, precoHora, bairro, tipo }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/arena/${id}`); // Navega para a rota /arena/:id
  };

  return (
    <div
      className="card-quadra"
      onClick={handleCardClick}
      role="button"
      tabIndex={0} // Torna o elemento acessível via teclado
      onKeyPress={(e) => e.key === "Enter" && handleCardClick()} // Suporte para "Enter" no teclado
    >
      <img
        src={imagem || "https://via.placeholder.com/150"}
        alt={nome}
        className="card-quadra-imagem"
      />
      <div className="card-quadra-conteudo">
        <h5 className="card-quadra-nome">{nome}</h5>
        <p className="card-quadra-preco">{precoHora}</p>
        <div className="card-quadra-detalhes">
          <span className="card-quadra-bairro">{bairro}</span>
          <span className="card-quadra-tipo">{tipo}</span>
        </div>
      </div>
    </div>
  );
}

export default CardQuadra;
