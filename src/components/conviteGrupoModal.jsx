import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import "../styles/components/conviteGrupoModal.css";

function ConviteGrupoModal({ show, handleClose, linkConvite, handleGerarNovoLink }) {
  const [novoLink, setNovoLink] = useState(linkConvite);

  const gerarNovoLink = () => {
    const novo = `https://app.com/invite/${Math.random().toString(36).substring(2, 8)}`;
    setNovoLink(novo);
    handleGerarNovoLink(novo);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Convite para o Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 text-center">
          <p className="mb-2">Compartilhe o link abaixo para convidar participantes:</p>
          <InputGroup className="mb-3">
            <FormControl readOnly value={novoLink} />
            <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(novoLink)}>
              Copiar
            </Button>
          </InputGroup>
        </div>
        <div className="text-center">
          <Button variant="success" onClick={gerarNovoLink}>
            Gerar Novo Link
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConviteGrupoModal;
