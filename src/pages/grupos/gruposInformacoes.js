import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GruposService } from "../../services/grupoService";
import "../../styles/pages/grupos/gruposInformacoes.css";

const GruposInformacoes = () => {
  const { id } = useParams(); // Obtém o ID do grupo da URL
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar informações do grupo e membros
  useEffect(() => {
    const fetchGrupoEParticipantes = async () => {
      try {
        const grupoResposta = await GruposService.getGrupoPorId(id);
        const membrosResposta = await GruposService.getMembrosDoGrupo(id);

        setGrupo(grupoResposta.data);
        setMembros(membrosResposta.data);
        setError(null);
      } catch (erro) {
        console.error("Erro ao buscar informações do grupo:", erro);
        setError("Erro ao carregar as informações do grupo.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrupoEParticipantes();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="container grupo-informacoes-container">
      <div className="grupo-header">
        <h1>{grupo.nome_grupo}</h1>
        <p>Criado em: {new Date(grupo.data_criacao).toLocaleDateString()}</p>
        <p>
          Criador: {grupo.id_criador} - Integrantes:{" "}
          {grupo.qtd_atual_integrantes} / {grupo.max_integrantes || "Sem limite"}
        </p>
      </div>

      <div className="membros-lista">
        <h3>Membros do Grupo</h3>
        {membros.length > 0 ? (
          membros.map((membro) => (
            <div key={membro.id_usuario} className="membro-item">
              <img
                src={membro.foto_perfil || "https://via.placeholder.com/150"}
                alt={membro.nome}
                className="membro-avatar"
              />
              <div>
                <p>{`${membro.nome} ${membro.sobrenome}`}</p>
                <p>{membro.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum membro encontrado.</p>
        )}
      </div>

      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Voltar
      </button>
    </div>
  );
};

export default GruposInformacoes;
