// src/components/proyecto/RegistroProyecto.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../controller/apiProyecto';

const RegistroProyecto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada a la función createProject en apiProyecto.js
            await createProject(
                { nombre, descripcion, fechaInicio, fechaFin },
                token
            );
            // Redirigir a la lista de proyectos después de crear el proyecto exitosamente
            navigate('/proyectos');
        } catch (error) {
            console.error("Error al crear el proyecto:", error);
        }
    };

    // Función para cancelar y volver a la lista de proyectos
    const handleCancel = () => {
        navigate('/proyectos');
    };

    return (
        <div>
            <h2>Registrar Nuevo Proyecto</h2>
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
                <button type="submit">Crear Proyecto</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default RegistroProyecto;
