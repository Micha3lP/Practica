import axios from 'axios';
import { CuentasContable, Asiento, Departamento, Movimiento } from '../models/models';

const baseUrlCuentas = "https://localhost:7202/api/CuentasContables";
const baseUrlAsientos = "https://localhost:7202/api/Asientos";
const baseUrlDepartamentos = "https://localhost:7202/api/Departamentos";
const baseUrlMovimientos = "https://localhost:7202/api/Movimientos";

// Servicios para CuentasContables
const obtenerCuentas = async (): Promise<CuentasContable[]> => {
  const response = await axios.get<CuentasContable[]>(baseUrlCuentas);
  return response.data;
};

const obtenerCuentaId = async (id: number): Promise<CuentasContable> => {
  const response = await axios.get<CuentasContable>(`${baseUrlCuentas}/${id}`);
  return response.data;
};

const agregarCuenta = async (cuenta: CuentasContable): Promise<void> => {
  await axios.post(baseUrlCuentas, cuenta);
};

const editarCuenta = async (id: number, cuenta: CuentasContable): Promise<void> => {
  await axios.put(`${baseUrlCuentas}/${id}`, cuenta);
};

const eliminarCuenta = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrlCuentas}/${id}`);
};

// Servicios para Asiento
const obtenerAsientos = async (): Promise<Asiento[]> => {
  const response = await axios.get<Asiento[]>(baseUrlAsientos);
  return response.data;
};

const obtenerAsientoId = async (id: number): Promise<Asiento> => {
  const response = await axios.get<Asiento>(`${baseUrlAsientos}/${id}`);
  return response.data;
};

const agregarAsiento = async (asiento: Asiento): Promise<Asiento> => {
  return await axios.post(baseUrlAsientos, asiento);
};

const editarAsiento = async (id: number, asiento: Asiento): Promise<void> => {
  await axios.put(`${baseUrlAsientos}/${id}`, asiento);
};

const eliminarAsiento = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrlAsientos}/${id}`);
};

// Servicios para Departamento
const obtenerDepartamentos = async (): Promise<Departamento[]> => {
  const response = await axios.get<Departamento[]>(baseUrlDepartamentos);
  return response.data;
};

const obtenerDepartamentoId = async (id: number): Promise<Departamento> => {
  const response = await axios.get<Departamento>(`${baseUrlDepartamentos}/${id}`);
  return response.data;
};

const agregarDepartamento = async (departamento: Departamento): Promise<void> => {
  await axios.post(baseUrlDepartamentos, departamento);
};

const editarDepartamento = async (id: number, departamento: Departamento): Promise<void> => {
  await axios.put(`${baseUrlDepartamentos}/${id}`, departamento);
};

const eliminarDepartamento = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrlDepartamentos}/${id}`);
};

// Servicios para Movimiento
const obtenerMovimientos = async (): Promise<Movimiento[]> => {
  const response = await axios.get<Movimiento[]>(baseUrlMovimientos);
  return response.data;
};

const obtenerMovimientoId = async (id: number): Promise<Movimiento> => {
  const response = await axios.get<Movimiento>(`${baseUrlMovimientos}/${id}`);
  return response.data;
};

const agregarMovimiento = async (movimiento: Movimiento): Promise<void> => {
  await axios.post(baseUrlMovimientos, movimiento);
};

const editarMovimiento = async (id: number, movimiento: Movimiento): Promise<void> => {
  await axios.put(`${baseUrlMovimientos}/${id}`, movimiento);
};

const eliminarMovimiento = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrlMovimientos}/${id}`);
};

const bancoService = {
  // Cuentas Contables
  obtenerCuentas,
  obtenerCuentaId,
  agregarCuenta,
  editarCuenta,
  eliminarCuenta,

  // Asiento
  obtenerAsientos,
  obtenerAsientoId,
  agregarAsiento,
  editarAsiento,
  eliminarAsiento,

  // Departamento
  obtenerDepartamentos,
  obtenerDepartamentoId,
  agregarDepartamento,
  editarDepartamento,
  eliminarDepartamento,

  // Movimiento
  obtenerMovimientos,
  obtenerMovimientoId,
  agregarMovimiento,
  editarMovimiento,
  eliminarMovimiento,
};

export default bancoService;
