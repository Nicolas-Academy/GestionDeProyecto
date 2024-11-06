// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/autenticacion/Login';
import Registro from './components/autenticacion/Registro';
import Proyecto from './components/proyecto/Proyecto';
import RegistroProyecto from './components/proyecto/RegistroProyecto';
import EditarProyecto from './components/proyecto/EditarProyecto';
import EliminarProyecto from './components/proyecto/EliminarProyecto';
import Tareas from './components/tarea/Tareas';
import RegistrarTarea from './components/tarea/RegistroTarea';
import EditarTarea from './components/tarea/EditarTarea';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registro />} />
                <Route path="/proyectos" element={<Proyecto />} />
                <Route path="/proyectos/registro" element={<RegistroProyecto />} />
                <Route path="/proyectos/editar/:id" element={<EditarProyecto />} />
                <Route path="/proyectos/eliminar/:id" element={<EliminarProyecto />} />
                <Route path="/proyectos/:projectId/tareas" element={<Tareas />} />
                <Route path="/proyectos/:projectId/tareas/registro" element={<RegistrarTarea />} />
                <Route path="/proyectos/:projectId/tareas/editar/:tareaId" element={<EditarTarea />} />
            </Routes>
        </Router>
        );
    }

export default App;
