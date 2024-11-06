// src/components/tarea/EliminarTarea.jsx
import { deleteTask } from '../../controller/apiTarea';

const EliminarTarea = async (projectId, taskId, token) => {
    try {
        await deleteTask(projectId, taskId, token); // Llama a la API para eliminar la tarea
        return { success: true };
    } catch (error) {
        console.error("Error deleting task:", error);
        return { success: false, error: error.message };
    }
};

export default EliminarTarea;
