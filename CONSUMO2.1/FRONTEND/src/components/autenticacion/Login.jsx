// src/components/autenticacion/Login.jsx
import React, { useState } from 'react';
import { loginUser } from '../../controller/apiautenticacion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginUser({ email, password });
            localStorage.setItem('token', token);
            navigate('/proyectos'); // Redirige a la página de proyectos
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Iniciar</button>
            </form>
            <button onClick={handleRegisterRedirect}>Registrarse</button>
        </div>
    );
};

export default Login;
