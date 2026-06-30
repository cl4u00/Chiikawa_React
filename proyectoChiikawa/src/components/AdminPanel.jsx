import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. IMPORTA CREATEPORTAL
import { buscarRecetaExterna } from '../services/recetasApi';
import './AdminPanel.css';

// AÑADIMOS onClose AQUÍ 👇
const AdminPanel = ({ recetas, setRecetas, onClose }) => {
  const [nuevaReceta, setNuevaReceta] = useState({ titulo: '', descripcion: '', imagen: '' });
  const [busqueda, setBusqueda] = useState('');
  const [resultadosAPI, setResultadosAPI] = useState([]);
  const [notificacion, setNotificacion] = useState('');
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [tipoNotificacion, setTipoNotificacion] = useState('éxito');

  useEffect(() => {
    localStorage.setItem('chiikawa_recetas', JSON.stringify(recetas));
  }, [recetas]);

  // Función para mostrar notificaciones
  const mostrarToast = (mensaje, tipo = 'éxito') => {
    setNotificacion(mensaje);
    setTipoNotificacion(tipo);
    setMostrarNotificacion(true);
    setTimeout(() => setMostrarNotificacion(false), 3000);
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setNuevaReceta({ ...nuevaReceta, imagen: reader.result });
    if (file) reader.readAsDataURL(file);
  };

  const agregarManual = (e) => {
    e.preventDefault();
    const receta = { ...nuevaReceta, id: Date.now(), tipo: 'manual' };
    setRecetas([...recetas, receta]);
    setNuevaReceta({ titulo: '', descripcion: '', imagen: '' });
    mostrarToast("✅ Receta agregada con éxito");
  };

  const buscarAPI = async (e) => {
    e.preventDefault();
    const resultados = await buscarRecetaExterna(busqueda);
    setResultadosAPI(resultados || []);
    
    if (!resultados || resultados.length === 0) {
      mostrarToast("❌ No se encontró la receta", 'error');
    }
  };

  const agregarDesdeAPI = (meal) => {
    const receta = {
      id: meal.idMeal,
      titulo: meal.strMeal,
      descripcion: meal.strInstructions.substring(0, 150) + '...',
      imagen: meal.strMealThumb,
      tipo: 'api'
    };
    setRecetas([...recetas, receta]);
    mostrarToast("✅ Receta de API agregada");
  };

  const eliminarReceta = (id) => {
    setRecetas(recetas.filter(r => r.id !== id));
  };

  return createPortal(
    <div style={{ 
      position: 'fixed', 
      top: '50px', 
      left: '10%', 
      width: '80%', 
      height: '80%', 
      background: 'white', 
      zIndex: 999999, 
      border: '5px solid #ff69b4', 
      padding: '20px',
      overflowY: 'auto' 
    }}>
      
      {/* NOTIFICACIÓN TOAST */}
      {mostrarNotificacion && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: tipoNotificacion === 'éxito' ? '#28a745' : '#dc3545',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontSize: '16px',
          fontWeight: 'bold',
          animation: 'slideIn 0.3s ease-out, slideOut 0.3s ease-out 2.7s forwards',
          zIndex: 1000000
        }}>
          {notificacion}
        </div>
      )}
      
      {/* BOTÓN PARA CERRAR EL PANEL 👇 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🛠️ Panel de Super Usuario</h2>
        <button onClick={onClose} style={{ background: 'red', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>X Cerrar</button>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
        <form onSubmit={agregarManual} style={{ flex: 1, minWidth: '300px' }}>
          <h3>Subir Receta Manual</h3>
          <input type="text" placeholder="Título" value={nuevaReceta.titulo} onChange={(e) => setNuevaReceta({...nuevaReceta, titulo: e.target.value})} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }}/>
          <textarea placeholder="Descripción / Instrucciones" value={nuevaReceta.descripcion} onChange={(e) => setNuevaReceta({...nuevaReceta, descripcion: e.target.value})} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }} rows="3"/>
          <input type="file" accept="image/*" onChange={handleImagen} required style={{ marginBottom: '10px' }}/>
          <button type="submit" style={{ background: '#4980f8', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Guardar Receta</button>
        </form>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3>Buscar en TheMealDB (API)</h3>
          <form onSubmit={buscarAPI} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="text" placeholder="Ej: Chicken, Pasta..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} required style={{ flex: 1, padding: '8px' }}/>
            <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Buscar</button>
          </form>
          <ul style={{ listStyle: 'none', padding: 0, maxHeight: '150px', overflowY: 'auto' }}>
            {resultadosAPI.map(meal => (
              <li key={meal.idMeal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                <span>{meal.strMeal}</span>
                <button onClick={() => agregarDesdeAPI(meal)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Añadir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: '20px' }}>Recetas Guardadas</h3>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
        {recetas.map(r => (
          <div key={r.id} style={{ border: '1px solid #ccc', padding: '10px', width: '150px', textAlign: 'center', background: 'white', borderRadius: '10px' }}>
            <img src={r.imagen} alt={r.titulo} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
            <h4 style={{ fontSize: '14px', margin: '10px 0' }}>{r.titulo}</h4>
            <button onClick={() => eliminarReceta(r.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer', borderRadius: '3px', width: '100%' }}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default AdminPanel;