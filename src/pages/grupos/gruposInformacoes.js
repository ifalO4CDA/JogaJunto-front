import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EdicaoGrupoModal from "../../components/edicaoGrupoModal";
import ConviteGrupoModal from "../../components/conviteGrupoModal";
import "../../styles/pages/grupos/gruposInformacoes.css";

const GruposInformacoes = () => {
  const [grupoData, setGrupoData] = useState(null); // Dados do grupo
  const [linkConvite, setLinkConvite] = useState(""); // Link de convite
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isOwner, setIsOwner] = useState(true); // Simulação de validação do dono
  const [participantes, setParticipantes] = useState([
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Souza" },
    { id: 3, nome: "Carlos Lima" },
  ]);

  useEffect(() => {
    setLoading(true);
    fetch("https://api-placeholder.com/grupos/123") // Ajuste com sua URL real
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do grupo.");
        }
        return response.json();
      })
      .then((data) => {
        setGrupoData(data);
        setLinkConvite(data.linkConvite || "https://app.com/invite/abc123");
        setError(false);
      })
      .catch(() => {
        setError(true);
        // Dados padrão em caso de erro
        setGrupoData({
          foto: "https://via.placeholder.com/150",
          nome: "Grupo Não Encontrado",
          descricao: "Erro ao carregar informações do grupo.",
          participantes: [],
        });
        setLinkConvite("https://app.com/invite/erro123");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGerarNovoLink = () => {
    const novoLink = `https://app.com/invite/${Math.random().toString(36).substring(2, 8)}`;
    setLinkConvite(novoLink);
    console.log("Novo link gerado:", novoLink);
  };

  const handleSalvarEdicao = (dados) => {
    console.log("Dados atualizados:", dados);
    setShowEditModal(false);
    // Aqui seria feita a requisição para atualizar o grupo na API
  };

  if (loading) {
    return <div className="text-center mt-5">Carregando informações...</div>;
  }

  const removerParticipante = (id) => {
    setParticipantes((prev) => prev.filter((p) => p.id !== id));
  };

  const excluirGrupo = () => {
    alert("Grupo excluído com sucesso!");
    window.location.href = "/home";
  };

  return (
    <div className="container grupo-informacoes-container mt-5">
      {/* Header com imagem e informações */}
      <div className="grupo-header d-flex align-items-center">
        <img
          src={grupoData?.foto || "https://via.placeholder.com/150"}
          alt="Imagem do Grupo"
          className="grupo-imagem me-3"
        />
        <div>
          <h2>{grupoData?.nome}</h2>
          <p>{grupoData?.descricao}</p>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => setShowEditModal(true)}
          >
            Editar Grupo
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowInviteModal(true)}
          >
            Convidar
          </button>
        </div>
      </div>

      {/* Lista de Participantes */}
      <div className="mt-4">
        <h4>Participantes</h4>
        <ul className="participantes-lista list-unstyled">
          {grupoData?.participantes?.length > 0 ? (
            grupoData.participantes.map((p, index) => (
              <li
                key={index}
                className="d-flex align-items-center justify-content-between mb-2"
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={p.nome}
                    className="rounded-circle me-2"
                  />
                  <span>{p.nome}</span>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum participante encontrado.</p>
          )}
        </ul>
      </div>

      {/* Modais */}
      <EdicaoGrupoModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        dadosGrupo={grupoData}
        handleSalvar={handleSalvarEdicao}
      />

      <ConviteGrupoModal
        show={showInviteModal}
        handleClose={() => setShowInviteModal(false)}
        linkConvite={linkConvite}
        handleGerarNovoLink={handleGerarNovoLink}
      />
    </div>
  );
};

export default GruposInformacoes;
