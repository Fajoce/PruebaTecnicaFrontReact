import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Paciente = () => {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const pacienteId = localStorage.getItem('pacienteId'); // Asegúrate que el ID esté guardado así
        if (!pacienteId) {
          throw new Error('ID del paciente no encontrado en localStorage');
        }

        const response = await axios.get(`https://localhost:7292/api/Pacientes/${pacienteId}`);
        setPaciente(response.data);
      } catch (err) {
        setError(err.message || 'Error al cargar el paciente');
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, []);

  if (loading) return <p>Cargando datos del paciente...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container'>
      <h2>Datos del Paciente</h2>
      <p><strong>ID:</strong> {paciente.id}</p>
      <p><strong>Nombres:</strong> {paciente.nombres}</p>
      <p><strong>Apellidos:</strong> {paciente.apellidos}</p>
      <p><strong>Documento:</strong> {paciente.documento}</p>
      <p><strong>Fecha de Nacimiento:</strong> {new Date(paciente.fechaNacimiento).toLocaleDateString()}</p>
      <p><strong>Teléfono:</strong> {paciente.telefono}</p>
      <p><strong>Email:</strong> {paciente.email}</p>
    </div>
  );
};

export default Paciente;