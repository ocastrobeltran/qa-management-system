import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import ProjectForm from '../../components/project/ProjectForm/ProjectForm';
import './ProjectFormPage.css';

const ProjectFormPage = ({ isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, createProject, updateProject, loading, error } = useProjects();
  const [project, setProject] = useState(null);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const existingProject = getProjectById(parseInt(id, 10));
      if (!existingProject) {
        setPageError('Proyecto no encontrado');
      } else {
        setProject(existingProject);
      }
    }
  }, [isEditing, id, getProjectById]);

  const handleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await updateProject(id, formData);
        navigate(`/projects/${id}`);
      } else {
        const newId = await createProject(formData);
        navigate(`/projects/${newId}`);
      }
    } catch (err) {
      setPageError('Error al guardar el proyecto. Intenta de nuevo.');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (pageError) return <div className="error-message">{pageError}</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (isEditing && !project) return <div className="loading">Cargando proyecto...</div>;

  return (
    <div className="project-form-page">
      <h1>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h1>
      <ProjectForm 
        initialData={project} 
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ProjectFormPage;