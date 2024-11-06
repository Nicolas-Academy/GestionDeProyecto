// src/components/tarea/Tareas.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EliminarTarea from './EliminarTarea'; // Importar el componente para eliminar tarea
import { fetchTasks } from '../../controller/apiTarea';

const Tareas = () => {
    const { projectId } = useParams(); // Obtener el ID del proyecto desde la URL
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const data = await fetchTasks(projectId, token); // Llama a la API para obtener las tareas
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        getTasks();
    }, [projectId, token]);

    // Manejar eliminación de la tarea
    const handleDeleteTask = async (taskId) => {
        const result = await EliminarTarea(projectId, taskId, token); // Pasar projectId y taskId
        if (result.success) {
            setTasks(tasks.filter(task => task._id !== taskId)); // Actualizar la lista de tareas
        } else {
            console.error("Error al eliminar la tarea:", result.error);
        }
    };

    const redirectToRegisterTask = () => {
        navigate(`/proyectos/${projectId}/tareas/registro`);
    };

    const redirectToProjectList = () => {
        navigate('/proyectos');
    };

    return (
        <div>
            <h2>Tareas del Proyecto</h2>
            <button onClick={redirectToRegisterTask}>Crear Tarea</button>
            <button onClick={redirectToProjectList} style={{ marginLeft: '10px' }}>Volver a Proyectos</button>
            {tasks.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {tasks.map(task => (
                        <li key={task._id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3>{task.titulo}</h3>
                            <p><strong>Descripción:</strong> {task.descripcion}</p>
                            <p><strong>Estado:</strong> {task.estado}</p>
                            <p><strong>Prioridad:</strong> {task.prioridad}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button onClick={() => navigate(`/proyectos/${projectId}/tareas/editar/${task._id}`)}>
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteTask(task._id)} style={{ color: 'red' }}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay tareas creadas aún para este proyecto.</p>
            )}
        </div>
    );
};

export default Tareas;
