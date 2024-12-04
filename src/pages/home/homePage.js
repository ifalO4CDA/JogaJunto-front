import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CadastroGrupoModal from '../../components/cadastroGrupoModal';  // Supondo que o modal está em '../components/cadastroGrupoModal'

function HomePage() {
  const [showModal, setShowModal] = useState(false);

  // Função para abrir o modal
  const handleShow = () => setShowModal(true);

  // Função para fechar o modal
  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 text-center">
          {/* Botão "+" que abre o Modal */}
          <Button
            variant="success"
            className="btn-circle"
            onClick={handleShow}
            style={{
              width: '50px',
              height: '50px',
              fontSize: '30px',
              borderRadius: '50%',
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 1000
            }}
          >
            +
          </Button>
        </div>
      </div>

      {/* Modal do Cadastro do Grupo */}
      <CadastroGrupoModal show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default HomePage;
