// Opciones para los clientes
export const CLIENTS = [
    'Colsubsidio',
    'LaCardio',
    'Autogermana',
    'Bolívar'
  ];
  
  // Opciones para el equipo de QA
  export const QA_TEAM = [
    'Oscar Castro',
    'Merary Lopez'
  ];
  
  // Opciones para desarrolladores frontend
  export const FRONTEND_DEVS = [
    'Oscar Perez',
    'Johana Camperos',
    'Laura Castellanos'
  ];
  
  // Opciones para desarrolladores backend
  export const BACKEND_DEVS = [
    'Oscar Estrada',
    'Jose Gomez',
    'Isabel Rojas'
  ];
  
  // Opciones para Project Managers
  export const PROJECT_MANAGERS = [
    'Mateo Valencia',
    'Natalia Rincon'
  ];
  
  // Estados posibles del proyecto
  export const PROJECT_STATUSES = [
    'No iniciado',
    'Documentación',
    'Ejecución',
    'Ajustes',
    'Finalizado'
  ];
  
  // Roles de usuario
  export const USER_ROLES = {
    ADMIN: 'admin',
    GUEST: 'guest'
  };
  
  // Rutas principales de la aplicación
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROJECTS: '/projects',
    PROJECT_DETAIL: '/projects/:id',
    PROJECT_FORM: '/projects/new',
    PROJECT_EDIT: '/projects/edit/:id',
    DASHBOARD: '/dashboard',
    NOT_FOUND: '*'
  };
  
  // Mensajes de error comunes
  export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'Este campo es obligatorio',
    INVALID_URL: 'Por favor ingresa una URL válida',
    INVALID_DATE: 'Por favor ingresa una fecha válida',
    SERVER_ERROR: 'Ha ocurrido un error en el servidor',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
    LOGIN_FAILED: 'Credenciales incorrectas. Por favor intenta nuevamente',
    PROJECT_NOT_FOUND: 'El proyecto no fue encontrado'
  };
  
  // Configuración para peticiones HTTP
  export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || '/api',
    TIMEOUT: 10000,
    HEADERS: {
      'Content-Type': 'application/json'
    }
  };