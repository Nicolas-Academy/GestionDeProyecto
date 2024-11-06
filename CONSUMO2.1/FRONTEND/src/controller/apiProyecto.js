// src/controller/apiProyecto.js
import { API } from './api';

// Obtener proyectos
export const fetchProjects = async (token) => {
    const response = await API.get('/api/proyectos', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Crear un nuevo proyecto
export const createProject = async (projectData, token) => {
    const response = await API.post('/api/proyectos', projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Actualizar un proyecto
export const updateProject = async (id, projectData, token) => {
    const response = await API.put(`/api/proyectos/${id}`, projectData, {
        headers: { Authorization: `Bearer ${token}` },
    });       
    return response.data;
};


// Eliminar un proyecto
// Función para eliminar un proyecto
export const deleteProject = async (id, token) => {
    const response = await API.delete(`/api/proyectos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
