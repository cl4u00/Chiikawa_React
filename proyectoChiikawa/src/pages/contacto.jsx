import React, { useState } from 'react';
import './forms.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    numeroContacto: '',
    correo: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario de contacto recibido:', formData);
  };

  return (
    <div className="form-page-container">
      <h2 className="form-title">Formulario de Contacto</h2>
      <form onSubmit={handleSubmit} className="controlled-form">
        <div className="form-group">
          <label htmlFor="contact-nombre">Nombre Completo:</label>
          <input
            type="text"
            id="contact-nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contact-numero">Número de Contacto:</label>
          <input
            type="tel"
            id="contact-numero"
            name="numeroContacto"
            value={formData.numeroContacto}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contact-correo">Correo Electrónico:</label>
          <input
            type="email"
            id="contact-correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contact-mensaje">Mensaje o Sugerencia:</label>
          <textarea
            id="contact-mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="form-submit-btn">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default Contacto;