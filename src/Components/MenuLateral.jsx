import React from 'react';
import '../css/SideBar.css';
import { FaHome, FaUser, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

const MenuLateral = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Clínica</h2>
      <ul className="sidebar-menu">
        <li onClick={() => onNavigate('inicio')}>
          <FaHome /> <span>Inicio</span>
        </li>
        <li onClick={() => onNavigate('pacientes')}>
          <FaUser /> <span>Ver Mis Datos</span>
        </li>
        <li onClick={() => onNavigate('citas')}>
          <FaUser /> <span>Citas Disponibles</span>
        </li>
        <li onClick={() => onNavigate('miscitas')}>
          <FaCalendarAlt /> <span>Mis Citas Previas</span>
        </li>
        <li onClick={() => onNavigate('logout')}>
          <FaSignOutAlt /> <span>Cerrar sesión</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;