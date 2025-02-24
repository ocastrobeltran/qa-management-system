import React from 'react';
import { Link } from 'react-router-dom';
//import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La página que estás buscando no existe o ha sido movida.</p>
        <Link to="/" className="home-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;