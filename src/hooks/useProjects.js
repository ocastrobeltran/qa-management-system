// import { useState, useEffect, useCallback, useContext } from 'react';
// import { projectService } from '../services/projectService';
// import { AuthContext } from '../context/AuthContext';

// export const useProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     qaAssigned: '',
//   });
//   const { user } = useContext(AuthContext);

//   const fetchProjects = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await projectService.getProjects(filters);
//       setProjects(data);
//       setError(null);
//     } catch (err) {
//       setError('Error al cargar los proyectos');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => {
//     fetchProjects();
//   }, [fetchProjects]);

//   const getProjectById = useCallback((id) => {
//     return projects.find(project => project.id === parseInt(id, 10));
//   }, [projects]);

//   const createProject = useCallback(async (projectData) => {
//     try {
//       setLoading(true);
//       const newProject = await projectService.createProject({
//         ...projectData,
//         status: 'No iniciado',
//         comments: projectData.comments ? [{
//           text: projectData.comments,
//           date: new Date().toISOString(),
//           author: user.name,
//           statusChange: null
//         }] : []
//       });
//       setProjects(prev => [...prev, newProject]);
//       return newProject.id;
//     } catch (err) {
//       setError('Error al crear el proyecto');
//       console.error(err);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   }, [user]);

//   const updateProject = useCallback(async (id, projectData) => {
//     try {
//       setLoading(true);
//       const updatedProject = await projectService.updateProject(id, projectData);
//       setProjects(prev => 
//         prev.map(project => project.id === parseInt(id, 10) ? updatedProject : project)
//       );
//     } catch (err) {
//       setError('Error al actualizar el proyecto');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateProjectStatus = useCallback(async (id, newStatus, commentText) => {
//     try {
//       setLoading(true);
//       const project = getProjectById(id);
      
//       if (!project) {
//         throw new Error('Proyecto no encontrado');
//       }

//       const newComment = {
//         text: commentText,
//         date: new Date().toISOString(),
//         author: user.name,
//         statusChange: {
//           from: project.status,
//           to: newStatus
//         }
//       };

//       const updatedProject = await projectService.updateProject(id, {
//         ...project,
//         status: newStatus,
//         comments: [...project.comments, newComment]
//       });

//       setProjects(prev => 
//         prev.map(p => p.id === parseInt(id, 10) ? updatedProject : p)
//       );
//     } catch (err) {
//       setError('Error al actualizar el estado del proyecto');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [getProjectById, user]);

//   const addComment = useCallback(async (id, text) => {
//     try {
//       setLoading(true);
//       const project = getProjectById(id);
      
//       if (!project) {
//         throw new Error('Proyecto no encontrado');
//       }

//       const newComment = {
//         text,
//         date: new Date().toISOString(),
//         author: user.name,
//         statusChange: null
//       };

//       const updatedProject = await projectService.updateProject(id, {
//         ...project,
//         comments: [...project.comments, newComment]
//       });

//       setProjects(prev => 
//         prev.map(p => p.id === parseInt(id, 10) ? updatedProject : p)
//       );
//     } catch (err) {
//       setError('Error al agregar el comentario');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [getProjectById, user]);

//   return {
//     projects,
//     loading,
//     error,
//     filters,
//     setFilters,
//     getProjectById,
//     createProject,
//     updateProject,
//     updateProjectStatus,
//     addComment,
//     refreshProjects: fetchProjects
//   };
// };

import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.getProjects();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los proyectos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
  };
};

export { useProjects };