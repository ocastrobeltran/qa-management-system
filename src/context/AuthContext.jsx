import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
// Importa el servicio mock para desarrollo
import { mockAuthService } from '../services/mockService';

// Determinar qué servicio usar (mock durante desarrollo)
const authApi = process.env.REACT_APP_USE_MOCK_API === 'true' 
  ? mockAuthService 
  : authService;

// Crear el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si hay un token guardado al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const userData = await authApi.validateToken(token);
        setUser(userData);
      } catch (err) {
        console.error('Error validando token:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authApi.login(email, password);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      return true;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authApi.register(email, password);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      return true;
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Valor del contexto
  const contextValue = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    setUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};