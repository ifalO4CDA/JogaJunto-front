import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditarPerfilModal from "../../components/editarPerfilModal";
import "../../styles/pages/perfil/perfilPage.css";

const PerfilPage = () => {
  const [usuario, setUsuario] = useState(null); // Estado para armazenar os dados do usuário
  const [mostrarModal, setMostrarModal] = useState(false); // Controla o modal de edição
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega as informações do localStorage
    try {
      const usuarioLogado = {
        id: localStorage.getItem("id"),
        nome: localStorage.getItem("nome"),
        sobrenome: localStorage.getItem("sobrenome"),
        email: localStorage.getItem("email"),
        numero_celular: localStorage.getItem("numero_celular"),
        foto_perfil: localStorage.getItem("foto_perfil"),
        endereco: localStorage.getItem("endereco")
      };

      // Verifica se o ID do usuário está presente
      if (!usuarioLogado.id) {
        console.warn("Usuário não encontrado. Redirecionando para a página inicial.");
        navigate("/"); // Redireciona para a home
      } else {
        setUsuario(usuarioLogado); // Define os dados do usuário
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
      navigate("/"); // Redireciona em caso de erro
    }
  }, [navigate]);

  const handleEditarPerfil = () => {
    setMostrarModal(true);
  };

  const handleComplementarCadastro = () => {
    navigate("/cadastro/dadosComplementares");
  };

  return (
    <div className="perfil-page container">
      {usuario ? (
        <>
          {/* Cabeçalho do Perfil */}
          <div className="perfil-header">
            {/* Foto do Usuário */}
            <img
              src={usuario.foto_perfil || "https://via.placeholder.com/150"}
              alt={usuario.nome}
              className="perfil-foto"
            />

            {/* Nome e Botões */}
            <div className="perfil-dados">
              <h2 className="perfil-nome">
                {usuario.nome} {usuario.sobrenome}
                <button
                  className="btn btn-primary btn-editar"
                  onClick={handleEditarPerfil}
                >
                  Editar Perfil
                </button>
              </h2>

              <p className="perfil-email">{usuario.email}</p>
              {usuario.endereco === "undefined" && (
                <button
                  className="btn btn-complementar"
                  onClick={handleComplementarCadastro}
                >
                  Complementar Cadastro
                </button>
              )}
            </div>
          </div>

          {/* Modal para edição de informações */}
          {mostrarModal && (
            <EditarPerfilModal
              show={mostrarModal}
              onClose={() => setMostrarModal(false)}
              usuario={usuario}
            />
          )}

          {/* Seções de Salas, Grupos e Reservas */}
          <div className="perfil-secoes">
            {/* Salas */}
            <section>
              <h3>Suas Salas</h3>
              <div className="cards-container">
                <p>Aqui serão listadas as salas do usuário.</p>
              </div>
            </section>

            {/* Grupos */}
            <section>
              <h3>Seus Grupos</h3>
              <div className="cards-container">
                <p>Aqui serão listados os grupos do usuário.</p>
              </div>
            </section>

            {/* Reservas */}
            <section>
              <h3>Suas Reservas</h3>
              <div className="cards-container">
                <p>Aqui serão listadas as reservas do usuário.</p>
              </div>
            </section>
          </div>
        </>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
};

export default PerfilPage;
