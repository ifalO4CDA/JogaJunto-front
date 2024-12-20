import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SalasService } from "../../services/salaService"; // Importa o service
import "../../styles/pages/salas/salasInformacoes.css";

function SalasInformacoes() {
  const { id } = useParams(); // ID da sala vindo da rota
  const navigate = useNavigate(); // Hook para navegação
  const [sala, setSala] = useState(null); // Dados da sala
  const [membros, setMembros] = useState([]); // Lista de membros
  const [novoMembro, setNovoMembro] = useState(""); // Estado para o ID do novo membro
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null); // Controle de erros

  useEffect(() => {
    const fetchDadosSala = async () => {
      try {
        const salaData = await SalasService.getSalaPorId(id);
        setSala(salaData.data);

        const membrosData = await SalasService.getMembrosDaSala(id);
        setMembros(membrosData.data);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os dados da sala:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDadosSala();
  }, [id]);

  const handleAdicionarMembro = async () => {
    try {
      if (!novoMembro) {
        alert("Por favor, insira o ID do usuário.");
        return;
      }
  
      const resposta = await SalasService.adicionarMembro(id, novoMembro);
      console.log(resposta);
  
      // Atualiza a lista de membros
      const membrosAtualizados = await SalasService.getMembrosDaSala(id);
      setMembros(membrosAtualizados.data);
      setNovoMembro(""); // Limpa o campo
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      alert(error.response?.data?.message || "Erro ao adicionar membro. Verifique o ID.");
    }
  };
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!sala) return <p>Erro ao carregar as informações da sala.</p>;

  return (
    <div className="container mt-4 sala-informacoes-container">
      {/* Header da Sala */}
      <div className="sala-header text-center">
        <h2>Detalhes da Sala</h2>
        <h3>{sala.id_sala ? `Sala #${sala.id_sala}` : "Sala sem Nome"}</h3>
        <p>{sala.privada ? "Privada" : "Pública"}</p>
        {sala.criador && (
          <p>
            Criador: {sala.criador.nome} - {sala.criador.email}
          </p>
        )}
      </div>

      {/* Adicionar Membro */}
      <div className="adicionar-membro mb-4">
        <h5>Adicionar Membro à Sala</h5>
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

      {/* Membros da Sala */}
      <div className="sala-membros mb-4">
        <h5>Membros da Sala</h5>
        {membros.length > 0 ? (
          <ul className="list-group">
            {membros.map((membro) => (
              <li
                key={membro.id_usuario}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{membro.nome}</span>
                <span className="badge bg-primary rounded-pill">{membro.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há membros cadastrados nesta sala.</p>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="botoes-acoes mt-4 text-center">
        <button className="btn btn-danger mx-2">Excluir Sala</button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default SalasInformacoes;
