import React from 'react';
import { useProjects } from '../../../hooks/useProjects';
import ProjectCard from '../ProjectCard/ProjectCard';
import Loader from '../../common/Loader/Loader';
import ProjectFilters from '../ProjectFilters/ProjectFilters';

const ProjectList = () => {
  const { projects, loading, error, filters, setFilters } = useProjects();

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="project-list-container">
      <ProjectFilters filters={filters} setFilters={setFilters} />
      {projects.length === 0 ? (
        <div className="no-projects">No hay proyectos disponibles</div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;