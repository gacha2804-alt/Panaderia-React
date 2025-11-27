import React, { useState } from 'react';
import { register } from '../services/auth.service.js'; 

const Registro = () => {
 
  const [form, setForm] = useState({ nombre: '', email: '', contrasena: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
    
      const response = await register(form.nombre, form.email, form.contrasena);
      setMensaje(` ${response.data.message || 'Registro exitoso. ¡Verifica tu correo!'}`);
      setForm({ nombre: '', email: '', contrasena: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al registrar. Verifica la conexión.';
      setMensaje(` Error: ${errorMsg}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Crear Cuenta</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
  
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={form.email}
        onChange={handleChange}
        required
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
        style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
      />

      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#5fe5e7ff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Registrarse
      </button>
      <p style={{ color: mensaje.includes('Error') ? 'red' : 'green', marginTop: '10px' }}>{mensaje}</p>
    </form>
  );
};

export default Registro;
