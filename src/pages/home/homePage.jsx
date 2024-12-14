import React, { useState, useEffect } from "react";
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

  const [quadras, setQuadras] = useState([]); // Estado para armazenar as quadras
  const [error, setError] = useState(false); // Estado para identificar erros

  useEffect(() => {
    // Requisição para obter as quadras
    /*
    fetch("http://sua-api.com/quadras")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar quadras");
        }
        return response.json();
      })
      .then((data) => {
        setQuadras(data); // Define os dados retornados pela API
        setError(false); // Reseta o erro caso a requisição tenha sucesso
      })
      .catch((err) => {
        console.error("Erro ao buscar quadras:", err);
        setError(true); // Define o estado de erro
      });
    */

    // Temporariamente usando dados de fallback
    setQuadras([
      {
        id: 1,
        imagem: "https://via.placeholder.com/150",
        nome: "Santíssimo Senhor",
        precoHora: "R$ 80/H",
        bairro: "Serraria",
        tipo: "Futsal",
      },
      {
        id: 2,
        imagem: "https://via.placeholder.com/150",
        nome: "Arena Central",
        precoHora: "R$ 100/H",
        bairro: "Centro",
        tipo: "Vôlei",
      },
      {
        id: 3,
        imagem: "https://via.placeholder.com/150",
        nome: "Quadra Esportiva",
        precoHora: "R$ 70/H",
        bairro: "Jatiúca",
        tipo: "Basquete",
      },
      {
        id: 4,
        imagem: "https://via.placeholder.com/150",
        nome: "Quadra Verde",
        precoHora: "R$ 60/H",
        bairro: "Pajuçara",
        tipo: "Tênis",
      },
    ]);
  }, []);

  const handleSearch = () => {
    console.log("Buscar com os valores: ", searchData);
  };

  const camposPesquisa = [
    {
      label: "Sua atividade física",
      type: "text",
      placeholder: "Onde?",
      onChange: (value) =>
        setSearchData((prev) => ({ ...prev, atividade: value })),
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
      onChange: (value) =>
        setSearchData((prev) => ({ ...prev, horaInicio: value })),
    },
    {
      label: "Hora de fim",
      type: "time",
      placeholder: "Termina?",
      onChange: (value) =>
        setSearchData((prev) => ({ ...prev, horaFim: value })),
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
        {error ? (
          <p className="text-danger">Erro ao carregar as quadras.</p>
        ) : (
          <div className="quadras-container">
            {quadras.map((quadra) => (
              <CardQuadra
                key={quadra.id}
                id={quadra.id} // Adiciona o ID para navegação
                imagem={quadra.imagem}
                nome={quadra.nome}
                precoHora={quadra.precoHora}
                bairro={quadra.bairro}
                tipo={quadra.tipo}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
