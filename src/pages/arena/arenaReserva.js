// Reservas.js
import React, { useState, useEffect } from "react";
import "../../styles/pages/arena/arenaReserva.css";

const Reservas = () => {
  const [filter, setFilter] = useState("todas");
  const [reservas, setReservas] = useState([
    { id: 1, nome: "Sala Estratégica", status: "ativa", valor: "R$ 50/H", local: "Centro", papel: "dono" },
    { id: 2, nome: "Sala de Reunião", status: "expirada", valor: "R$ 75/H", local: "Leste", papel: "participante" },
    { id: 3, nome: "Sala VIP", status: "ativa", valor: "R$ 100/H", local: "Oeste", papel: "participante" },
  ]);

  useEffect(() => {
    console.log("Reservas carregadas:", reservas);
  }, [reservas]);

  const filteredReservas = reservas.filter((reserva) => {
    if (filter === "ativas") return reserva.status === "ativa";
    if (filter === "expiradas") return reserva.status === "expirada";
    return true; // todas
  });

  return (
    <div>
      <div className="container">
        <h1 className="titulo left-align">Minhas Reservas</h1>
        <div className="filter-buttons">
          <button onClick={() => setFilter("todas")} className={filter === "todas" ? "active" : ""}>
            Todas
          </button>
          <button onClick={() => setFilter("ativas")} className={filter === "ativas" ? "active" : ""}>
            Ativas
          </button>
          <button onClick={() => setFilter("expiradas")} className={filter === "expiradas" ? "active" : ""}>
            Expiradas
          </button>
        </div>
      </div>

      <div className="reservas-list">
        {filteredReservas.length > 0 ? (
          filteredReservas.map((reserva) => (
            <div key={reserva.id} className="reserva-card">
              <div className="reserva-info">
                <h3>
                  {reserva.nome} {reserva.papel === "dono" && <span className="dono-flag">👑</span>}
                </h3>
                <p>Valor: {reserva.valor}</p>
                <p>Local: {reserva.local}</p>
                <p>
                  Status: <span className={`status ${reserva.status}`}>{reserva.status}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reservas">Nenhuma reserva encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Reservas;
