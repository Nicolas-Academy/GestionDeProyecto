// src/controller/api.js
// src/controller/api.js
import axios from 'axios';

export const API_URL = 'http://localhost:5000'; // Ajusta esto a la URL de tu backend
export const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
