// src/components/tarea/EditarTarea.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask, fetchTasks } from '../../controller/apiTarea';

const EditarTarea = () => {
    const { projectId, tareaId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('pendiente');
    const [prioridad, setPrioridad] = useState(3);

    useEffect(() => {
        const loadTask = async () => {
            try {
                const data = await fetchTasks(projectId, token);
                const task = data.find(task => task._id === tareaId);
                if (task) {
                    setTitulo(task.titulo);
                    setDescripcion(task.descripcion);
                    setEstado(task.estado);
                    setPrioridad(task.prioridad);
                }
            } catch (error) {
                console.error("Error al cargar la tarea:", error);
            }
        };
        loadTask();
    }, [projectId, tareaId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(projectId, tareaId, { titulo, descripcion, estado, prioridad }, token);
            navigate(`/proyectos/${projectId}/tareas`); // Navigate back to Tareas page
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    return (
        <div>
            <h2>Editar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                
                <label>Descripción:</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                
                <label>Estado:</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
                
                <label>Prioridad:</label>
                <select value={prioridad} onChange={(e) => setPrioridad(Number(e.target.value))}>
                    <option value={1}>1 - Muy Baja</option>
                    <option value={2}>2 - Baja</option>
                    <option value={3}>3 - Normal</option>
                    <option value={4}>4 - Alta</option>
                    <option value={5}>5 - Muy Alta</option>
                </select>
                
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarTarea;
