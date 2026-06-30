import React, { useState } from 'react';
import './forms.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de acceso enviados:', credentials);
    // Aquí se procesaría la autenticación en pasos futuros
  };

  return (
    <div className="form-page-container">
      <h2 className="form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="controlled-form">
        <div className="form-group">
          <label htmlFor="login-username">Nombre de Usuario:</label>
          <input
            type="text"
            id="login-username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="login-password">Contraseña:</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="form-submit-btn">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;