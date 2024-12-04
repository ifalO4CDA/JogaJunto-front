// src/App.js
import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import ModalLogin from './components/modalLogin';

import HomePage from './pages/home/homePage';
import Explorar from './pages/home/explorar';

import GruposInformacoes from './pages/grupos/gruposInformacoes';
import GruposPrivados from './pages/grupos/gruposPrivados';
import GruposPublicos from './pages/grupos/gruposPublicos';

import SalasInformacoes from './pages/salas/salasInformacoes';
import SalasPrivadas from './pages/salas/salasPrivadas';
import SalasPublicas from './pages/salas/salasPublicas';

import ArenaReserva from './pages/arena/arenaReserva';

import PerfilLogado from './pages/perfil/perfilLogado';
import PerfilNaoLogado from './pages/perfil/perfilNaoLogado';

import ArenaInformacoes from './pages/arena/arenaInformacoes';

import CadastroUsuario from './pages/cadastro/cadastroUsuario';
import CadastroDadosComplementares from './pages/cadastro/cadastroDadosComplementares';
import CadastroGrupo from './components/cadastroGrupoModal';
import CadastroSalas from './pages/cadastro/cadastroSalas';
import CadastroReserva from './pages/cadastro/cadastroReserva';
import CadastroConfirmacaoEmail from './pages/cadastro/cadastroConfirmacaoEmail';

function App() {
  // const [user, setUser] = React.useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);

  const handleOpenModal = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect(); // Captura posição e dimensões do botão
    setModalPosition({
      top: buttonRect.bottom + 40 + window.scrollY, // Adiciona 10px de espaçamento abaixo do botão
      left: buttonRect.left + buttonRect.width / 2 - 150 + window.scrollX,  // Centraliza o modal em relação ao botão (assumindo largura do modal = 300px)
    });
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Header onLoginClick={handleOpenModal} buttonRef={buttonRef} />
      {showModal && <ModalLogin onClose={handleCloseModal} position={modalPosition} />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explorar" element={<Explorar />} />

        <Route path="/grupos/informacoes" element={<GruposInformacoes />} />
        <Route path="/grupos/privados" element={<GruposPrivados />} />
        <Route path="/grupos/publicos" element={<GruposPublicos />} />

        <Route path="/salas/informacoes" element={<SalasInformacoes />} />
        <Route path="/salas/privadas" element={<SalasPrivadas />} />
        <Route path="/salas/publicas" element={<SalasPublicas />} />

        <Route path="/arena/reserva" element={<ArenaReserva />} />

        <Route path="/perfil/logado" element={<PerfilLogado />} />
        <Route path="/perfil/naologado" element={<PerfilNaoLogado />} />

        <Route path="/arena/informacoes" element={<ArenaInformacoes />} />

        <Route path="/cadastro/usuario" element={<CadastroUsuario />} />
        <Route path="/cadastro/dadoscomplementares" element={<CadastroDadosComplementares />} />
        <Route path="/cadastro/grupo" element={<CadastroGrupo />} />
        <Route path="/cadastro/salas" element={<CadastroSalas />} />
        <Route path="/cadastro/reserva" element={<CadastroReserva />} />
        <Route path="/cadastro/grupo" element={<CadastroGrupo />} />
        <Route path="/cadastro/confirmacaoemail" element={<CadastroConfirmacaoEmail />} />

      </Routes>
    </div>
  );
}

export default App;
