import { ERROR_MESSAGES } from './constants';

/**
 * Valida un campo requerido
 * @param {any} value - Valor a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateRequired = (value) => {
  if (!value && value !== 0) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (typeof value === 'string' && value.trim() === '') return ERROR_MESSAGES.REQUIRED_FIELD;
  return null;
};

/**
 * Valida una URL
 * @param {string} value - URL a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateUrl = (value) => {
  if (!value) return null;
  
  try {
    new URL(value);
    return null;
  } catch (e) {
    return ERROR_MESSAGES.INVALID_URL;
  }
};

/**
 * Valida una fecha
 * @param {string} value - Fecha a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateDate = (value) => {
  if (!value) return null;
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return ERROR_MESSAGES.INVALID_DATE;
  }
  
  return null;
};

/**
 * Valida que una fecha sea posterior a otra
 * @param {string} endDate - Fecha de fin
 * @param {string} startDate - Fecha de inicio
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateDateRange = (endDate, startDate) => {
  if (!endDate || !startDate) return null;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (end < start) {
    return 'La fecha de culminación debe ser posterior a la fecha de ingreso';
  }
  
  return null;
};

/**
 * Valida un formulario de proyecto completo
 * @param {Object} project - Datos del proyecto
 * @returns {Object} Objeto con errores encontrados
 */
export const validateProject = (project) => {
  const errors = {};
  
  // Validar campos requeridos
  const requiredFields = [
    'name',
    'client',
    'qaAssigned',
    'frontDev',
    'backDev',
    'projectManager',
    'startDate'
  ];
  
  requiredFields.forEach(field => {
    const error = validateRequired(project[field]);
    if (error) errors[field] = error;
  });
  
  // Validar URL
  const urlError = validateUrl(project.repositoryUrl);
  if (urlError) errors.repositoryUrl = urlError;
  
  // Validar fechas
  const startDateError = validateDate(project.startDate);
  if (startDateError) errors.startDate = startDateError;
  
  if (project.endDate) {
    const endDateError = validateDate(project.endDate);
    if (endDateError) {
      errors.endDate = endDateError;
    } else {
      const rangeError = validateDateRange(project.endDate, project.startDate);
      if (rangeError) errors.endDate = rangeError;
    }
  }
  
  return errors;
};

/**
 * Valida un formulario de inicio de sesión
 * @param {Object} loginData - Datos de inicio de sesión
 * @returns {Object} Objeto con errores encontrados
 */
export const validateLogin = (loginData) => {
  const errors = {};
  
  if (!loginData.email) {
    errors.email = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
    errors.email = 'El correo electrónico no es válido';
  }
  
  if (!loginData.password) {
    errors.password = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  return errors;
};