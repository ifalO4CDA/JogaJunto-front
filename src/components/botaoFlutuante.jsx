import React from 'react';
import { Button } from 'react-bootstrap';

function BotaoFlutuante({ onClick, icon = '+', style = {}, variant = 'success' }) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        fontSize: '30px',
        borderRadius: '50%',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex', // Alinha conteúdo com Flexbox
        alignItems: 'center', // Alinha verticalmente
        justifyContent: 'center', // Alinha horizontalmente
        padding: 0, // Remove padding extra
        ...style, // Permite sobrescrever estilos com props
      }}
    >
      {icon}
    </Button>
  );
}

export default BotaoFlutuante;
