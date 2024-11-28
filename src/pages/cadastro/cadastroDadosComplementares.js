// src/pages/FinalizarCadastro.js
import React, { useState } from 'react';

const DadosComplementares = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [celular, setCelular] = useState('');
  // const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para finalizar cadastro (API ou validação)
  };

  return (
    <div>
      <h1>Finalizar Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Número de Celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setFotoPerfil(e.target.files[0])}
        /> */}
        <button type="submit">Finalizar Cadastro</button>
      </form>
    </div>
  );
};

export default DadosComplementares;
