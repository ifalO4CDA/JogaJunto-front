import React, { useState } from "react";
import "../../styles/pages/cadastro/cadastroUsuario.css";
import Ilustracao from "../../assets/Ilustracao.png";

function CadastroComplementar() {
  const [fotoDocumento, setFotoDocumento] = useState(null);

  const handleFotoChange = (e) => {
    setFotoDocumento(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Coluna da Ilustração */}
        <div className="col-md-5 text-center">
          <img
            src={Ilustracao}
            alt="Ilustração de Cadastro"
            className="img-fluid"
          />
        </div>

        {/* Coluna do Formulário */}
        <div className="col-md-7">
          <div className="form-wrapper p-4 rounded">
            {/* Botão para Upload de Documento */}
            <div className="mb-4 text-center">
              <label htmlFor="fotoDocumentoInput" className="upload-button">
                {fotoDocumento ? (
                  <img
                    src={fotoDocumento}
                    alt="Foto do Documento"
                    className="uploaded-image"
                  />
                ) : (
                  <span>Adicionar Foto do Documento</span>
                )}
              </label>
              <input
                type="file"
                id="fotoDocumentoInput"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Formulário */}
            <form>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data de Nascimento"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CPF"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número de Celular"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CEP"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Logradouro"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Estado"
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Complemento"
                />
              </div>

              <div className="form-check mb-4 text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termosCheck"
                />
                <label className="form-check-label" htmlFor="termosCheck">
                  Eu aceito os{" "}
                  <a href="/termos" target="_blank">
                    Termos de Serviço
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ backgroundColor: "#2FD151", borderColor: "#2FD151" }}
              >
                Concluir
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroComplementar;
