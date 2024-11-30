import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import logoJogaJunto from "../assets/logoJogaJunto.png";
import imagemPerfil from "../assets/Perfil.png";

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoJogaJunto}
            alt="Logo"
            style={{ height: '40px' }} // Ajuste o tamanho da logo conforme necessário
          />
        </Navbar.Brand>

        {/* Links e Botões no Header */}
        <Nav className="ml-auto">
          {/* Link para o Gestor de Quadra */}
          <Nav.Link as={Link} to="/gestor-quadra">Anuncie sua arena</Nav.Link>

          {/* Condicional: Mostrar Login ou Perfil */}
          {/* Se o usuário estiver logado, mostrar o link para o perfil */}
          <Nav.Item>
            <Button variant="outline-primary" as={Link} to="/login" className="mx-2">
              Entrar
            </Button>
          </Nav.Item>
          
          {/* <Nav.Item>
            <Link to="/perfil">
              <img src={imagemPerfil} alt="Perfil" className="rounded-circle" width="40" height="40" />
            </Link>
          </Nav.Item> */}
        </Nav>
      </Container>
    </Navbar>
    );
};

export default Header;