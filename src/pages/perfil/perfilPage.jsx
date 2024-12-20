import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditarPerfilModal from "../../components/editarPerfilModal";
import CardSala from "../../components/cardSala"; // Importa o componente de CardSala
import CardGrupo from "../../components/cardGrupo"; // Importa o componente de CardGrupo
import { SalasService } from "../../services/salaService";
import { GruposService } from "../../services/grupoService";
import "../../styles/pages/perfil/perfilPage.css";


const PerfilPage = () => {
  const [usuario, setUsuario] = useState(null); // Estado para armazenar os dados do usuário
  const [salas, setSalas] = useState([]); // Estado para armazenar as salas do usuário
  const [grupos, setGrupos] = useState([]); // Estado para armazenar os grupos do usuário
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
        endereco: localStorage.getItem("endereco"),
      };

      if (!usuarioLogado.id) {
        console.warn("Usuário não encontrado. Redirecionando para a página inicial.");
        navigate("/"); // Redireciona para a home
      } else {
        setUsuario(usuarioLogado); // Define os dados do usuário

        // Buscar grupos e salas do usuário
        fetchGruposESalas(usuarioLogado.id);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
      navigate("/"); // Redireciona em caso de erro
    }
  }, [navigate]);

  const fetchGruposESalas = async (idUsuario) => {
    try {
      const salasResponse = await SalasService.getSalasPorUsuario(idUsuario);
      const gruposResponse = await GruposService.getGruposPorUsuario(idUsuario);

      setSalas(salasResponse || []);
      setGrupos(gruposResponse || []);
    } catch (error) {
      console.error("Erro ao carregar grupos e salas do usuário:", error);
    }
  };

  const handleEditarPerfil = () => {
    setMostrarModal(true);
  };

  const handleComplementarCadastro = () => {
    navigate("/cadastro/dadosComplementares");
  };

  const handleLogout = () => {
    // Limpa o localStorage
    localStorage.clear();

    // Redireciona o usuário para a página inicial
    navigate("/", { replace: true });

    // Recarrega a página para garantir a limpeza do estado global
    window.location.reload();
  };

  return (
    <div className="perfil-page container">
      {usuario ? (
        <>
          {/* Cabeçalho do Perfil */}
          <div className="perfil-header">
            <img
              src={usuario.foto_perfil || "https://via.placeholder.com/150"}
              alt={usuario.nome}
              className="perfil-foto"
            />

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
              <p className="perfil-id">ID do Usuário: {usuario.id}</p>

              {usuario.endereco === "undefined" && (
                <button
                  className="btn btn-complementar"
                  onClick={handleComplementarCadastro}
                >
                  Complementar Cadastro
                </button>
              )}

              <button
                className="btn btn-danger btn-logoff"
                onClick={handleLogout}
              >
                Sair
              </button>
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

          {/* Seções de Salas e Grupos */}
          <div className="perfil-secoes">
            {/* Salas */}
            <section>
              <h3>Suas Salas</h3>
              <div className="cards-container">
                {salas.length > 0 ? (
                  salas.map((sala) => (
                    <CardSala
                      key={sala.id_sala}
                      id={sala.id_sala}
                      nome={sala.nome}
                      criador={sala.criador?.nome}
                      maxIntegrantes={sala.max_integrantes}
                    />
                  ))
                ) : (
                  <p>Você não participa de nenhuma sala.</p>
                )}
              </div>
            </section>

            {/* Grupos */}
            <section>
              <h3>Seus Grupos</h3>
              <div className="cards-container">
                {grupos.length > 0 ? (
                  grupos.map((grupo) => (
                    <CardGrupo
                      key={grupo.id_grupo}
                      id={grupo.id_grupo}
                      nome={grupo.nome_grupo}
                      qtdIntegrantes={grupo.qtd_atual_integrantes}
                      criador={grupo.id_criador}
                    />
                  ))
                ) : (
                  <p>Você não participa de nenhum grupo.</p>
                )}
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
