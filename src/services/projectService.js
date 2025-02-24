// /**
//  * Servicios para gestión de proyectos
//  */
// import api from './api';

// export const projectService = {
//   /**
//    * Obtener todos los proyectos
//    * @param {Object} filters - Filtros a aplicar
//    * @returns {Promise<Array>} - Lista de proyectos
//    */
//   getProjects: async (filters = {}) => {
//     const queryParams = new URLSearchParams();
    
//     // Agregar filtros a la URL si existen
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) queryParams.append(key, value);
//     });
    
//     const queryString = queryParams.toString();
//     const url = queryString ? `/projects?${queryString}` : '/projects';
    
//     return api.get(url);
//   },
  
//   /**
//    * Obtener un proyecto por ID
//    * @param {string|number} id - ID del proyecto
//    * @returns {Promise<Object>} - Datos del proyecto
//    */
//   getProjectById: async (id) => {
//     return api.get(`/projects/${id}`);
//   },
  
//   /**
//    * Crear un nuevo proyecto
//    * @param {Object} projectData - Datos del proyecto
//    * @returns {Promise<Object>} - Proyecto creado
//    */
//   createProject: async (projectData) => {
//     return api.post('/projects', projectData);
//   },
  
//   /**
//    * Actualizar un proyecto existente
//    * @param {string|number} id - ID del proyecto
//    * @param {Object} projectData - Nuevos datos del proyecto
//    * @returns {Promise<Object>} - Proyecto actualizado
//    */
//   updateProject: async (id, projectData) => {
//     return api.put(`/projects/${id}`, projectData);
//   },
  
//   /**
//    * Actualizar el estado de un proyecto
//    * @param {string|number} id - ID del proyecto
//    * @param {string} newStatus - Nuevo estado
//    * @param {string} comment - Comentario sobre el cambio
//    * @returns {Promise<Object>} - Proyecto actualizado
//    */
//   updateProjectStatus: async (id, newStatus, comment) => {
//     return api.patch(`/projects/${id}/status`, { status: newStatus, comment });
//   },
  
//   /**
//    * Agregar un comentario a un proyecto
//    * @param {string|number} id - ID del proyecto
//    * @param {string} comment - Texto del comentario
//    * @returns {Promise<Object>} - Proyecto actualizado
//    */
//   addComment: async (id, comment) => {
//     return api.post(`/projects/${id}/comments`, { comment });
//   },
  
//   /**
//    * Eliminar un proyecto
//    * @param {string|number} id - ID del proyecto
//    * @returns {Promise<void>}
//    */
//   deleteProject: async (id) => {
//     return api.delete(`/projects/${id}`);
//   }
// };

import api from "./api"

const WEBHOOK_URLS = {
  GET_PROJECTS: "https://agente-la-cardio.onrender.com/webhook/obtener-proyectos",
  CREATE_PROJECT: "https://agente-la-cardio.onrender.com/webhook/crear-proyecto",
  UPDATE_PROJECT_STATUS: "https://agente-la-cardio.onrender.com/webhook/actualizar-estado-proyecto",
  ADD_COMMENT: "https://agente-la-cardio.onrender.com/webhook/agregar-comentario",
}

export const projectService = {
  getProjects: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters)
    const response = await api.get(`${WEBHOOK_URLS.GET_PROJECTS}?${queryParams}`)
    return response.data; // Asegúrate de devolver la propiedad 'data'
  },

  createProject: async (projectData) => {
    return api.post(WEBHOOK_URLS.CREATE_PROJECT, projectData)
  },

  updateProjectStatus: async (id, newStatus, comment) => {
    return api.patch(`${WEBHOOK_URLS.UPDATE_PROJECT_STATUS}/${id}`, { status: newStatus, comment })
  },

  addComment: async (id, comment) => {
    return api.post(`${WEBHOOK_URLS.ADD_COMMENT}/${id}`, { comment })
  },

  // Nota: No hay un webhook específico para estas operaciones.
  // Si las necesitas, deberás crear workflows adicionales en n8n.
  getProjectById: async (id) => {
    console.warn("getProjectById: Esta función no está implementada en los webhooks actuales.")
    return Promise.reject("Función no implementada")
  },

  updateProject: async (id, projectData) => {
    console.warn("updateProject: Esta función no está implementada en los webhooks actuales.")
    return Promise.reject("Función no implementada")
  },

  deleteProject: async (id) => {
    console.warn("deleteProject: Esta función no está implementada en los webhooks actuales.")
    return Promise.reject("Función no implementada")
  },
}