import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-items">
          <li className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              Dashboard
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
              Proyectos
            </NavLink>
          </li>
          
          {isAdmin && (
            <li className="nav-item">
              <NavLink to="/projects/new" className={({ isActive }) => isActive ? 'active' : ''}>
                Nuevo Proyecto
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <p>Sistema de Gestión QA</p>
        <p className="version">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;