import React from "react";
import "../styles/components/barraDePesquisa.css";

function BarraDePesquisa() {
  return (
    <div className="barra-de-pesquisa">
      <div className="input-group">
        <label className="input-label">Sua atividade física</label>
        <input
          type="text"
          placeholder="Onde?"
          className="search-input"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Data</label>
        <input
          type="date"
          placeholder="Quando?"
          className="search-input"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Hora de início</label>
        <input
          type="time"
          placeholder="Começa?"
          className="search-input"
        />
      </div>
      <div className="input-group">
        <label className="input-label">Hora de fim</label>
        <input
          type="time"
          placeholder="Termina?"
          className="search-input"
        />
      </div>
      <button className="search-button">Buscar</button>
    </div>
  );
}

export default BarraDePesquisa;
