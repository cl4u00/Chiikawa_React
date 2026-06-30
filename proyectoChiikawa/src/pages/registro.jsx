import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Registro() {
  const { t } = useTranslation();
  const [vistaActiva, setVistaActiva] = useState('login');
  const location = useLocation();
  const navigate = useNavigate();

  // Este efecto revisa si el usuario hizo clic en "¡Escríbenos aquí!" desde el footer


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('view') === 'contacto') {
      setVistaActiva('contacto');
    }
  }, [location]);

  // Funciones para cambiar entre formularios
  const mostrarRegistro = (e) => {
    e.preventDefault();
    setVistaActiva('registro');
  };

  const mostrarLogin = (e) => {
    e.preventDefault();
    setVistaActiva('login');
  };

  // Simulación de validación e inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    const correo = document.getElementById('loginCorreo').value;
    
    // Extraemos la parte antes del @ del correo para usarla como nombre de usuario
    const nombreUsuario = correo.split('@')[0];
    localStorage.setItem("usuarioLogueado", nombreUsuario);
    navigate('/'); // Redirecciona a la página principal
  };

  // Simulación de creación de cuenta
  const handleRegistro = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    
    localStorage.setItem("usuarioLogueado", nombre);
    navigate('/'); // Redirecciona a la página principal
  };

  // Simulación de envío de contacto
  const handleContacto = (e) => {
    e.preventDefault();
    const mensajeP = document.getElementById('mensajeContacto');
    mensajeP.innerText = "¡Mensaje enviado con éxito!";
    mensajeP.style.color = "green";
    
    // Regresamos al inicio después de 2 segundos
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="pagina-registro">
      <img src="/registro/images/chikawa_hachiware.gif" alt="Chiikawas jugando animado" className="chiikawa-fondo" />
      <img src="/registro/images/usagi.gif" alt="Usagi" className="usagi-derecha" />

      <div className="container">
        <Link to="/" className="btn-volver-atras" title="Volver a la página principal">
          ← Volver
        </Link>

        {vistaActiva === 'login' && (
          <form id="loginForm" onSubmit={handleLogin}>
            <h3>{t('auth.login')}</h3>
            {/* ... inputs ... */}
            <button type="submit">Ingresar</button>
            <p>¿No tienes cuenta? <a href="#" onClick={mostrarRegistro}>Regístrate aquí</a></p>
          </form>
        )}

        {/* Formulario de Registro */}
{/* Formulario de Registro */}
        {vistaActiva === 'registro' && (
          <form id="registroForm" onSubmit={handleRegistro}>
            <h3>{t('auth.registro_usuario')}</h3>
            <input type="text" id="nombre" placeholder={t('auth.nombre_usuario')} required />
            <input type="email" id="correo" placeholder={t('auth.correo')} required />
            <input type="password" id="password" placeholder={t('auth.password_min')} required />
            <input type="password" id="confirmPassword" placeholder={t('auth.confirmar_password')} required />
            <button type="submit">{t('auth.crear_cuenta')}</button>
            <p id="mensaje" className="feedback"></p>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>
              {t('auth.ya_tienes_cuenta')}{' '}
              <a href="#" onClick={mostrarLogin} style={{ color: '#61A3C9', fontWeight: 'bold' }}>
                {t('auth.inicia_sesion')}
              </a>
            </p>
          </form>
        )}

        {/* Formulario de Contacto */}
        {vistaActiva === 'contacto' && (
          <form id="contactoForm" onSubmit={handleContacto}>
            <h3>{t('auth.contacto')}</h3>
            <input type="text" placeholder={t('auth.placeholder_nombre')} required />
            <input type="email" placeholder={t('auth.placeholder_correo')} required />
            <textarea placeholder={t('auth.placeholder_mensaje')} rows="4" required></textarea>
            <button type="submit">{t('auth.enviar_mensaje')}</button>
            <p id="mensajeContacto" className="feedback"></p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registro;