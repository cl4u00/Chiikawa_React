import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Registro() {
  const { t } = useTranslation();
  const [vistaActiva, setVistaActiva] = useState('login');
  
  // Estados controlados para el formulario de Login
  const [correo, setCorreo] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  // Estados controlados para el formulario de Registro
  const [nombre, setNombre] = useState('');
  const [correoRegistro, setCorreoRegistro] = useState('');
  const [passwordRegistro, setPasswordRegistro] = useState('');

  // Estados controlados para el formulario de Contacto
  const [nombreContacto, setNombreContacto] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [correoContacto, setCorreoContacto] = useState('');
  const [mensajeContacto, setMensajeContacto] = useState('');

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

  // --- NUEVA FUNCIÓN DE VALIDACIÓN DE CORREO ---
  const validarCorreoPersonalizado = (email) => {
    const partes = email.split('@');
    
    // Si no tiene exactamente un arroba, es inválido
    if (partes.length !== 2) return false;
    
    const antesDelArroba = partes[0];
    const despuesDelArroba = partes[1];

    // Verifica que tenga al menos 4 caracteres antes y 2 después
    if (antesDelArroba.length < 4 || despuesDelArroba.length < 2) {
      return false;
    }
    
    return true;
  };
  // ---------------------------------------------

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar el correo usando la nueva regla
    if (!validarCorreoPersonalizado(correo)) {
      alert("Error: El correo debe tener al menos 4 caracteres antes del '@' y 2 caracteres después.");
      return;
    }

    const nombreUsuario = correo.split('@')[0];
    
    // Lógica de Super Usuario
    const rol = (correo === 'admin@chiikawa.com') ? 'admin' : 'usuario';
    const sesion = { nombre: nombreUsuario, rol: rol };
    
    localStorage.setItem("usuarioLogueado", JSON.stringify(sesion));
    navigate('/'); 
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    
    // Validación de seguridad para evitar registros vacíos
    if (nombre.trim() === '') {
      alert("El nombre de usuario no puede estar vacío.");
      return;
    }

    // Validar el correo usando la nueva regla
    if (!validarCorreoPersonalizado(correoRegistro)) {
      alert("Error: El correo debe tener al menos 4 caracteres antes del '@' y 2 caracteres después.");
      return;
    }

    const sesion = { nombre: nombre.trim(), rol: 'usuario' };
    localStorage.setItem("usuarioLogueado", JSON.stringify(sesion));
    navigate('/');
  };

  const handleContacto = (e) => {
    e.preventDefault();

    // Validar el correo usando la nueva regla
    if (!validarCorreoPersonalizado(correoContacto)) {
      alert("Error: El correo debe tener al menos 4 caracteres antes del '@' y 2 caracteres después.");
      return;
    }

    console.log("Datos de contacto listos para enviar:", { nombreContacto, numeroContacto, correoContacto, mensajeContacto });
    alert("¡Mensaje enviado correctamente!");
    navigate('/');
  };

  return (
    <div className="pagina-registro">
      <div className="container">
        <Link to="/" className="btn-volver-atras">← Volver</Link>

        {vistaActiva === 'login' && (
          <form id="loginForm" onSubmit={handleLogin}>
            <h3>{t('login')}</h3>
            <input 
              type="email" 
              placeholder={t('correo')} 
              required 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              required 
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            <button type="submit">{t('login')}</button>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>
              ¿No tienes cuenta?{' '}
              <a href="#" onClick={mostrarRegistro} style={{ color: '#61A3C9', fontWeight: 'bold' }}>
                {t('registro')}
              </a>
            </p>
          </form>
        )}

        {vistaActiva === 'registro' && (
          <form id="registroForm" onSubmit={handleRegistro}>
            <h3>{t('registro')}</h3>
            <input 
              type="text" 
              placeholder={t('nombre usuario')} 
              required 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input 
              type="email" 
              placeholder={t('correo')} 
              required 
              value={correoRegistro}
              onChange={(e) => setCorreoRegistro(e.target.value)}
            />
            <input 
              type="password" 
              placeholder={t('password')} 
              required 
              value={passwordRegistro}
              onChange={(e) => setPasswordRegistro(e.target.value)}
            />
            <button type="submit">{t('crear cuenta')}</button>
          </form>
        )}

        {vistaActiva === 'contacto' && (
          <form id="contactoForm" onSubmit={handleContacto}>
            <h3>{t('contacto')}</h3>
            <input 
              type="text" 
              placeholder={t('nombre completo')} 
              required 
              value={nombreContacto}
              onChange={(e) => setNombreContacto(e.target.value)}
            />
            <input 
              type="tel" 
              placeholder="Número de contacto" 
              required 
              value={numeroContacto}
              onChange={(e) => setNumeroContacto(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              required 
              value={correoContacto}
              onChange={(e) => setCorreoContacto(e.target.value)}
            />
            <textarea 
              placeholder={t('placeholder mensaje')} 
              rows="4" 
              required
              value={mensajeContacto}
              onChange={(e) => setMensajeContacto(e.target.value)}
            ></textarea>
            <button type="submit">{t('enviar mensaje')}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registro;