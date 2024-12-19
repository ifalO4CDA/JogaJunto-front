import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import logoJogaJunto from "../assets/logoJogaJunto.png";
import imagemPerfil from "../assets/Perfil.png";
import gruposImage from "../assets/gruposLogo.png";
import salasImage from "../assets/salasLogo.png";
import reservasImage from "../assets/reservasLogo.png";
import "../styles/components/Header.css";

const Header = ({ onLoginClick, buttonRef }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Tenta buscar o nome do usuário diretamente
    const nomeUsuario = localStorage.getItem("nome");
    if (nomeUsuario) {
      setUsuario(nomeUsuario); // Usa diretamente o nome
    }
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container className="container">
        {/* Logo à esquerda */}
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img
            src={logoJogaJunto}
            alt="Logo"
            className="logo-jogajunto"
          />
        </Navbar.Brand>

        {/* Botões centrais (Grupos, Salas, Reservas) */}
        <Nav className="mx-auto">
          <Navbar.Brand as={Link} to="/grupos" className="mx-2">
            <Button className="btn-composto">
              <img src={gruposImage} alt="Grupos" className="btn-composto-img" />
              <span className="btn-composto-text">Grupos</span>
            </Button>
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/salas" className="mx-2">
            <Button className="btn-composto">
              <img src={salasImage} alt="Salas" className="btn-composto-img" />
              <span className="btn-composto-text">Salas</span>
            </Button>
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/arena/reserva" className="mx-2">
            <Button className="btn-composto">
              <img
                src={reservasImage}
                alt="Reservas"
                className="btn-composto-img"
              />
              <span className="btn-composto-text">Reservas</span>
            </Button>
          </Navbar.Brand>
        </Nav>

        {/* Lado direito: botão de login ou perfil */}
        <Nav className="ml-auto">
          {usuario ? (
            <Link to="/perfil">
              <Button className="btn btn-primary btn-perfil">
                {usuario}
              </Button>
            </Link>
          ) : (
            <Button
              ref={buttonRef}
              className="btn-login mx-2"
              onClick={onLoginClick}
            >
              <img src={imagemPerfil} alt="Perfil" className="btn-login-img" />
              Entrar
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
