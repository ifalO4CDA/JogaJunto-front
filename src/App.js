// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import ModalLogin from './components/modalLogin';

import HomePage from './pages/home/homePage';

import GruposInformacoes from './pages/grupos/gruposInformacoes';
import Grupos from './pages/grupos/gruposTelas';

import SalasInformacoes from './pages/salas/salasInformacoes';
import SalasTelas from './pages/salas/salasTelas';

import Perfil from './pages/perfil/perfilPage';

import ReservaInformacoes from './pages/salas/reservaInformacoes';

import ArenaInformacoes from './pages/arena/arenaInformacoes';
import ArenasDisponiveis from './pages/arena/arenasTela';

import CadastroUsuario from './pages/cadastro/cadastroUsuario';
import CadastroDadosComplementares from './pages/cadastro/cadastroDadosComplementares';
import CadastroGrupo from './components/cadastroGrupoModal';
import CadastroSalas from './components/cadastroSalaModal';
import CadastroConfirmacaoEmail from './pages/cadastro/cadastroConfirmacaoEmail';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Header onLoginClick={handleOpenModal} />
      {showModal && <ModalLogin onClose={handleCloseModal} />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/grupos/informacoes/:id" element={<GruposInformacoes />} />
        <Route path="/grupos" element={<Grupos/>} />

        <Route path="/salas/informacoes/:id" element={<SalasInformacoes />} />
        <Route path="/sala/reserva/:id" element={<ReservaInformacoes />} />
        <Route path="/salas" element={<SalasTelas />} />

        <Route path="/arena/:id" element={<ArenaInformacoes />} />
        <Route path="/sala/:id_sala/arena" element={<ArenasDisponiveis />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/cadastro/usuario" element={<CadastroUsuario />} />
        <Route path="/cadastro/dadoscomplementares" element={<CadastroDadosComplementares />} />
        <Route path="/cadastro/grupo" element={<CadastroGrupo />} />
        <Route path="/cadastro/salas" element={<CadastroSalas />} />
        <Route path="/cadastro/grupo" element={<CadastroGrupo />} />
        <Route path="/cadastro/confirmacaoemail" element={<CadastroConfirmacaoEmail />} />

      </Routes>
    </div>
  );
}

export default App;
