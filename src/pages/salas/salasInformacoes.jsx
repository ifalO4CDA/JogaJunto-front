import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SalasService } from "../../services/salaService";
import { ReservaService } from "../../services/reservaService";
import "../../styles/pages/salas/salasInformacoes.css";

function SalasInformacoes() {
  const { id } = useParams(); // ID da sala vindo da rota
  const navigate = useNavigate(); // Hook para navegação
  const [sala, setSala] = useState(null); // Dados da sala
  const [membros, setMembros] = useState([]); // Lista de membros
  const [novoMembro, setNovoMembro] = useState(""); // Estado para o ID do novo membro
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [errorSala, setErrorSala] = useState(null); // Erro ao buscar sala
  const [errorMembros, setErrorMembros] = useState(null); // Erro ao buscar membros
  const [errorReserva, setErrorReserva] = useState(null); // Erro ao buscar reserva
  const [reserva, setReserva] = useState(null); // Dados da reserva ativa

  const handleExcluirSala = async () => {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir esta sala?");
    if (!confirmacao) return;

    try {
      await SalasService.excluirSala(id); // Requisição DELETE
      navigate("/salas"); // Redireciona para a lista de salas
    } catch (error) {
      console.error("Erro ao excluir a sala:", error);
      alert(error.response?.data?.message || "Erro ao excluir a sala. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchSala = async () => {
      try {
        const salaData = await SalasService.getSalaPorId(id);
        setSala(salaData);
        setErrorSala(null);
      } catch (err) {
        console.error("Erro ao buscar informações da sala:", err);
        setErrorSala("Erro ao carregar os dados da sala.");
      }
    };

    const fetchMembros = async () => {
      try {
        const membrosData = await SalasService.getMembrosDaSala(id);
        setMembros(membrosData);
        setErrorMembros(null);
      } catch (err) {
        console.error("Erro ao buscar membros da sala:", err);
        setErrorMembros("Erro ao carregar a lista de membros.");
      }
    };

    const fetchReserva = async () => {
      try {
        const reservaData = await ReservaService.getReservaAtiva(id);
        if (reservaData.data.length > 0) {
          setReserva(reservaData.data[0]);
        } else {
          setReserva(null);
        }
        setErrorReserva(null);
      } catch (err) {
        console.error("Erro ao buscar reserva ativa:", err);
        setErrorReserva("Erro ao carregar a reserva ativa.");
      }
    };

    const fetchDados = async () => {
      setLoading(true);
      await fetchSala();
      await fetchMembros();
      await fetchReserva();
      setLoading(false);
    };

    fetchDados();
  }, [id]);

  const handleAdicionarMembro = async () => {
    try {
      if (!novoMembro.trim()) {
        alert("Por favor, insira o ID do usuário.");
        return;
      }

      await SalasService.adicionarMembro(id, novoMembro);

      // Atualiza a lista de membros
      const membrosAtualizados = await SalasService.getMembrosDaSala(id);
      setMembros(membrosAtualizados);
      setNovoMembro(""); // Limpa o campo
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      alert(error.response?.data?.message || "Erro ao adicionar membro. Verifique o ID.");
    }
  };

  const handleCriarReserva = () => {
    navigate(`/sala/${id}/arena/${sala?.id_sala || ""}`); // Redireciona para a tela de seleção de quadras
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container mt-4 sala-informacoes-container">
      {/* Header da Sala */}
      <div className="sala-header text-center">
        <h2>Detalhes da Sala</h2>
        {errorSala ? (
          <p className="text-danger">{errorSala}</p>
        ) : (
          <>
            <h3>{sala?.id_sala ? `Sala #${sala.id_sala}` : "Sala sem Nome"}</h3>
            <p>{sala?.privada ? "Privada" : "Pública"}</p>
            {sala?.criador && (
              <p>
                Criador: {sala.criador.nome} - {sala.criador.email}
              </p>
            )}
          </>
        )}
      </div>

      {/* Reserva */}
      <div className="reserva-secao mb-4">
        <h5>Reserva</h5>
        {errorReserva ? (
          <p className="text-danger">{errorReserva}</p>
        ) : reserva ? (
          <div
            className="card p-3 mb-3 shadow-sm reserva-card"
            onClick={() => navigate(`/reservas/${reserva.id_reserva}`)}
            style={{ cursor: "pointer" }}
          >
            <p>
              <strong>Data:</strong> {reserva.data_reserva}
            </p>
            <p>
              <strong>Horário:</strong> {reserva.horario_inicio} - {reserva.horario_fim}
            </p>
            <p>
              <strong>Valor Total:</strong> R$ {parseFloat(reserva.valor_total).toFixed(2)}
            </p>
          </div>
        ) : (
          <button className="btn btn-success" onClick={handleCriarReserva}>
            Criar Reserva
          </button>
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
        {errorMembros ? (
          <p className="text-danger">{errorMembros}</p>
        ) : membros.length > 0 ? (
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
        <button className="btn btn-danger mx-2" onClick={handleExcluirSala}>
          Excluir Sala
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate("/salas")}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default SalasInformacoes;
