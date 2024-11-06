// src/components/proyecto/EditarProyecto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjects, updateProject } from '../../controller/apiProyecto';

const EditarProyecto = () => {
    const { id } = useParams(); // Obtén el ID del proyecto de la URL
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Estado para los datos del proyecto
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // Cargar los datos del proyecto al montar el componente
    useEffect(() => {
        const loadProject = async () => {
            try {
                const data = await fetchProjects(id, token); // Obtén los datos del proyecto desde el backend
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setFechaInicio(data.fechaInicio.substring(0, 10));
                setFechaFin(data.fechaFin.substring(0, 10));
            } catch (error) {
                console.error("Error al cargar el proyecto:", error);
            }
        };

        loadProject();
    }, [id, token]);

    // Manejar el envío del formulario para actualizar el proyecto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProject(id, { nombre, descripcion, fechaInicio, fechaFin }, token);
            navigate('/proyectos'); // Redirige a la lista de proyectos después de actualizar
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
        }
    };

    // Función para cancelar la edición y volver a la lista de proyectos
    const handleCancel = () => {
        navigate('/proyectos');
    };

    return (
        <div>
            <h2>Editar Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Proyecto:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Fin:</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Guardar Actualización</button>
                <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarProyecto;
