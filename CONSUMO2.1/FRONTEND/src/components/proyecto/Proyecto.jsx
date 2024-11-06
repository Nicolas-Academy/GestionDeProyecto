// src/components/proyecto/Proyecto.jsx
import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../../controller/apiProyecto';
import { useNavigate } from 'react-router-dom';

const Proyecto = () => {
    const [projects, setProjects] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            if (!token) {
                console.error("No token found, please log in.");
                navigate('/'); // Redirige al login si no hay token
                return;
            }
            try {
                const data = await fetchProjects(token);
                setProjects(data);
            } catch (error) {
                console.error("Error al obtener proyectos:", error);
            }
        };
        getProjects();
    }, [token, navigate]);

    // Función para redirigir a la página de edición de un proyecto
    const handleEdit = (id) => {
        navigate(`/proyectos/editar/${id}`);
    };

    // Función para eliminar un proyecto
    const handleDelete = async (id) => {
        try {
            await deleteProject(id, token);
            setProjects(projects.filter(project => project._id !== id)); // Actualiza la lista de proyectos
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
        }
    };

    // Función para redirigir a la página de registro de un nuevo proyecto
    const redirectToRegistroProyecto = () => {
        navigate('/proyectos/registro');
    };

    return (
        <div>
            <h1>Proyectos</h1>
            <button onClick={() => navigate(`/`)}>salir</button>
            <button onClick={redirectToRegistroProyecto}>Crear Proyecto</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div 
                            key={project._id} 
                            style={{
                                border: '1px solid #ddd',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '300px',
                                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                position: 'relative',
                            }}
                        >
                            <h3>{project.nombre}</h3>
                            <p>{project.descripcion}</p>
                            <p>Fecha de Inicio: {new Date(project.fechaInicio).toLocaleDateString()}</p>
                            <p>Fecha de Fin: {new Date(project.fechaFin).toLocaleDateString()}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <button onClick={() => handleEdit(project._id)}>Actualizar</button>
                                <button onClick={() => handleDelete(project._id)} style={{ color: 'red' }}>Eliminar</button>
                                <button onClick={() => navigate(`/proyectos/${project._id}/tareas`)}>Tareas</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay proyectos creados aún.</p>
                )}
            </div>
        </div>
    );
};

export default Proyecto;
