import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {currentYear} Sistema de Gestión QA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;