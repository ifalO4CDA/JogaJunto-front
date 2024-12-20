import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CardReserva = ({ reserva }) => {
  if (!reserva) {
    return null; // Evita erros caso a reserva não esteja definida
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Reserva #{reserva.id_reserva}</h5>
        <p className="card-text">
          <strong>Quadra:</strong> {reserva.id_quadra}
        </p>
        <p className="card-text">
          <strong>Data:</strong> {new Date(reserva.data_reserva).toLocaleDateString()}
        </p>
        <p className="card-text">
          <strong>Horário:</strong> {reserva.horario_inicio} - {reserva.horario_fim}
        </p>
        <p className="card-text">
          <strong>Status:</strong> {reserva.status}
        </p>
        <p className="card-text">
          <strong>Valor Total:</strong> R$ {parseFloat(reserva.valor_total).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CardReserva;
