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
  const [erroAdicionar, setErroAdicionar] = useState(null); // Mensagem de erro ao adicionar membro
  const [erroExcluir, setErroExcluir] = useState(null); // Mensagem de erro ao excluir grupo

  useEffect(() => {
    const fetchGrupoEParticipantes = async () => {
      try {
        const grupoResposta = await GruposService.getGrupoPorId(id);
        const membrosResposta = await GruposService.getMembrosDoGrupo(id);

        setGrupo(grupoResposta.data || {});
        setMembros(membrosResposta.data || []);
        setError(null);
      } catch (erro) {
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
      setErroAdicionar(null);
    } catch (error) {
      setErroAdicionar(error.response?.data?.message);
    }
  };

  const handleExcluirGrupo = async () => {
    const idUsuario = localStorage.getItem("id"); // Obtém o ID do usuário logado
  
    try {
      await GruposService.excluirGrupo({ id_grupo: parseInt(id, 10), id_usuario: parseInt(idUsuario, 10) });
      navigate("/grupos"); // Redireciona para a lista de grupos
    } catch (error) {
      setErroExcluir(error.response?.data?.message || "Erro ao excluir o grupo. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error)
    return (
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
          Criado em: {grupo.data_criacao ? new Date(grupo.data_criacao).toLocaleDateString() : "Data desconhecida"}
        </p>
        <p>
          Criador: {grupo.id_criador || "Desconhecido"} - Integrantes: {grupo.qtd_atual_integrantes || 0} / {grupo.max_integrantes || "Sem limite"}
        </p>
      </div>

      {erroExcluir && <div className="alert alert-danger">{erroExcluir}</div>}

      {/* Adicionar Membro */}
      <div className="adicionar-membro mb-4">
        <h5>Adicionar Membro ao Grupo</h5>
        {erroAdicionar && <div className="alert alert-danger">{erroAdicionar}</div>}
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

      <div className="botoes-acoes mt-4 text-center">
        <button className="btn btn-danger mx-2" onClick={handleExcluirGrupo}>
          Excluir Grupo
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate("/")}>Voltar</button>
      </div>
    </div>
  );
};

export default GruposInformacoes;
