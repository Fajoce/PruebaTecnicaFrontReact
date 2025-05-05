import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registro = () => {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    documento: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
  });
  const navigate = useNavigate();

  const volverAlLogin = () => {
    navigate('/');
  };
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7292/api/Pacientes', form);
      setMensaje('Paciente registrado correctamente');
    } catch (error) {
      setMensaje('Error al registrar el paciente');
    }
  };

  return (
    <div className="container">
      <h2>Registro de Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombres" placeholder="Nombres" onChange={handleChange} required />
        <input type="text" name="apellidos" placeholder="Apellidos" onChange={handleChange} required />
        <input type="text" name="documento" placeholder="Documento" onChange={handleChange} required />
        <input type="date" name="fechaNacimiento" onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
        <button onClick={volverAlLogin}>Volver al Login</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Registro;