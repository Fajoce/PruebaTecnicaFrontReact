import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const handleImprimir = () => {
  const tabla = document.getElementById('tablaCitas');
  const ventana = window.open('', '_blank', 'width=800,height=600');
  
  ventana.document.write(`
    <html>
      <head>
        <title>Impresión de Citas</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          h2 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h2>Listado de Citas Reservadas</h2>
        ${tabla.outerHTML}
      </body>
    </html>
  `);

  ventana.document.close();
  ventana.print();
};

const CitasDisponibles = () => {

  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const opcionesEspecialidades = [
    { value: 'Examen general', label: 'Examen general' },
    { value: 'Examen odontologico', label: 'Examen odontologico' }
  ];

  const handleEspecialidadChange = async (selectedOption) => {
    setEspecialidadSeleccionada(selectedOption);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://localhost:7292/api/Citas/disponibles', {
        params: { especialidad: selectedOption.value }
      });
      setCitas(response.data);
    } catch (error) {
      setError('Error al cargar las citas disponibles');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeleccionarCita = (cita) => {
    setCitaSeleccionada(cita);
  };

  const handleReservarCita = async () => {
    if (!citaSeleccionada) {
      alert('Por favor, seleccione una cita para reservar.');
      return;
    }

    const pacienteId = localStorage.getItem('pacienteId');
    const citaId = citas.map((cita) => (cita.id))
    if (!pacienteId) {
      alert('Por favor, inicie sesión para reservar una cita.');
      return;
    }

    try {
      
      await axios.post('https://localhost:7292/api/Citas/reservar', {        
        citaId : citaSeleccionada.id,
        pacienteId
      });
      alert('Cita reservada con éxito');
      alert(pacienteId, citaId)
    } catch (error) {
      alert(pacienteId, citaId)
      console.log('Cita: '+citaId, 'Paciente: '+pacienteId)
      alert('Error al reservar la cita');
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h2>Seleccionar Especialidad</h2>
      <Select
        options={opcionesEspecialidades}
        onChange={handleEspecialidadChange}
        placeholder="Seleccione una especialidad"
        value={especialidadSeleccionada}
      />
      {loading && <p>Cargando citas...</p>}
      {error && <p>{error}</p>}
      {citas.length > 0 && (
        <div>
          <h3>Citas Disponibles</h3>
          <table className='styles.table' id="tablaCitas">
            <thead>
              <tr>
                <th>Id</th>
                <th>Medico</th>
                <th>Especialidad</th>
                <th>Fecha y Hora</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.id}</td>
                  <td>{cita.nombremedico}</td>
                  <td>{cita.especialidad}</td>
                  <td>{new Date(cita.fechahora).toLocaleString()}</td>
                  <td>
                    <button
                      className='button'
                      onClick={() => handleSeleccionarCita(cita)}
                    >
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className='buttonReservar'
            onClick={handleReservarCita}
            disabled={!citaSeleccionada}
          >
            Reservar Cita
          </button>
          <button className="buttonReservar" onClick={handleImprimir}>
           Imprimir tabla
          </button>
        </div>
      )}
    </div>
  );
  };


export default CitasDisponibles;