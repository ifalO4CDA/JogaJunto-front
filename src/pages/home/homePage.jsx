import React, { useState } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import MapaInterativo from "../../components/mapaInterativo";
import CardQuadra from "../../components/cardQuadra"; // Importa o componente ajustado
import "../../styles/pages/home/homePage.css"; // CSS sempre por último

function HomePage() {
  const [searchData, setSearchData] = useState({
    atividade: "",
    data: "",
    horaInicio: "",
    horaFim: "",
  });

  const handleSearch = () => {
    console.log("Buscar com os valores: ", searchData);
  };

  const camposPesquisa = [
    {
      label: "Sua atividade física",
      type: "text",
      placeholder: "Onde?",
      onChange: (value) => setSearchData((prev) => ({ ...prev, atividade: value })),
    },
    {
      label: "Data",
      type: "date",
      placeholder: "Quando?",
      onChange: (value) => setSearchData((prev) => ({ ...prev, data: value })),
    },
    {
      label: "Hora de início",
      type: "time",
      placeholder: "Começa?",
      onChange: (value) => setSearchData((prev) => ({ ...prev, horaInicio: value })),
    },
    {
      label: "Hora de fim",
      type: "time",
      placeholder: "Termina?",
      onChange: (value) => setSearchData((prev) => ({ ...prev, horaFim: value })),
    },
  ];

  const quadras = [
    {
      imagem: "https://via.placeholder.com/150", // Imagem placeholder
      nome: "Santíssimo Senhor",
      precoHora: "R$ 80/H",
      bairro: "Serraria",
      tipo: "Futsal",
    },
    {
      imagem: "https://via.placeholder.com/150", // Imagem placeholder
      nome: "Arena Central",
      precoHora: "R$ 100/H",
      bairro: "Centro",
      tipo: "Vôlei",
    },
    {
      imagem: "https://via.placeholder.com/150", // Imagem placeholder
      nome: "Quadra Esportiva",
      precoHora: "R$ 70/H",
      bairro: "Jatiúca",
      tipo: "Basquete",
    },
    {
      imagem: "https://via.placeholder.com/150", // Imagem placeholder
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
        <BarraDePesquisa campos={camposPesquisa} onSearch={handleSearch} />
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
            <CardQuadra
              key={index}
              imagem={quadra.imagem}
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
