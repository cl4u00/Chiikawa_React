import React, { useState, useEffect } from 'react'; // <-- ESTO ES LO QUE FALTABA
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Registro() {
  const { t } = useTranslation();
  const [vistaActiva, setVistaActiva] = useState('login');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('view') === 'contacto') {
      setVistaActiva('contacto');
    }
  }, [location]);

  const mostrarRegistro = (e) => { e.preventDefault(); setVistaActiva('registro'); };
  const mostrarLogin = (e) => { e.preventDefault(); setVistaActiva('login'); };

  const handleLogin = (e) => {
    e.preventDefault();
    const nombreUsuario = correo.split('@')[0];
    
    // Lógica de Super Usuario
    const rol = (correo === 'admin@chiikawa.com') ? 'admin' : 'usuario';
    const sesion = { nombre: nombreUsuario, rol: rol };
    
    localStorage.setItem("usuarioLogueado", JSON.stringify(sesion));
    navigate('/'); 
    window.location.reload();
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    const sesion = { nombre: nombre, rol: 'usuario' };
    localStorage.setItem("usuarioLogueado", JSON.stringify(sesion));
    navigate('/');
  };

  const handleContacto = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado!");
    navigate('/');
  };

  return (
    <div className="pagina-registro">
      <div className="container">
        <Link to="/" className="btn-volver-atras">← Volver</Link>

        {vistaActiva === 'login' && (
          <form id="loginForm" onSubmit={handleLogin}>
            <h3>{t('auth.login')}</h3>
            <input 
              type="email" 
              placeholder={t('auth.correo')} 
              required 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">{t('auth.login')}</button>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>
              ¿No tienes cuenta?{' '}
              <a href="#" onClick={mostrarRegistro} style={{ color: '#61A3C9', fontWeight: 'bold' }}>
                {t('auth.registro')}
              </a>
            </p>
          </form>
        )}

        {vistaActiva === 'registro' && (
          <form id="registroForm" onSubmit={handleRegistro}>
            <h3>{t('auth.registro')}</h3>
            <input 
              type="text" 
              placeholder={t('auth.nombre_usuario')} 
              required 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input type="email" placeholder={t('auth.correo')} required />
            <input type="password" placeholder={t('auth.password_min')} required />
            <button type="submit">{t('auth.crear_cuenta')}</button>
          </form>
        )}

        {vistaActiva === 'contacto' && (
          <form id="contactoForm" onSubmit={handleContacto}>
            <h3>{t('auth.contacto')}</h3>
            <input type="text" placeholder={t('auth.placeholder_nombre')} required />
            <input type="email" placeholder={t('auth.placeholder_correo')} required />
            <textarea placeholder={t('auth.placeholder_mensaje')} rows="4" required></textarea>
            <button type="submit">{t('auth.enviar_mensaje')}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registro;