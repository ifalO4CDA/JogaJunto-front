import React from "react";
import "../styles/components/barraDePesquisa.css";

function BarraDePesquisa({ campos, onSearch }) {
  return (
    <div className="barra-de-pesquisa">
      {campos.map((campo, index) => (
        <div className="input-group" key={index}>
          <label className="input-label">{campo.label}</label>
          <input
            type={campo.type}
            placeholder={campo.placeholder}
            className="search-input"
            onChange={(e) => campo.onChange && campo.onChange(e.target.value)}
          />
        </div>
      ))}
      <button className="search-button" onClick={onSearch}>
        Buscar
      </button>
    </div>
  );
}

export default BarraDePesquisa;
