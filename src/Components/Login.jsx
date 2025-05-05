import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.Module.css'
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [documento, setDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7292/api/Pacientes/autenticar', {
        documento,
        fechaNacimiento,
      });
      const { token, pacienteId, nombre } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('pacienteId', pacienteId);
      localStorage.setItem('nombre', nombre);
      setToken(token);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className='container'>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Documento:</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <button className='buttom' type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
      <hr />
      <p>¿No tienes cuenta? <button onClick={() => navigate('/registro')} className="link-button">Crear cuenta</button></p>
    </div>
  );
};

export default Login;