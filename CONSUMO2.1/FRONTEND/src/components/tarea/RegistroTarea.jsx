// src/components/tarea/RegistroTarea.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask } from '../../controller/apiTarea';

const RegistroTarea = () => {
    const { projectId } = useParams(); // Obtener el ID del proyecto desde la URL
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Obtener el token de autenticación
    
    // Estado para los datos de la tarea
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('pendiente');
    const [prioridad, setPrioridad] = useState(3); // Prioridad predeterminada

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Crear la tarea con los datos del formulario
            await createTask(projectId, { titulo, descripcion, estado, prioridad }, token);
            // Redirigir a la lista de tareas del proyecto
            navigate(`/proyectos/${projectId}/tareas`);
        } catch (error) {
            console.error("Error al crear tarea:", error);
        }
    };

    return (
        <div>
            <h2>Registrar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                
                <label>Descripción:</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
                
                <label>Estado:</label>
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
                
                <label>Prioridad:</label>
                <select
                    value={prioridad}
                    onChange={(e) => setPrioridad(Number(e.target.value))}
                >
                    <option value={1}>1 - Muy Baja</option>
                    <option value={2}>2 - Baja</option>
                    <option value={3}>3 - Normal</option>
                    <option value={4}>4 - Alta</option>
                    <option value={5}>5 - Muy Alta</option>
                </select>
                
                <button type="submit">Crear Tarea</button>
            </form>
        </div>
    );
};

export default RegistroTarea;
