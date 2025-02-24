// /**
//  * Servicios para autenticación
//  */
// import api from './api';

// export const authService = {
//   /**
//    * Iniciar sesión
//    * @param {string} email - Correo electrónico
//    * @param {string} password - Contraseña
//    * @returns {Promise<Object>} - Datos del usuario y token
//    */
//   login: async (email, password) => {
//     return api.post('/auth/login', { email, password });
//   },
  
//   /**
//    * Registrar un nuevo usuario
//    * @param {Object} userData - Datos del usuario
//    * @returns {Promise<Object>} - Datos del usuario creado
//    */
//   register: async (userData) => {
//     return api.post('/auth/register', userData);
//   },
  
//   /**
//    * Validar token de autenticación
//    * @param {string} token - Token JWT
//    * @returns {Promise<Object>} - Datos del usuario
//    */
//   validateToken: async (token) => {
//     return api.get('/auth/validate');
//   },
  
//   /**
//    * Cerrar sesión (solo en el cliente)
//    */
//   logout: () => {
//     localStorage.removeItem('authToken');
//   }
// };

import api from './api';

const WEBHOOK_URLS = {
  LOGIN: 'https://agente-la-cardio.onrender.com/webhook/login',
  REGISTER: 'https://agente-la-cardio.onrender.com/webhook/registro',
  VALIDATE_TOKEN: 'https://agente-la-cardio.onrender.com/webhook/validate-token',
};

const authService = {
  login: async (email, password) => {
    const response = await api.post(WEBHOOK_URLS.LOGIN, { email, password });
    if (response && response.success && response.token && response.user) {
      return response;
    } else {
      throw new Error(response.message || 'Invalid login response');
    }
  },
  register: async (email, password) => {
    const response = await api.post(WEBHOOK_URLS.REGISTER, { email, password });
    if (response && response.success && response.token && response.user) {
      return response;
    } else {
      throw new Error(response.message || 'Invalid register response');
    }
  },
  validateToken: async (token) => {
    const response = await api.get(WEBHOOK_URLS.VALIDATE_TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  },
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export { authService };