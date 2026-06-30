import axios from 'axios';

// Busca recetas externas usando TheMealDB API
export const buscarRecetaExterna = async (nombre) => {
  try {
    const respuesta = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nombre}`);
    return respuesta.data.meals; // Retorna un array de recetas o null
  } catch (error) {
    console.error("Error al buscar receta externa:", error);
    return null;
  }
};