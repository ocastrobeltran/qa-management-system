// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simular la verificación de autenticación al cargar la aplicación
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//     setLoading(false);
//   }, []);

//   const checkAuthStatus = useCallback(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       setUser(null);
//     }
//   }, []);

//   const login = async (email, password) => {
//     // Simular la autenticación
//     if (email === 'oscar@gmail.com' && password === '1234') {
//       const user = { email, role: 'admin' };
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return true;
//     }

//     // Verificar otros usuarios registrados
//     const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//     const foundUser = storedUsers.find(user => user.email === email && user.password === password);
//     if (foundUser) {
//       const user = { email: foundUser.email, role: 'user' };
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return true;
//     }

//     return false;
//   };

//   const register = async (email, password) => {
//     // Simular el registro
//     const newUser = { email, password, role: 'user' };
//     const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//     storedUsers.push(newUser);
//     localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
//     localStorage.setItem('user', JSON.stringify({ email, role: 'user' }));
//     setUser({ email, role: 'user' });
//     return true;
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   return {
//     user,
//     loading,
//     isAuthenticated: !!user,
//     checkAuthStatus,
//     login,
//     register,
//     logout,
//   };
// };

// export { useAuth };

// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simular la verificación de autenticación al cargar la aplicación
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//     setLoading(false);
//   }, []);

//   const checkAuthStatus = useCallback(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       setUser(null);
//     }
//   }, []);

//   const login = async (email, password) => {
//     // Simular la autenticación
//     if (email === 'oscar@gmail.com' && password === '1234') {
//       const user = { email, role: 'admin' };
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return true;
//     }

//     // Verificar otros usuarios registrados
//     const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//     const foundUser = storedUsers.find(user => user.email === email && user.password === password);
//     if (foundUser) {
//       const user = { email: foundUser.email, role: 'user' };
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);
//       return true;
//     }

//     return false;
//   };

//   const register = async (email, password) => {
//     // Simular el registro
//     const newUser = { email, password, role: 'user' };
//     const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//     storedUsers.push(newUser);
//     localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
//     localStorage.setItem('user', JSON.stringify({ email, role: 'user' }));
//     setUser({ email, role: 'user' });
//     return true;
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   return {
//     user,
//     loading,
//     isAuthenticated: !!user,
//     checkAuthStatus,
//     login,
//     register,
//     logout,
//   };
// };

// export { useAuth };

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular la verificación de autenticación al cargar la aplicación
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const checkAuthStatus = useCallback(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/webhook/login', { email, password });
      const { token, role } = response;
      const user = { email, role, token };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await api.post('/webhook/registro', { email, password });
      const { token, role } = response;
      const user = { email, role, token };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Error al registrar:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    checkAuthStatus,
    login,
    register,
    logout,
  };
};

export { useAuth };