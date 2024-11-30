// src/pages/Home/HomeNotLogged.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div>
      <h1>Bem-vindo ao nosso site!</h1>
      <p>Por favor, faça login ou se cadastre.</p>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastre-se</Link>
      </nav>
    </div>
  );
};

export default HomePage;
