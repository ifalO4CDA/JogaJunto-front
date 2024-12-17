import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardQuadra from "../../components/cardQuadra";
import ModalConvite from "../../components/modalConvite";
import EdicaoSalaModal from "../../components/edicaoSalaModal";
import "../../styles/pages/salas/salasInformacoes.css";


const SalaInformacoes = () => {
  const [isOwner, setIsOwner] = useState(true); // Simula se o usuário é dono da sala
  const [participantes, setParticipantes] = useState([
    { id: 1, nome: "João Silva", foto: "https://via.placeholder.com/40", confirmado: false },
    { id: 2, nome: "Maria Souza", foto: "https://via.placeholder.com/40", confirmado: false },
    { id: 3, nome: "Carlos Lima", foto: "https://via.placeholder.com/40", confirmado: false },
  ]);
  const [showModalEdicao, setShowModalEdicao] = useState(false);
  const [showModalConvite, setShowModalConvite] = useState(false);

  // Estado da reserva
  const [reserva, setReserva] = useState({
    quadra: {
      id: 1,
      imagem: "https://via.placeholder.com/150",
      nome: "Arena Central",
      precoHora: "R$ 200/H",
      bairro: "Centro",
      tipo: "Futsal",
    },
    dia: "2024-06-20",
    horario: "18:00 - 20:00",
    capacidade: 10, // Capacidade máxima
  });

  // Calcular progresso baseado em confirmações
  const participantesConfirmados = participantes.filter((p) => p.confirmado).length;
  const progresso = Math.round((participantesConfirmados / reserva.capacidade) * 100);

  // Função para confirmar pagamento
  const confirmarPagamento = (id) => {
    setParticipantes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, confirmado: true } : p
      )
    );
  };

  const salaAtual = {
    foto: "https://via.placeholder.com/150",
    nome: "Sala de Treinamento",
    cidade: "Maceió",
    bairro: "Centro",
    tipo: "Reunião",
  };

  const salvarAlteracoes = (dados) => {
    console.log("Dados atualizados da sala:", dados);
    setShowModalEdicao(false);
  };

  return (
    <div className="container mt-4 sala-informacoes-container">
      {/* Header */}
      <div className="sala-header text-center">
        <h2>Nome da Sala</h2>
        {isOwner && (
          <div className="sala-acoes">
            <button className="btn btn-primary btn-menor" onClick={() => setShowModalConvite(true)}>Convidar</button>
            <button className="btn btn-warning btn-menor" onClick={() => setShowModalEdicao(true)}>Editar</button>
            <button className="btn btn-danger btn-menor">Excluir</button>
          </div>
        )}
      </div>

      {showModalConvite && (
        <ModalConvite
          onClose={() => setShowModalConvite(false)}
          tipo="sala" // Pode ser "sala" ou "grupo"
          nome="Nome da Sala/Grupo"
        />
      )}

      {showModalEdicao && (
        <EdicaoSalaModal
          show={showModalEdicao}
          handleClose={() => setShowModalEdicao(false)}
          dadosSala={salaAtual}
          handleSalvar={salvarAlteracoes}
        />
      )}

      {/* Reserva */}
      <div className="reserva-container mb-4">
        <h5 className="text-center mb-3">Reserva da Quadra</h5>
        <CardQuadra
          id={reserva.quadra.id}
          imagem={reserva.quadra.imagem}
          nome={reserva.quadra.nome}
          precoHora={reserva.quadra.precoHora}
          bairro={reserva.quadra.bairro}
          tipo={reserva.quadra.tipo}
        />
        {/* Progresso */}
        <div className="mt-3">
          <label className="d-block text-center">
            Confirmação de Pagamento ({participantesConfirmados} / {reserva.capacidade})
          </label>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Participantes */}
      <div className="participantes-container">
        <h5>Participantes</h5>
        {participantes.map((p) => (
          <div key={p.id} className="participantes-item">
            <div className="participantes-info">
              <img src={p.foto} alt={p.nome} />
              <span>
                {p.nome}{" "}
                {p.confirmado ? (
                  <span className="badge bg-success ms-2">Confirmado</span>
                ) : (
                  <span className="badge bg-secondary ms-2">Pendente</span>
                )}
              </span>
            </div>
            {!p.confirmado && (
              <button
                className="btn btn-sm btn-success btn-confirmar-pagamento"
                onClick={() => confirmarPagamento(p.id)}
              >
                Confirmar Pagamento
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Botões Finais */}
      <div className="botoes-gerais mt-4">
        <button className="btn btn-success btn-importante">Confirmar Participação</button>
        <button className="btn btn-danger btn-importante">Sair da Sala</button>
      </div>
    </div>
  );
};

export default SalaInformacoes;
