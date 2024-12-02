// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import HomePage from './pages/home/homePage';
import ArenaDetalhes from './pages/arena/arenaDetalhes'; 
import LoginCadastro from './pages/cadastro/loginCadastro';
import ConfirmacaoEmail from './pages/cadastro/confirmacaoEmail';
import DadosComplementares from './pages/cadastro/cadastroDadosComplementares';

function App() {
  // const [user, setUser] = React.useState(null);

  return (
    <div className="App">

      <Header/>
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
