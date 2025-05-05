import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import CitasDisponibles from './Components/CitasDisponibles';
import axios from 'axios';
import MenuLateral from './Components/MenuLateral';
import MisCitas from './Components/MisCitas';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const pacienteId = localStorage.getItem('pacienteId');
  const nombre = localStorage.getItem('nombre');
  const [currentSection, setCurrentSection] = useState('inicio'); // Sección actual

  useEffect(() => {
    if (token) {
      // Configura el encabezado Authorization para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

    const handleNavigation = (section) => {
      if (section === 'logout') {
        // Cerrar sesión
       // eslint-disable-next-line no-restricted-globals
       let response = confirm('¿Realmenet quieres salir')
       if (response){
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('pacienteId');
        localStorage.removeItem('nombre');
      }
      else{
        alert('Ok, gracias por continuar en el sistema')
      }
    }
      else {
        setCurrentSection(section);
      }
    };
 
  const renderSection = () => {
    switch (currentSection) {
      case 'inicio':
        return <h2>Bienvenido, {nombre}</h2>;
      case 'citas':
        return <CitasDisponibles />;
      case 'pacientes':
        return <p>Sección de pacientes (por implementar)</p>; // Puedes crear un componente aquí
        case 'miscitas':
      return <MisCitas />;
      case 'logout':
        return <p></p>;
      default:
        return <h2>Sección no encontrada</h2>;
    }
  };

  

  return (
    <div>
      {token ? (
        
        <><h4>Ud esta en el sistema como: {nombre} - Id: {pacienteId} </h4><div>
          {renderSection()}
          
          <MenuLateral onNavigate={handleNavigation} />
        </div></>
      ) : (
        <Login setToken={setToken} />
       
      )}
    
      
    </div>
  );
};

export default App;