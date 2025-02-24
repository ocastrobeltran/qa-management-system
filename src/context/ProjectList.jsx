import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import './ProjectList.css';

const ProjectList = () => {
  const { projects, loading, error } = useContext(ProjectContext);

  if (loading) return <div className="loading">Cargando proyectos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <div className="no-projects">No hay proyectos disponibles</div>
      ) : (
        projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>Cliente: {project.client}</p>
            <p>QA Asignado: {project.qaAssigned}</p>
            <p>PM: {project.projectManager}</p>
            <p>Estado: {project.status}</p>
            <p>Fecha de inicio: {new Date(project.startDate).toLocaleDateString()}</p>
            <p>Fecha de fin: {new Date(project.endDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;