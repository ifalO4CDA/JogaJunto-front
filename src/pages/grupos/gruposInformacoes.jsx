import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GruposService } from "../../services/grupoService";
import "../../styles/pages/grupos/gruposInformacoes.css";

const GruposInformacoes = () => {
  const { id } = useParams(); // Obtém o ID do grupo da URL
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [membros, setMembros] = useState([]);
  const [novoMembro, setNovoMembro] = useState(""); // Estado para o ID do novo membro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrupoEParticipantes = async () => {
      try {
        const grupoResposta = await GruposService.getGrupoPorId(id);
        const membrosResposta = await GruposService.getMembrosDoGrupo(id);

        setGrupo(grupoResposta.data || {});
        setMembros(membrosResposta.data || []);
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

  const handleAdicionarMembro = async () => {
    try {
      await GruposService.adicionarMembro({
        id_grupo: id,
        id_usuario: novoMembro,
        acao: "adicionar",
      });
      const membrosAtualizados = await GruposService.getMembrosDoGrupo(id);
      setMembros(membrosAtualizados.data);
      setNovoMembro("");
      alert("Usuário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      alert("Erro ao adicionar membro ao grupo.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Voltar para a página inicial
      </button>
    </div>
  );

  return (
    <div className="container grupo-informacoes-container">
      <div className="grupo-header">
        <h1>{grupo.nome_grupo || "Grupo sem nome"}</h1>
        <p>
          Criado em:{" "}
          {grupo.data_criacao
            ? new Date(grupo.data_criacao).toLocaleDateString()
            : "Data desconhecida"}
        </p>
        <p>
          Criador: {grupo.id_criador || "Desconhecido"} - Integrantes:{" "}
          {grupo.qtd_atual_integrantes || 0} / {grupo.max_integrantes || "Sem limite"}
        </p>
      </div>

      {/* Adicionar Membro */}
      <div className="adicionar-membro mb-4">
        <h5>Adicionar Membro ao Grupo</h5>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="ID do Usuário"
            value={novoMembro}
            onChange={(e) => setNovoMembro(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAdicionarMembro}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="membros-lista">
        <h3>Membros do Grupo</h3>
        <div className="membros-view"> 
          {membros.length > 0 ? (
            membros.map((membro) => (
              <div key={membro.id_usuario} className="membro-item">
                <img
                  src={membro.foto_perfil || "https://via.placeholder.com/150"}
                  alt={membro.nome}
                  className="membro-avatar"
                />
                <div>
                  <p>{`${membro.nome || "Nome"} ${membro.sobrenome || ""}`}</p>
                  <p>{membro.email || "E-mail não disponível"}</p>
                </div>
              </div>
            ))  
          ) : (
            <p>Nenhum membro encontrado.</p>
          )}
        </div>
      </div>

      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Voltar
      </button>
    </div>
  );
};

export default GruposInformacoes;
