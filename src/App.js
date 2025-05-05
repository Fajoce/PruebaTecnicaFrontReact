import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import CitasDisponibles from './Components/CitasDisponibles';
import axios from 'axios';
import MenuLateral from './Components/MenuLateral';
import MisCitas from './Components/MisCitas';
import Inicio from './Components/Inicio';
import Pacientes from './Components/Pacientes'
import { Routes, Route } from 'react-router-dom';
import Registro from './Components/Registro';

const App = () => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
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
        return <Inicio/>;
      case 'citas':
        return <CitasDisponibles />;
      case 'pacientes':
        return <Pacientes />; // Puedes crear un componente aquí
        case 'miscitas':
      return <MisCitas />;
      case 'logout':
        return <p></p>;
      default:
        return <h2>Sección no encontrada</h2>;
    }
  };
  // 👇 SOLO mostrar rutas Login / Registro si NO hay token
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    );
  }

  

  return (
    <div>
          <div>
      <marquee><h5>Ud está en el sistema como: {nombre} - Id: {pacienteId}</h5></marquee>
      {renderSection()}
      <MenuLateral onNavigate={handleNavigation} />
    </div>
    </div>
  );

};

export default App;