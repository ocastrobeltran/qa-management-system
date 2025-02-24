/**
 * Configuración base para todas las peticiones API
 
import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Si el error es 401 (no autorizado), limpiar localStorage y redirigir a login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    // Construir mensaje de error para mostrar al usuario
    const errorMessage = 
      error.response?.data?.message ||
      error.message ||
      'Ha ocurrido un error al procesar la solicitud';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
*/

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agente-la-cardio.onrender.com', // Reemplaza con la URL base de tu backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token de autenticación a cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Si el error es 401 (no autorizado), limpiar localStorage y redirigir a login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Construir mensaje de error para mostrar al usuario
    const errorMessage = 
      error.response?.data?.message ||
      error.message ||
      'Ha ocurrido un error al procesar la solicitud';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;