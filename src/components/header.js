import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import logoJogaJunto from "../assets/logoJogaJunto.png";
import imagemPerfil from "../assets/Perfil.png";
import "../styles/components/Header.css"; // Importa o arquivo CSS

const Header = ({ onLoginClick, buttonRef }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoJogaJunto}
            alt="Logo"
            className="logo-jogajunto" // Classe CSS para o estilo da logo
          />
        </Navbar.Brand>

        {/* Links e Botões no Header */}
        <Nav className="ml-auto">
          {/* Link para o Gestor de Quadra */}
          <Nav.Link as={Link} to="/gestor-quadra">Anuncie sua arena</Nav.Link>

          {/* Botão "Entrar" com cor verde */}
          <Nav.Item>
            <Button
              ref={buttonRef}
              className="btn-login mx-2" // Classe CSS para o botão
              onClick={onLoginClick}
            >
              <img
                src={imagemPerfil} // Caminho para a imagem
                alt="Perfil"
              />
              Entrar
            </Button>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
