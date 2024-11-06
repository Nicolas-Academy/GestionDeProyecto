// src/components/proyecto/EliminarProyecto.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProject } from '../../controller/apiProyecto';

const EliminarProyecto = () => {
    const { id } = useParams(); // Obtenemos el ID del proyecto de los parámetros de la URL
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleDelete = async () => {
        try {
            await deleteProject(id, token);
            alert('Proyecto eliminado correctamente');
            navigate('/proyectos'); // Redirige a la lista de proyectos después de eliminar
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
            alert('Hubo un error al eliminar el proyecto');
        }
    };

    const handleCancel = () => {
        navigate('/proyectos'); // Redirige a la lista de proyectos sin eliminar
    };

    return (
        <div>
            <h2>¿Estás seguro de que deseas eliminar este proyecto?</h2>
            <button onClick={handleDelete} style={{ color: 'red' }}>Eliminar Proyecto</button>
            <button onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
        </div>
    );
};

export default EliminarProyecto;
