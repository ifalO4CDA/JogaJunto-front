// src/pages/ConfirmacaoEmail.js
import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmacaoEmail = () => {
  return (
    <div>
      <h1>Confirmação de E-mail</h1>
      <p>Verifique sua caixa de entrada e clique no link de confirmação para continuar.</p>
      <p><Link to="/finalizar-cadastro">Clique aqui</Link> caso tenha confirmado seu e-mail.</p>
    </div>
  );
};

export default ConfirmacaoEmail;
