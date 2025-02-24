/**
 * Servicios mock para desarrollo sin backend
 */
import { generateId } from '../utils/helpers';
import { filterProjects } from '../utils/helpers';

// Datos de ejemplo
let mockProjects = [
  {
    id: 1,
    name: "Rediseño Portal Colsubsidio",
    client: "Colsubsidio",
    status: "Ejecución",
    qaAssigned: "Oscar Castro",
    frontDev: "Johana Camperos",
    backDev: "Oscar Estrada",
    projectManager: "Mateo Valencia",
    repositoryUrl: "https://github.com/empresa/project-colsubsidio",
    startDate: "2025-01-15",
    endDate: "2025-02-28",
    comments: [
      {
        id: 1,
        text: "Iniciando fase de pruebas funcionales",
        date: "2025-01-20T10:30:00Z",
        author: "Oscar Castro",
        statusChange: {
          from: "Documentación",
          to: "Ejecución"
        }
      },
      {
        id: 2,
        text: "Se encontraron problemas en el formulario de contacto",
        date: "2025-01-25T14:45:00Z",
        author: "Oscar Castro",
        statusChange: null
      }
    ]
  },
  {
    id: 2,
    name: "App Móvil LaCardio",
    client: "LaCardio",
    status: "Documentación",
    qaAssigned: "Merary Lopez",
    frontDev: "Laura Castellanos",
    backDev: "Jose Gomez",
    projectManager: "Natalia Rincon",
    repositoryUrl: "https://github.com/empresa/app-lacardio",
    startDate: "2025-02-01",
    endDate: "",
    comments: [
      {
        id: 1,
        text: "Recibiendo documentación del proyecto",
        date: "2025-02-02T09:15:00Z",
        author: "Merary Lopez",
        statusChange: {
          from: "No iniciado",
          to: "Documentación"
        }
      }
    ]
  },
  {
    id: 3,
    name: "Sistema de Inventario Autogermana",
    client: "Autogermana",
    status: "No iniciado",
    qaAssigned: "Oscar Castro",
    frontDev: "Oscar Perez",
    backDev: "Isabel Rojas",
    projectManager: "Mateo Valencia",
    repositoryUrl: "https://github.com/empresa/inventario-autogermana",
    startDate: "2025-02-20",
    endDate: "2025-03-30",
    comments: []
  }
];

// Usuarios mock
const mockUsers = [
  {
    id: 1,
    name: "Admin QA",
    email: "admin@example.com",
    password: "password123", // En un entorno real, estaría hasheado
    role: "admin"
  },
  {
    id: 2,
    name: "Usuario Invitado",
    email: "guest@example.com",
    password: "guest123", // En un entorno real, estaría hasheado
    role: "guest"
  }
];

// Implementación del servicio mock para proyectos
export const mockProjectService = {
  getProjects: async (filters = {}) => {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return filterProjects(mockProjects, filters);
  },
  
  getProjectById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const project = mockProjects.find(p => p.id === parseInt(id, 10));
    if (!project) {
      throw new Error("Proyecto no encontrado");
    }
    
    return project;
  },
  
  createProject: async (projectData) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newProject = {
      ...projectData,
      id: mockProjects.length + 1,
      comments: projectData.comments || []
    };
    
    mockProjects.push(newProject);
    return newProject;
  },
  
  updateProject: async (id, projectData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockProjects.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error("Proyecto no encontrado");
    }
    
    const updatedProject = {
      ...mockProjects[index],
      ...projectData,
      id: parseInt(id, 10) // Asegurar que el ID se mantenga como número
    };
    
    mockProjects[index] = updatedProject;
    return updatedProject;
  },
  
  updateProjectStatus: async (id, newStatus, comment) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockProjects.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error("Proyecto no encontrado");
    }
    
    const project = mockProjects[index];
    const oldStatus = project.status;
    
    // Crear nuevo comentario con el cambio de estado
    const newComment = {
      id: generateId(),
      text: comment,
      date: new Date().toISOString(),
      author: "Usuario Actual", // En implementación real, vendría del token
      statusChange: {
        from: oldStatus,
        to: newStatus
      }
    };
    
    const updatedProject = {
      ...project,
      status: newStatus,
      comments: [...project.comments, newComment]
    };
    
    mockProjects[index] = updatedProject;
    return updatedProject;
  },
  
  addComment: async (id, comment) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockProjects.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error("Proyecto no encontrado");
    }
    
    const project = mockProjects[index];
    
    // Crear nuevo comentario
    const newComment = {
      id: generateId(),
      text: comment,
      date: new Date().toISOString(),
      author: "Usuario Actual", // En implementación real, vendría del token
      statusChange: null
    };
    
    const updatedProject = {
      ...project,
      comments: [...project.comments, newComment]
    };
    
    mockProjects[index] = updatedProject;
    return updatedProject;
  },
  
  deleteProject: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockProjects.findIndex(p => p.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error("Proyecto no encontrado");
    }
    
    mockProjects = mockProjects.filter(p => p.id !== parseInt(id, 10));
    return { success: true };
  }
};

// Implementación del servicio mock para autenticación
export const mockAuthService = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Credenciales incorrectas");
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}-${Date.now()}`
    };
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar si el email ya existe
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }
    
    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
      role: "guest" // Por defecto, los nuevos usuarios son invitados
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      user: userWithoutPassword,
      token: `mock-jwt-token-${newUser.id}-${Date.now()}`
    };
  },
  
  validateToken: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // En una implementación real, verificaríamos el token JWT
    // Aquí simplemente devolvemos un usuario de prueba
    const user = { ...mockUsers[0] };
    const { password: _, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  }
};