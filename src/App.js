import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import CitasDisponibles from './Components/CitasDisponibles';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const pacienteId = localStorage.getItem('pacienteId');
  const nombre = localStorage.getItem('nombre');

  useEffect(() => {
    if (token) {
      // Configura el encabezado Authorization para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <div>
      {token ? (
        
        <><h4>Ud esta en el sistema como: {nombre} - Id: {pacienteId} </h4><div>
          <CitasDisponibles></CitasDisponibles>
        </div></>
      ) : (
        <Login setToken={setToken} />
       
      )}
    
      
    </div>
  );
};

export default App;