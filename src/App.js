// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/home/homePage'; // Caminho correto dentro de src/
import ArenaDetalhes from './pages/arena/arenaDetalhes'; 
import LoginCadastro from './pages/cadastro/loginCadastro';
import ConfirmacaoEmail from './pages/cadastro/confirmacaoEmail';
import DadosComplementares from './pages/cadastro/cadastroDadosComplementares';

function App() {
  return (
    <div className="App">
      <h1>Bem-vindo ao Site de Arenas</h1>

      {/* Botões de navegação */}
      <div className="botoes">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/arena/1">Arena 1 - Detalhes</Link></button>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/cadastro">Cadastro</Link></button>
      </div>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arena/:id" element={<ArenaDetalhes />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/confirmacao-email" element={<ConfirmacaoEmail />} />
        <Route path="/dados-complementares" element={<DadosComplementares />} />
      </Routes>
    </div>
  );
}

export default App;
