import React, { useState } from "react";
import "../../styles/pages/cadastro/cadastroUsuario.css";
import Ilustracao from "../../assets/Ilustracao.png";

function CadastroUsuario() {
  const [foto, setFoto] = useState(null);

  const handleFotoChange = (e) => {
    setFoto(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Ilustração */}
        <div className="col-md-6 text-center">
          <img
            src={Ilustracao}
            alt="Ilustração de Cadastro"
            className="img-fluid"
          />
        </div>

        {/* Formulário */}
        <div className="col-md-6">
          {/* Foto de Perfil */}
          <div className="foto-perfil mb-4 text-center">
            <label htmlFor="fotoInput">
              <div className="foto-preview">
                {foto ? (
                  <img src={foto} alt="Foto de Perfil" />
                ) : (
                  "+"
                )}
              </div>
            </label>
            <input
              type="file"
              id="fotoInput"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Formulário */}
          <form className="text-center">
            <div className="mb-3">
              <input
                type="text"
                className="form-control w-75 mx-auto"
                placeholder="Nome"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control w-75 mx-auto"
                placeholder="Sobrenome"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control w-75 mx-auto"
                placeholder="E-mail"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control w-75 mx-auto"
                placeholder="Senha"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-75"
              style={{
                backgroundColor: "#2FD151",
                borderColor: "#2FD151",
              }}
            >
              Concluir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;
