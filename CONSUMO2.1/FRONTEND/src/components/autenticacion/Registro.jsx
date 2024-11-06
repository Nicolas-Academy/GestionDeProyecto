// src/components/autenticacion/Registro.jsx
import React, { useState } from 'react';
import { registerUser } from '../../controller/apiautenticacion';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llama a la función registerUser para guardar los datos del nuevo usuario en la base de datos
            await registerUser({ nombre, email, password });
            // Redirige al usuario a la página de login después de registrarse exitosamente
            navigate('/'); // Asegúrate de que "/" sea la ruta de login
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Registro;
