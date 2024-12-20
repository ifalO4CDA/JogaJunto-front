import React, { useEffect, useState } from "react";
import { ReservaService } from "../../services/reservaService";
import CardReserva from "../../components/cardReserva";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/pages/reserva/reservaTela.css";
import { Modal, Button, Form } from "react-bootstrap";

const ReservaTela = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [novaReserva, setNovaReserva] = useState({
    id_quadra: "",
    data_reserva: "",
    horario_inicio: "",
    horario_fim: "",
    valor_total: 0,
    id_sala: null,
  });

  useEffect(() => {
    const fetchReservasAtivas = async () => {
      try {
        const response = await ReservaService.getReservasAtivas();
        setReservas(response?.data || []);
        setError(false);
      } catch (err) {
        console.error("Erro ao buscar reservas ativas:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReservasAtivas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaReserva((prev) => ({ ...prev, [name]: value }));
  };

  const handleCriarReserva = async () => {
    try {
      await ReservaService.criarReserva(novaReserva);
      setShowModal(false);
      alert("Reserva criada com sucesso!");
      const response = await ReservaService.getReservasAtivas();
      setReservas(response?.data || []);
    } catch (err) {
      console.error("Erro ao criar reserva:", err);
      alert("Erro ao criar a reserva.");
    }
  };

  if (loading) {
    return (
      <div className="reserva-tela-container">
        <h2>Carregando reservas ativas...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reserva-tela-container">
        <h2>Erro ao carregar as reservas ativas.</h2>
      </div>
    );
  }

  return (
    <div className="reserva-tela">
      <header className="reserva-tela-header">
        <div className="reserva-header-text">
          <h2>Reservas Ativas</h2>
        </div>
        <div className="reserva-header-button">
          <Button
            className="btn-criar-reserva"
            onClick={() => setShowModal(true)}
          >
            Criar Reserva
          </Button>
        </div>
      </header>

      <div className="reserva-tela-conteudo">
        {reservas.length > 0 ? (
          <div className="reservas-lista">
            {reservas.map((reserva) => (
              <CardReserva key={reserva.id_reserva} reserva={reserva} />
            ))}
          </div>
        ) : (
          <p className="nenhuma-reserva">Nenhuma reserva ativa encontrada.</p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Criar Nova Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="idQuadra" className="mb-3">
              <Form.Label>Quadra</Form.Label>
              <Form.Control
                type="text"
                name="id_quadra"
                value={novaReserva.id_quadra}
                onChange={handleInputChange}
                placeholder="ID da quadra"
              />
            </Form.Group>
            <Form.Group controlId="dataReserva" className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="data_reserva"
                value={novaReserva.data_reserva}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="horarioInicio" className="mb-3">
              <Form.Label>Horário de Início</Form.Label>
              <Form.Control
                type="time"
                name="horario_inicio"
                value={novaReserva.horario_inicio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="horarioFim" className="mb-3">
              <Form.Label>Horário de Fim</Form.Label>
              <Form.Control
                type="time"
                name="horario_fim"
                value={novaReserva.horario_fim}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="valorTotal" className="mb-3">
              <Form.Label>Valor Total</Form.Label>
              <Form.Control
                type="number"
                name="valor_total"
                value={novaReserva.valor_total}
                onChange={handleInputChange}
                placeholder="Valor total da reserva"
              />
            </Form.Group>
            <Form.Group controlId="idSala" className="mb-3">
              <Form.Label>ID da Sala (opcional)</Form.Label>
              <Form.Control
                type="text"
                name="id_sala"
                value={novaReserva.id_sala || ""}
                onChange={handleInputChange}
                placeholder="ID da sala (se aplicável)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCriarReserva}>
            Criar Reserva
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservaTela;
