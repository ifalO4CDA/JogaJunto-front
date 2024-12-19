import React, { useState } from "react";
import "../../styles/pages/cadastro/cadastroUsuario.css";
import Ilustracao from "../../assets/Ilustracao.png";
import { UsuariosService } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";

function CadastroUsuario() {
  const [foto, setFoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleFotoChange = (e) => {
    setFoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formElement = e.target;
    const formData = new FormData(formElement);
    const dadosUsuario = Object.fromEntries(formData.entries());
  
    try {
      const resposta = await UsuariosService.criarUsuario(dadosUsuario);
      console.log(resposta);
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "/";
      navigate("/"); 
    } catch (error) {
      console.error("Dados retornados pelo servidor:", error.response?.data);
    }
  };

  return (
    <div className="cadastro-container">
      {/* Imagem à esquerda */}
      <div className="cadastro-imagem-container">
        <img
          src={Ilustracao}
          alt="Ilustração de Cadastro"
          className="cadastro-imagem"
        />
      </div>

      {/* Formulário à direita */}
      <div className="cadastro-form-container">
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="nome"
              className="form-control"
              placeholder="Nome"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="sobrenome"
              className="form-control"
              placeholder="Sobrenome"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="E-mail"
            />
          </div>
          {/* Campo de Senha com botão de visibilidade */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="senha"
              className="form-control"
              placeholder="Senha"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-concluir"
          >
            Concluir
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroUsuario;
