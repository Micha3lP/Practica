import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'; // Asegúrate de ajustar la ruta si es necesario

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
          {' '}
          Mi App Contable
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cuentas">Cuentas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asientos-consulta">Consulta de Asientos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrar-asiento">Registrar Asiento</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
