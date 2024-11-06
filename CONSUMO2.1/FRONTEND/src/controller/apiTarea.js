// src/controller/apiTarea.js
import { API } from './api';

// Obtener tareas de un proyecto específico
export const fetchTasks = async (projectId, token) => {
    const response = await API.get(`/api/proyectos/${projectId}/tareas`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


// Crear una nueva tarea
export const createTask = async (projectId, taskData, token) => {
    const response = await API.post(`/api/proyectos/${projectId}/tareas`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


// Eliminar una tarea específica
export const deleteTask = async (projectId,taskId, token) => {
    const response = await API.delete(`/api/proyectos/${projectId}/tareas/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Editar una tarea específica
export const updateTask = async (projectId, taskId, taskData, token) => {
    const response = await API.put(`/api/proyectos/${projectId}/tareas/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


