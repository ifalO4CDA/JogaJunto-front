import React, { useState, useEffect } from "react";
import BarraDePesquisa from "../../components/barraDePesquisa";
import MapaInterativo from "../../components/mapaInterativo";
import CardQuadra from "../../components/cardQuadra"; // Importa o componente ajustado
import { ArenaService } from "../../services/arenaService"; // Serviço para manipular arenas
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
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchQuadras = async () => {
      setLoading(true);
      try {
        const resposta = await ArenaService.getCourts();
        setQuadras(resposta.data); // Define os dados retornados pela API
        setError(false);
      } catch (err) {
        console.error("Erro ao buscar quadras:", err);
        setError(true); // Define o estado de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchQuadras();
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
        {loading ? (
          <p>Carregando quadras...</p>
        ) : error ? (
          <p className="text-danger">Erro ao carregar as quadras.</p>
        ) : (
          <div className="quadras-container">
          {quadras.map((quadra) => (
            <CardQuadra
              key={quadra.id_quadra}
              id={quadra.id_quadra}
              imagem="https://via.placeholder.com/150" // Ajuste para imagens reais, se houver
              nome={quadra.nome || "Quadra Sem Nome"}
              precoHora={`R$ ${parseFloat(quadra.preco_hora).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })} /h`}
              bairro={quadra.address?.bairro || "Localização não disponível"}
              tipo={quadra.tipo || "Tipo não especificado"}
            />
          ))}
        </div>
        
        )}
      </section>
    </div>
  );
}

export default HomePage;
