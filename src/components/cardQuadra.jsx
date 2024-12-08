import React from "react";
import "../styles/components/cardQuadra.css";

import FotoQuadra from "../assets/fotoQuadra.png";

function CardQuadra({ imagem, nome, precoHora, bairro, tipo }) {
  return (
    <a href="#" className="card-quadra">
      <img src={imagem} alt={nome} className="card-quadra-imagem" />
      <div className="card-quadra-conteudo">
        <h5 className="card-quadra-nome">{nome}</h5>
        <p className="card-quadra-preco">{precoHora}</p>
        <div className="card-quadra-detalhes">
          <span className="card-quadra-bairro">{bairro}</span>
          <span className="card-quadra-tipo">{tipo}</span>
        </div>
      </div>
    </a>
  );
}

export default CardQuadra;
