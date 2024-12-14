import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditarPerfilModal from "../../components/editarPerfilModal";
import CardQuadra from "../../components/cardQuadra"; // Usado para grupos, salas e reservas
import "../../styles/pages/perfil/perfilPage.css";

const PerfilPage = () => {
  const [usuario, setUsuario] = useState(null); // Estado para armazenar os dados do usuário
  const [mostrarModal, setMostrarModal] = useState(false); // Controla o modal de edição
  const [error, setError] = useState(false); // Estado para controlar erros
  const navigate = useNavigate();

  useEffect(() => {
    // Requisição à API para buscar os dados do usuário
    /*
    fetch("http://sua-api.com/usuario/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Exemplo de uso de token
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }
        return response.json();
      })
      .then((data) => {
        setUsuario(data); // Define os dados retornados pela API
        setError(false); // Reseta o estado de erro
      })
      .catch((err) => {
        console.error("Erro ao buscar o perfil do usuário:", err);
        setError(true); // Define o estado de erro
      });
    */

    // Temporariamente simulando os dados do usuário
    setUsuario({
      id: 1,
      nome: "João Silva",
      sobrenome: "da Costa",
      foto: "https://via.placeholder.com/150",
      cadastroCompleto: false, // Controle se o cadastro está completo
      salas: [
        {
          id: 1,
          nome: "Sala de Treinamento",
          precoHora: "R$ 200/H",
          bairro: "Centro",
          tipo: "Reunião",
          imagem: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          nome: "Sala de Estudos",
          precoHora: "R$ 150/H",
          bairro: "Jatiúca",
          tipo: "Coworking",
          imagem: "https://via.placeholder.com/150",
        },
      ],
      grupos: [
        {
          id: 1,
          nome: "Amigos do Futsal",
          precoHora: "N/A",
          bairro: "Virtual",
          tipo: "Grupo Esportivo",
          imagem: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          nome: "Turma do Vôlei",
          precoHora: "N/A",
          bairro: "Virtual",
          tipo: "Grupo Social",
          imagem: "https://via.placeholder.com/150",
        },
      ],
      reservas: [
        {
          id: 1,
          nome: "Arena Central",
          precoHora: "R$ 100/H",
          bairro: "Centro",
          tipo: "Futsal",
          imagem: "https://via.placeholder.com/150",
        },
      ],
    });
  }, []);

  // Redireciona para /home se houver erro na requisição
  useEffect(() => {
    if (error) {
      navigate("/home");
    }
  }, [error, navigate]);

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
              src={usuario.foto}
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

              {/* Botão de Complementar Cadastro */}
              {!usuario.cadastroCompleto && (
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
                {usuario.salas.length > 0 ? (
                  usuario.salas.map((sala) => (
                    <CardQuadra
                      key={sala.id}
                      id={sala.id}
                      imagem={sala.imagem}
                      nome={sala.nome}
                      precoHora={sala.precoHora}
                      bairro={sala.bairro}
                      tipo={sala.tipo}
                    />
                  ))
                ) : (
                  <p>Você ainda não tem salas cadastradas.</p>
                )}
              </div>
            </section>

            {/* Grupos */}
            <section>
              <h3>Seus Grupos</h3>
              <div className="cards-container">
                {usuario.grupos.length > 0 ? (
                  usuario.grupos.map((grupo) => (
                    <CardQuadra
                      key={grupo.id}
                      id={grupo.id}
                      imagem={grupo.imagem}
                      nome={grupo.nome}
                      precoHora={grupo.precoHora}
                      bairro={grupo.bairro}
                      tipo={grupo.tipo}
                    />
                  ))
                ) : (
                  <p>Você ainda não participa de nenhum grupo.</p>
                )}
              </div>
            </section>

            {/* Reservas */}
            <section>
              <h3>Suas Reservas</h3>
              <div className="cards-container">
                {usuario.reservas.length > 0 ? (
                  usuario.reservas.map((reserva) => (
                    <CardQuadra
                      key={reserva.id}
                      id={reserva.id}
                      imagem={reserva.imagem}
                      nome={reserva.nome}
                      precoHora={reserva.precoHora}
                      bairro={reserva.bairro}
                      tipo={reserva.tipo}
                    />
                  ))
                ) : (
                  <p>Você ainda não fez nenhuma reserva.</p>
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
