/**
 * Funciones de utilidad para el proyecto
 */

/**
 * Formatea una fecha para mostrarla en la interfaz
 * @param {string} dateString - Fecha en formato ISO
 * @param {boolean} includeTime - Si debe incluir la hora
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    
    return date.toLocaleDateString('es-CO', options);
  };
  
  /**
   * Obtiene un color basado en el estado del proyecto
   * @param {string} status - Estado del proyecto
   * @returns {Object} Objeto con color de fondo y texto
   */
  export const getStatusColor = (status) => {
    switch (status) {
      case 'No iniciado':
        return { bg: '#e5e7eb', text: '#374151' }; // Gris
      case 'Documentación':
        return { bg: '#dbeafe', text: '#1e40af' }; // Azul claro
      case 'Ejecución':
        return { bg: '#fef3c7', text: '#92400e' }; // Amarillo
      case 'Ajustes':
        return { bg: '#fee2e2', text: '#b91c1c' }; // Rojo claro
      case 'Finalizado':
        return { bg: '#d1fae5', text: '#065f46' }; // Verde
      default:
        return { bg: '#f3f4f6', text: '#1f2937' }; // Gris claro por defecto
    }
  };
  
  /**
   * Trunca un texto si excede cierta longitud
   * @param {string} text - Texto a truncar
   * @param {number} maxLength - Longitud máxima
   * @returns {string} Texto truncado
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };
  
  /**
   * Filtra proyectos según criterios
   * @param {Array} projects - Lista de proyectos
   * @param {Object} filters - Criterios de filtrado
   * @returns {Array} Proyectos filtrados
   */
  export const filterProjects = (projects, filters) => {
    return projects.filter(project => {
      let matches = true;
      
      if (filters.status && project.status !== filters.status) {
        matches = false;
      }
      
      if (filters.client && project.client !== filters.client) {
        matches = false;
      }
      
      if (filters.qaAssigned && project.qaAssigned !== filters.qaAssigned) {
        matches = false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = project.name.toLowerCase().includes(searchLower);
        const clientMatch = project.client.toLowerCase().includes(searchLower);
        
        if (!nameMatch && !clientMatch) {
          matches = false;
        }
      }
      
      return matches;
    });
  };
  
  /**
   * Ordena proyectos por un campo específico
   * @param {Array} projects - Lista de proyectos
   * @param {Object} sortConfig - Configuración de ordenamiento
   * @returns {Array} Proyectos ordenados
   */
  export const sortProjects = (projects, sortConfig) => {
    if (!sortConfig || !sortConfig.key) return projects;
    
    return [...projects].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  /**
   * Genera un ID único
   * @returns {string} ID único
   */
  export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  