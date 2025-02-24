import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import ProjectList from '../../components/project/ProjectList/ProjectList';
import ProjectFilters from '../../components/project/ProjectFilters/ProjectFilters';
import './ProjectListPage.css';

const ProjectListPage = () => {
  const { user } = useAuth();
  const { loading, error } = useProjects();
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    qaAssigned: ''
  });

  if (loading) return <div className="loading">Cargando proyectos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="project-list-page">
      <div className="page-header">
        <h1>Proyectos QA</h1>
        {user?.role === 'admin' && (
          <Link to="/projects/new" className="new-project-button">
            Nuevo Proyecto
          </Link>
        )}
      </div>

      <ProjectFilters filters={filters} setFilters={setFilters} />
      
      <ProjectList filters={filters} />
    </div>
  );
};

export default ProjectListPage;