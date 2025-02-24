import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/dashboard">
          <h1>QA Manager</h1>
        </Link>
      </div>
      
      <div className="header-actions">
        {user && (
          <div className="user-menu">
            <span className="user-name">
              {user.name} | {user.role === 'admin' ? 'Administrador' : 'Invitado'}
            </span>
            <button className="logout-button" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;