import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import logoJogaJunto from "../assets/logoJogaJunto.png";
import imagemPerfil from "../assets/Perfil.png";
import gruposImage from "../assets/gruposLogo.png"; // Imagem para "Grupos"
import salasImage from "../assets/salasLogo.png"; // Imagem para "Salas"
import reservasImage from "../assets/reservasLogo.png"; // Imagem para "Reservas"
import "../styles/components/Header.css"; // Importa o arquivo CSS

const Header = ({ onLoginClick, buttonRef }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container className="container">
        {/* Logo à esquerda */}
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img
            src={logoJogaJunto}
            alt="Logo"
            className="logo-jogajunto" // Classe CSS para o estilo da logo
          />
        </Navbar.Brand>


        {/* Centralizando os botões compostos (Grupos, Salas, Reservas) */}
        <Nav className="mx-auto">
          <Nav.Item className="mx-2">
            <Button className="btn-composto">
              <img
                src={gruposImage} // Imagem para "Grupos"
                alt="Grupos"
                className="btn-composto-img"
              />
              <span className="btn-composto-text">Grupos</span>
            </Button>
          </Nav.Item>

          <Nav.Item className="mx-2">
            <Button className="btn-composto">
              <img
                src={salasImage} // Imagem para "Salas"
                alt="Salas"
                className="btn-composto-img"
              />
              <span className="btn-composto-text">Salas</span>
            </Button>
          </Nav.Item>

          <Nav.Item className="mx-2">
            <Button className="btn-composto">
              <img
                src={reservasImage} // Imagem para "Reservas"
                alt="Reservas"
                className="btn-composto-img"
              />
              <span className="btn-composto-text">Reservas</span>
            </Button>
          </Nav.Item>
        </Nav>

        {/* Links e Botões à direita */}
        <Nav className="ml-auto">
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
