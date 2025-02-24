import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import ProjectStatusBadge from '../../components/project/ProjectStatusBadge/ProjectStatusBadge';
import ProjectComments from '../../components/project/ProjectComments/ProjectComments';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProjectById, loading, error } = useProjects();

  const project = getProjectById(parseInt(id, 10));

  if (loading) return <div className="loading">Cargando detalles del proyecto...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!project) return <div className="not-found">Proyecto no encontrado</div>;

  return (
    <div className="project-detail-page">
      <div className="project-header">
        <div className="title-section">
          <h1>{project.name}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>
        <div className="actions-section">
          {user?.role === 'admin' && (
            <button 
              className="edit-button"
              onClick={() => navigate(`/projects/edit/${id}`)}
            >
              Editar Proyecto
            </button>
          )}
          <button 
            className="back-button"
            onClick={() => navigate('/projects')}
          >
            Volver a la Lista
          </button>
        </div>
      </div>

      <div className="project-info-grid">
        <div className="info-card">
          <h2>Información General</h2>
          <div className="info-content">
            <div className="info-row">
              <span className="info-label">Cliente:</span>
              <span className="info-value">{project.client}</span>
            </div>
            <div className="info-row">
              <span className="info-label">QA Asignado:</span>
              <span className="info-value">{project.qaAssigned}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Desarrollador Frontend:</span>
              <span className="info-value">{project.frontDev}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Desarrollador Backend:</span>
              <span className="info-value">{project.backDev}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Project Manager:</span>
              <span className="info-value">{project.projectManager}</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>Fechas</h2>
          <div className="info-content">
            <div className="info-row">
              <span className="info-label">Fecha de Ingreso:</span>
              <span className="info-value">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Fecha de Culminación:</span>
              <span className="info-value">
                {project.endDate 
                  ? new Date(project.endDate).toLocaleDateString() 
                  : 'Pendiente'}
              </span>
            </div>
          </div>
        </div>

        <div className="info-card full-width">
          <h2>Repositorio</h2>
          <div className="info-content">
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="repo-link">
              {project.repositoryUrl}
            </a>
          </div>
        </div>
      </div>

      <ProjectComments 
        projectId={project.id} 
        comments={project.comments || []} 
        isAdmin={user?.role === 'admin'}
      />
    </div>
  );
};

export default ProjectDetailPage;