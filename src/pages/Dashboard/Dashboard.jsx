import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext';
import { useAuth } from '../../hooks/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { projects, loading, error } = useContext(ProjectContext);
  const [stats, setStats] = useState({
    total: 0,
    noIniciado: 0,
    documentacion: 0,
    ejecucion: 0,
    ajustes: 0,
    finalizado: 0
  });

  useEffect(() => {
    if (Array.isArray(projects) && projects.length > 0) {
      const newStats = {
        total: projects.length,
        noIniciado: projects.filter(p => p.status === 'No iniciado').length,
        documentacion: projects.filter(p => p.status === 'Documentación').length,
        ejecucion: projects.filter(p => p.status === 'Ejecución').length,
        ajustes: projects.filter(p => p.status === 'Ajustes').length,
        finalizado: projects.filter(p => p.status === 'Finalizado').length
      };
      setStats(newStats);
    }
  }, [projects]);

  if (loading) return <div className="loading">Cargando datos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Ordenar proyectos por fecha (más recientes primero)
  const recentProjects = Array.isArray(projects) ? [...projects]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5) : [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Control</h1>
        <p>Bienvenido, {user?.name || 'Usuario'} ({user?.role || 'Invitado'})</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Proyectos</h3>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card no-iniciado">
          <h3>No Iniciados</h3>
          <div className="stat-value">{stats.noIniciado}</div>
        </div>
        <div className="stat-card documentacion">
          <h3>Documentación</h3>
          <div className="stat-value">{stats.documentacion}</div>
        </div>
        <div className="stat-card ejecucion">
          <h3>En Ejecución</h3>
          <div className="stat-value">{stats.ejecucion}</div>
        </div>
        <div className="stat-card ajustes">
          <h3>En Ajustes</h3>
          <div className="stat-value">{stats.ajustes}</div>
        </div>
        <div className="stat-card finalizado">
          <h3>Finalizados</h3>
          <div className="stat-value">{stats.finalizado}</div>
        </div>
      </div>

      <section className="recent-projects-section">
        <div className="section-header">
          <h2>Proyectos Recientes</h2>
          <Link to="/projects" className="view-all-link">Ver todos</Link>
        </div>
        
        <div className="recent-projects-list">
          {recentProjects.length === 0 ? (
            <div className="no-projects">No hay proyectos disponibles</div>
          ) : (
            recentProjects.map(project => (
              <div key={project.id} className="recent-project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className={`status-badge status-${project.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                <div className="project-details">
                  <div className="detail-row">
                    <span className="detail-label">Cliente:</span>
                    <span className="detail-value">{project.client}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">QA:</span>
                    <span className="detail-value">{project.qaAssigned}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">PM:</span>
                    <span className="detail-value">{project.projectManager}</span>
                  </div>
                </div>
                <Link to={`/projects/${project.id}`} className="view-details-button">
                  Ver detalles
                </Link>
                {user?.role === 'admin' && (
                  <Link to={`/projects/edit/${project.id}`} className="edit-project-button">
                    Editar
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
        {user?.role === 'admin' && (
          <Link to="/projects/new" className="add-project-button">
            Agregar Proyecto
          </Link>
        )}
      </section>
    </div>
  );
};

export default Dashboard;