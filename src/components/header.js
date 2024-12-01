import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import logoJogaJunto from "../assets/logoJogaJunto.png";
import imagemPerfil from "../assets/Perfil.png";

const Header = ({ onLoginClick }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoJogaJunto}
            alt="Logo"
            style={{ height: "40px" }} // Ajuste o tamanho da logo conforme necessário
          />
        </Navbar.Brand>

        {/* Links e Botões no Header */}
        <Nav className="ml-auto">
          {/* Link para o Gestor de Quadra */}
          <Nav.Link as={Link} to="/gestor-quadra">Anuncie sua arena</Nav.Link>

          {/* Botão "Entrar" com cor verde */}
          <Nav.Item>
            <Button
              className="mx-2 d-flex align-items-center"
              onClick={onLoginClick}
              style={{
                backgroundColor: "white", // Cor verde
                borderColor: "#2FD151", // Borda verde
                color: "#2FD151",
              }}
            >
              <img
                src={imagemPerfil} // Caminho para a imagem
                alt="Perfil"
                style={{
                  width: "20px", // Tamanho da imagem
                  height: "20px",
                  borderRadius: "50%", // Deixa a imagem redonda
                  marginRight: "8px", // Espaço entre a imagem e o texto
                }}
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
