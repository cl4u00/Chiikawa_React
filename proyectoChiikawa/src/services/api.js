import axios from 'axios';

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Reemplaza con la URL real de tu API Rest
  headers: {
    'Content-Type': 'application/json'
  }
});

// Consumir API para guardar datos
export const guardarDatos = async (endpoint, datos) => {
  try {
    const response = await apiClient.post(endpoint, datos);
    return response.data;
  } catch (error) {
    console.error('Error al guardar datos:', error);
    throw error;
  }
};

export default apiClient;