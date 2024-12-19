import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GruposService } from "../../services/grupoService";
import "../../styles/pages/grupos/gruposInformacoes.css";

const GruposInformacoes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const resposta = await GruposService.getGrupoPorId(id);
        setGrupo(resposta.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar grupo:", error);
        setLoading(false);
      }
    };

    fetchGrupo();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!grupo) {
    return <p>Erro ao carregar as informações do grupo.</p>;
  }

  return (
    <div className="grupo-informacoes-container">
      <h2>{grupo.nome_grupo}</h2>
      <p>ID Criador: {grupo.id_criador}</p>
      <p>Data de Criação: {new Date(grupo.data_criacao).toLocaleDateString()}</p>
      <p>
        Integrantes: {grupo.qtd_atual_integrantes}/{grupo.max_integrantes || "∞"}
      </p>

      <button className="btn btn-secondary" onClick={() => navigate("/grupos")}>
        Voltar
      </button>
    </div>
  );
};

export default GruposInformacoes;
