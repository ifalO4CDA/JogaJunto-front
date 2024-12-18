import React, { useState } from "react";
import "../../styles/confirmacaoEmail.css";
import Ilustracao from "../../assets/Ilustracao.png";

function ConfirmacaoEmail() {
  const [foto, setFoto] = useState(null);

  const handleFotoChange = (e) => {
    setFoto(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Finalizar Cadastro</h2>
      <div className="row align-items-center">
        {/* Ilustração */}
        <div className="col-md-6 text-center">
          <img
            src={Ilustracao} // Substitua por sua imagem
            alt="Ilustração de Cadastro"
            className="img-fluid"
          />
        </div>

        {/* Formulário */}
        <div className="col-md-6">
          <div className="foto-perfil mb-4 text-center">
            <label htmlFor="fotoInput">
              <div className="foto-preview">
                {foto ? (
                  <img
                    src={foto}
                    alt="Foto de Perfil"
                  />
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
        <input
          type="file"
          id="fotoInput"
          accept="image/*"
          onChange={handleFotoChange}
          style={{ display: "none" }}
        />
      </div>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Nome"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Sobrenome"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-75"
            placeholder="CPF"
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control w-75"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Número de Celular"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control w-75"
            placeholder="E-mail"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control w-75"
            placeholder="Senha"
          />
        </div>

        <button type="submit" className="btn btn-primary w-75">
          Concluir
        </button>
      </form>
    </div>
      </div >
    </div >
  );
}

export default ConfirmacaoEmail;