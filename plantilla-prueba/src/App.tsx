import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import CuentasList from './pages/cuentasList';
import AsientosConsulta from './pages/asientosConsulta';
import RegistarAsiento from './pages/registrarAsiento';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navBar';

function App() {
  return (
    <Router>
    <Navbar />
    <div className="container mt-4">
      <Routes>
        <Route path="/cuentas" element={<CuentasList />} />
        <Route path="/asientos-consulta" element={<AsientosConsulta />} />
        <Route path="/registrar-asiento" element={<RegistarAsiento />} />
        <Route path="/" element={<CuentasList />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
