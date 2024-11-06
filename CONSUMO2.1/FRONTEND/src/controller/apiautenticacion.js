
// src/controller/apiautenticacion.js
import { API } from './api';

export const registerUser = async (userData) => {
    try {
        const response = await API.post('/api/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en el registro');
    }
};
// Login de usuario
export const loginUser = async (userData) => {
    const response = await API.post('/api/login', userData);
    return response.data;
};


