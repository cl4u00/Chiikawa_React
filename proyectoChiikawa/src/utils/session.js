// Guardar sesión en JSON
export const iniciarSesion = (usuario) => {
  // El parámetro 'usuario' debe ser un JSON. Ej: { id: 1, nombre: "Test", rol: "admin" }
  localStorage.setItem('sesion_chiikawa', JSON.stringify(usuario));
};

// Obtener la sesión actual
export const obtenerSesion = () => {
  const sesion = localStorage.getItem('sesion_chiikawa');
  return sesion ? JSON.parse(sesion) : null;
};

// Destruir la sesión
export const cerrarSesion = () => {
  localStorage.removeItem('sesion_chiikawa');
};

// Validación de Super Usuario o Admin
export const esAdmin = () => {
  const sesion = obtenerSesion();
  return sesion && (sesion.rol === 'admin' || sesion.rol === 'superusuario');
};