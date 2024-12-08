import React from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import MapaInterativo from "../../components/mapaInterativo";
import CardQuadras from "../../components/cardQuadra";
import "../../styles/pages/home/homePage.css"; // CSS sempre por último

import FotoQuadra from "../../assets/fotoQuadra.png";

function HomePage() {
  const quadras = [
    {
      imagem: "URL_DA_IMAGEM_1",
      nome: "Santíssimo Senhor",
      precoHora: "R$ 80/H",
      bairro: "Serraria",
      tipo: "Futsal",
    },
    {
      imagem: "URL_DA_IMAGEM_2",
      nome: "Arena Central",
      precoHora: "R$ 100/H",
      bairro: "Centro",
      tipo: "Vôlei",
    },
    {
      imagem: "URL_DA_IMAGEM_3",
      nome: "Quadra Esportiva",
      precoHora: "R$ 70/H",
      bairro: "Jatiúca",
      tipo: "Basquete",
    },
    {
      imagem: "URL_DA_IMAGEM_4",
      nome: "Quadra Verde",
      precoHora: "R$ 60/H",
      bairro: "Pajuçara",
      tipo: "Tênis",
    },
  ];

  return (
    <div className="home-page">
      {/* Barra de Pesquisa */}
      <div className="search-bar-container">
        <BarraDePesquisa />
      </div>

      {/* Seção Explorar com o mapa */}
      <section className="explorar-section">
        <h4 className="section-title">Explorar</h4>
        <MapaInterativo />
      </section>

      {/* Seção Perto de Você */}
      <section className="near-you-section">
        <h4 className="section-title">Perto de você</h4>
        <div className="quadras-container">
          {quadras.map((quadra, index) => (
            <CardQuadras
              key={index}
              imagem={FotoQuadra}
              nome={quadra.nome}
              precoHora={quadra.precoHora}
              bairro={quadra.bairro}
              tipo={quadra.tipo}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
