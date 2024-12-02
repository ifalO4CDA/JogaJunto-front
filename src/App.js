// src/App.js
import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import HomePage from './pages/home/homePage';
import ArenaDetalhes from './pages/arena/arenaDetalhes'; 
import LoginCadastro from './pages/cadastro/loginCadastro';
import ConfirmacaoEmail from './pages/cadastro/confirmacaoEmail';
import DadosComplementares from './pages/cadastro/cadastroDadosComplementares';
import ModalLogin from './components/modalLogin';

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
        <Route path="/confirmacao-email" element={<ConfirmacaoEmail/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/arena/:id" element={<ArenaDetalhes />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/cadastro" element={<DadosComplementares />} />
      </Routes>
    </div>
  );
}

export default App;
