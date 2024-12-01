// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import HomePage from './pages/home/homePage';
import ArenaDetalhes from './pages/arena/arenaDetalhes'; 
import LoginCadastro from './pages/cadastro/loginCadastro';
// import ConfirmacaoEmail from './pages/cadastro/confirmacaoEmail';
import DadosComplementares from './pages/cadastro/cadastroDadosComplementares';
import ModalLogin from './components/modal';

function App() {
  // const [user, setUser] = React.useState(null);
  const [showModal, setShowModal] = useState(false);

  // Função para abrir o modal
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
        <Route path="/arena/:id" element={<ArenaDetalhes />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/cadastro" element={<DadosComplementares />} />
      </Routes>
    </div>
  );
}

export default App;
