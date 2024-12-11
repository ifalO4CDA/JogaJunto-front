// src/pages/Arena/arenaDetalhes.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArenaInformacoes = () => {
  return (
    <div className="container mt-4">
      <div className="row mt-5">
        <div className="col-md-8">
          <h2 className="mb-3">Arena Santíssimo Senhor</h2>
          <img
            src="https://via.placeholder.com/600x300"
            alt="Arena"
            className="img-fluid rounded"
          />
          <p className="mt-3">
            O ginásio do Colégio Santíssimo Senhor é um ambiente educacional
            acolhedor e inspirador. A instituição é comprometida em fornecer
            uma recriação de alta qualidade aos seus alunos e à sociedade em
            geral.
          </p>
          <div className="d-flex justify-content-start align-items-center mt-3">
            <span className="badge bg-primary me-2">Futsal</span>
            <span className="badge bg-primary me-2">Basquete</span>
            <span className="badge bg-primary me-2">Vôlei</span>
          </div>
          <div className="d-flex justify-content-start align-items-center mt-3">
            <span className="badge bg-secondary me-2">Vestiário</span>
            <span className="badge bg-secondary me-2">Bebedouros</span>
          </div>
          <div className="mt-4">
            <span className="text-muted">Serraria, Maceió/AL</span>
            <br />
            <span className="text-warning">
              ⭐ 4.1 | 30 comentários
            </span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h3 className="text-center">R$90 / Hora</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Data
                </label>
                <input type="date" className="form-control" id="date" />
              </div>
              <div className="mb-3">
                <label htmlFor="start-time" className="form-label">
                  Começa
                </label>
                <input type="time" className="form-control" id="start-time" />
              </div>
              <div className="mb-3">
                <label htmlFor="end-time" className="form-label">
                  Termina
                </label>
                <input type="time" className="form-control" id="end-time" />
              </div>
              <button className="btn btn-primary w-100">Reservar Agora</button>
            </form>
            <p className="text-center text-muted mt-2">
              Você ainda não será cobrado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaInformacoes;
