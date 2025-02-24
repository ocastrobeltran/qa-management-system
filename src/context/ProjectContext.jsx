import React, { createContext, useState, useEffect, useContext } from 'react';
import { projectService } from '../services/projectService';
import { AuthContext } from './AuthContext';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    qaAssigned: '',
  });
  
  const { user } = useContext(AuthContext);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjects(filters);
      console.log('API Response:', response); // Agregar console.log para verificar la respuesta
      const data = response.data; // Asegurarse de acceder a la propiedad 'data'
      setProjects(Array.isArray(data) ? data : []); // Asegurarse de que data sea un array
      setError(null);
    } catch (err) {
      setError('Error al cargar los proyectos');
      console.error(err);
      setProjects([]); // Asegurarse de que projects sea un array en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [filters, user]);

  const getProjectById = (id) => {
    return projects.find(project => project.id === parseInt(id, 10));
  };

  const value = {
    projects,
    loading,
    error,
    filters,
    setFilters,
    getProjectById,
    refreshProjects: fetchProjects
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;