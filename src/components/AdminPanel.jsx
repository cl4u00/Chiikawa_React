import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { buscarRecetaExterna } from '../services/recetasApi';
import './AdminPanel.css'; // Aquí se conecta la magia de Usagi ✨

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
    <>
      {/* FONDO OSCURO DETRÁS DEL PANEL */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(125, 90, 80, 0.4)', /* Tono marrón suave transparente */
        zIndex: 999998,
        backdropFilter: 'blur(4px)'
      }} onClick={onClose}></div>
      
      {/* PANEL PRINCIPAL (Usa la clase admin-panel-container + posición modal) */}
      <div className="admin-panel-container" style={{ 
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        zIndex: 999999
      }}>
        
        {/* NOTIFICACIÓN TOAST */}
        {mostrarNotificacion && (
          <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: tipoNotificacion === 'éxito' ? '#FF9F1C' : '#FF7A8A', /* Colores Usagi */
            color: 'white',
            padding: '15px 25px',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 1000000
          }}>
            {notificacion}
          </div>
        )}
        
        {/* ENCABEZADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2>🛠️ Panel de Control</h2>
          <button onClick={onClose} className="btn-cerrar">
            ✕ Cerrar
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', marginBottom: '30px' }}>
          
          {/* FORMULARIO MANUAL */}
          <form onSubmit={agregarManual} className="admin-card" style={{ flex: 1, minWidth: '280px' }}>
            <h3>📝 Subir Receta Manual</h3>
            <input 
              type="text" 
              placeholder="Título de la receta" 
              value={nuevaReceta.titulo} 
              onChange={(e) => setNuevaReceta({...nuevaReceta, titulo: e.target.value})} 
              required 
            />
            <textarea 
              placeholder="Descripción e instrucciones" 
              value={nuevaReceta.descripcion} 
              onChange={(e) => setNuevaReceta({...nuevaReceta, descripcion: e.target.value})} 
              required 
              rows="3"
            />
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
              📸 Selecciona una imagen:
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImagen} 
                required 
                style={{ marginTop: '8px', cursor: 'pointer', width: '100%' }}
              />
            </label>
            <button type="submit" className="btn-guardar">
              ✓ Guardar Receta
            </button>
          </form>

          {/* BÚSQUEDA EN API */}
          <div className="admin-card" style={{ flex: 1, minWidth: '280px' }}>
            <h3>🔍 Buscar en TheMealDB</h3>
            <form onSubmit={buscarAPI} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="Ej: Chicken, Pasta..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
                required 
                style={{ marginBottom: '0' }}
              />
              <button type="submit" className="btn-buscar" style={{ width: 'auto', marginTop: '0' }}>
                Buscar
              </button>
            </form>
            
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
              {resultadosAPI.map(meal => (
                <li key={meal.idMeal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px dashed #FFE499', padding: '10px 0' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{meal.strMeal}</span>
                  <button 
                    onClick={() => agregarDesdeAPI(meal)} 
                    className="btn-guardar"
                    style={{ width: 'auto', padding: '6px 12px', fontSize: '13px', marginTop: '0' }}
                  >
                    + Añadir
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RECETAS GUARDADAS */}
        <div className="admin-card">
          <h3>💾 Recetas Guardadas</h3>
          <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
            {recetas.length === 0 ? (
              <p style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Aún no hay recetas guardadas</p>
            ) : (
              recetas.map(r => (
                <div key={r.id} style={{ border: '3px solid #FFE499', padding: '12px', width: '140px', minWidth: '140px', textAlign: 'center', background: '#FFFEF4', borderRadius: '20px' }}>
                  <img src={r.imagen} alt={r.titulo} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '12px', marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '13px', margin: '8px 0', fontWeight: 'bold' }}>{r.titulo}</h4>
                  <button 
                    onClick={() => eliminarReceta(r.id)} 
                    className="btn-cerrar"
                    style={{ width: '100%', padding: '6px', fontSize: '13px', float: 'none' }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default AdminPanel;