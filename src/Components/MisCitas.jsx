import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MisCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const pacienteId = localStorage.getItem('pacienteId');

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get(`https://localhost:7292/api/Citas/MisCitas/${pacienteId}`);
        setCitas(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [pacienteId]);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div className='container'>
      <h2>Mis Citas</h2>
      {citas.length === 0 ? (
        <p>No tienes citas registradas.</p>
      ) : (
        <ul>
          {citas.map((cita) => (
            <li key={cita.id}>
              <strong>Fecha:</strong> {new Date(cita.fechahora).toLocaleString()}<br />
              <strong>Especialidad:</strong> {cita.especialidad}<br />
              <strong>Médico:</strong> {cita.nombremedico}<br />
              <strong>Patologia:</strong> {cita.patologia}<br />
              <strong>Tratamiento:</strong> {cita.tratamiento}<br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisCitas;