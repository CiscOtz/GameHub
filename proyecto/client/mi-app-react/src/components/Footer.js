import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 GAMEHUB. Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="/about">Acerca de Nosotros</a>
        <a href="/contact">Contacto</a>
        <a href="/privacy">Politica de Privacidad</a>
      </div>
    </div>
  );
};

export default Footer;
