import React from 'react';
//import './Sidebar.css';
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
          <FaUser /> <span>Pacientes</span>
        </li>
        <li onClick={() => onNavigate('citas')}>
          <FaCalendarAlt /> <span>Citas</span>
        </li>
        <li onClick={() => onNavigate('logout')}>
          <FaSignOutAlt /> <span>Cerrar sesión</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;