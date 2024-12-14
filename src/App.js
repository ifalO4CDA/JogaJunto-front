// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import ModalLogin from './components/modalLogin';

import HomePage from './pages/home/homePage';
import Explorar from './pages/home/explorar';

import GruposInformacoes from './pages/grupos/gruposInformacoes';
import Grupos from './pages/grupos/gruposTelas';

import SalasInformacoes from './pages/salas/salasInformacoes';
import SalasTelas from './pages/salas/salasTelas';

import Perfil from './pages/perfil/perfilPage';

import ArenaReserva from './pages/arena/arenaReserva';

import ArenaInformacoes from './pages/arena/arenaInformacoes';

import CadastroUsuario from './pages/cadastro/cadastroUsuario';
import CadastroDadosComplementares from './pages/cadastro/cadastroDadosComplementares';
import CadastroGrupo from './components/cadastroGrupoModal';
import CadastroSalas from './components/cadastroSalaModal';
import CadastroReserva from './pages/cadastro/cadastroReserva';
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
        <Route path="/explorar" element={<Explorar />} />

        <Route path="/grupos/informacoes" element={<GruposInformacoes />} />
        <Route path="/grupos" element={<Grupos/>} />

        <Route path="/salas/informacoes" element={<SalasInformacoes />} />
        <Route path="/salas" element={<SalasTelas />} />

        <Route path="/arena/reserva" element={<ArenaReserva />} />
        <Route path="/arena/:arenaId" element={<ArenaInformacoes />} />

        <Route path="/perfil" element={<Perfil />} />


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
