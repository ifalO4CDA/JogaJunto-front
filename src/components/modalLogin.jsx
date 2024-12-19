import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UsuariosService } from "../services/usuarioService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/modalLogin.css"; // Importa o CSS

function ModalLogin({ onClose }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dados de login
      const dadosLogin = { email, senha };

      // Faz a requisição para o serviço de login
      const resposta = await UsuariosService.login(dadosLogin);

      // Armazenar cada dado em uma chave separada no localStorage
      const dadosUsuario = resposta?.data;
      localStorage.setItem("token", dadosUsuario?.token);
      localStorage.setItem("id", dadosUsuario?.id_usuario);
      localStorage.setItem("nome", dadosUsuario?.nome);
      localStorage.setItem("sobrenome", dadosUsuario?.sobrenome);
      localStorage.setItem("email", dadosUsuario?.email);
      localStorage.setItem("numero_celular", dadosUsuario?.numero_celular);
      localStorage.setItem("foto_perfil", dadosUsuario?.foto_perfil);
      localStorage.setItem("endereco", JSON.stringify(dadosUsuario?.endereco));

      alert("Login realizado com sucesso!");
      onClose(); // Fecha o modal
      window.location.href = "/"; // Redireciona para a página principal
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      alert("Erro ao realizar login: " + (error.response?.data?.mensagem || "Erro desconhecido"));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body text-center">
          <h5 className="mb-1">Seja bem-vindo!</h5>
          <p className="text-muted mb-4">Entrar ou criar conta</p>
          <form onSubmit={handleSubmit}>
            {/* Campo de E-mail */}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control modal-input"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Campo de Senha */}
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                className="form-control modal-input"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {/* Botão de Continuar */}
            <button type="submit" className="btn btn-primary w-100 btn-primary-custom">
              Continuar
            </button>
            {/* Botão de Cadastrar */}
            <Link to="/cadastro/usuario" className="link">
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3 btn-outline-custom"
                onClick={onClose}
              >
                Cadastrar
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
