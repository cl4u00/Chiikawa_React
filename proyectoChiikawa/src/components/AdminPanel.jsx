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
    <>
      {/* FONDO OSCURO DETRÁS DEL PANEL */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999998,
        backdropFilter: 'blur(4px)'
      }} onClick={onClose}></div>
      
      {/* PANEL PRINCIPAL */}
      <div style={{ 
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
        zIndex: 999999,
        border: '4px solid #ff69b4',
        borderRadius: '20px',
        padding: '30px',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(255, 105, 180, 0.3)'
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
        
        {/* ENCABEZADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '3px solid #ffb6c1' }}>
          <h2 style={{ fontSize: '28px', color: '#ff69b4', margin: 0 }}>🛠️ Panel Admin</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ff1493 100%)',
              color: 'white', 
              border: 'none', 
              padding: '12px 20px', 
              borderRadius: '10px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)',
              ':hover': { transform: 'scale(1.05)' }
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 16px rgba(255, 105, 180, 0.5)'}
            onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 12px rgba(255, 105, 180, 0.3)'}
          >
            ✕ Cerrar
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {/* FORMULARIO MANUAL */}
          <form onSubmit={agregarManual} style={{ flex: 1, minWidth: '280px', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#4980f8', marginTop: 0, fontSize: '18px' }}>📝 Subir Receta Manual</h3>
            <input 
              type="text" 
              placeholder="Título de la receta" 
              value={nuevaReceta.titulo} 
              onChange={(e) => setNuevaReceta({...nuevaReceta, titulo: e.target.value})} 
              required 
              style={{ width: '100%', marginBottom: '12px', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
            <textarea 
              placeholder="Descripción e instrucciones" 
              value={nuevaReceta.descripcion} 
              onChange={(e) => setNuevaReceta({...nuevaReceta, descripcion: e.target.value})} 
              required 
              style={{ width: '100%', marginBottom: '12px', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', resize: 'vertical', minHeight: '80px', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              rows="3"
            />
            <label style={{ display: 'block', marginBottom: '12px', color: '#666', fontWeight: '500' }}>
              📸 Selecciona una imagen:
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImagen} 
                required 
                style={{ marginTop: '8px', cursor: 'pointer' }}
              />
            </label>
            <button 
              type="submit" 
              style={{ background: 'linear-gradient(135deg, #4980f8 0%, #2563eb 100%)', color: 'white', padding: '12px', width: '100%', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              ✓ Guardar Receta
            </button>
          </form>

          {/* BÚSQUEDA EN API */}
          <div style={{ flex: 1, minWidth: '280px', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#4980f8', marginTop: 0, fontSize: '18px' }}>🔍 Buscar en TheMealDB</h3>
            <form onSubmit={buscarAPI} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="Ej: Chicken, Pasta..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
                required 
                style={{ flex: 1, padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', transition: 'border 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = '#ff69b4'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <button 
                type="submit" 
                style={{ padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s' }}
                onMouseEnter={(e) => e.target.style.background = '#228f3e'}
                onMouseLeave={(e) => e.target.style.background = '#28a745'}
              >
                Buscar
              </button>
            </form>
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto', borderTop: '2px solid #f0f0f0' }}>
              {resultadosAPI.map(meal => (
                <li key={meal.idMeal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', padding: '10px 0', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: '14px', color: '#333' }}>{meal.strMeal}</span>
                  <button 
                    onClick={() => agregarDesdeAPI(meal)} 
                    style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', transition: 'background 0.3s' }}
                    onMouseEnter={(e) => e.target.style.background = '#228f3e'}
                    onMouseLeave={(e) => e.target.style.background = '#28a745'}
                  >
                    + Añadir
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RECETAS GUARDADAS */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#ff69b4', marginTop: 0, fontSize: '18px' }}>💾 Recetas Guardadas</h3>
          <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
            {recetas.length === 0 ? (
              <p style={{ width: '100%', textAlign: 'center', color: '#999' }}>Aún no hay recetas guardadas</p>
            ) : (
              recetas.map(r => (
                <div key={r.id} style={{ border: '2px solid #ffb6c1', padding: '12px', width: '140px', minWidth: '140px', textAlign: 'center', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(255, 105, 180, 0.15)' }}>
                  <img src={r.imagen} alt={r.titulo} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '12px', margin: '8px 0', color: '#333', fontWeight: '600' }}>{r.titulo}</h4>
                  <button 
                    onClick={() => eliminarReceta(r.id)} 
                    style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px', cursor: 'pointer', borderRadius: '6px', width: '100%', fontSize: '12px', fontWeight: 'bold', transition: 'background 0.3s' }}
                    onMouseEnter={(e) => e.target.style.background = '#c82333'}
                    onMouseLeave={(e) => e.target.style.background = '#dc3545'}
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