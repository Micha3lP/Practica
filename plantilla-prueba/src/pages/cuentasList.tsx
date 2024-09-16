import { useEffect, useState } from 'react';
import bancoService from '../services/bancoService';
import { CuentasContable } from '../models/models';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const CuentasList = () => {
  const [cuentas, setCuentas] = useState<CuentasContable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCuenta, setEditingCuenta] = useState<CuentasContable | null>(null);
  const [numCuenta, setNumCuenta] = useState<string>('');

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const data = await bancoService.obtenerCuentas();
        setCuentas(data);
      } catch (err) {
        setError('Error al cargar las cuentas');
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
  }, []);

  const handleShowModal = (cuenta: CuentasContable | null = null) => {
    if (cuenta) {
      setEditingCuenta(cuenta);
      setNumCuenta(cuenta.numCuenta || '');
    } else {
      setEditingCuenta(null);
      setNumCuenta('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCuenta(null);
    setNumCuenta('');
  };

  const handleGuardarCuenta = async () => {
    try {
      if (editingCuenta) {
        await bancoService.editarCuenta(editingCuenta.cuentaId, { ...editingCuenta, numCuenta });
      } else {
        await bancoService.agregarCuenta({ cuentaId: 0, numCuenta });
      }
      const data = await bancoService.obtenerCuentas();
      setCuentas(data);
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar la cuenta');
    }
  };

  const eliminarCuenta = async (cuentaId: number) => {
    try {
      await bancoService.eliminarCuenta(cuentaId);
      setCuentas(cuentas.filter(cuenta => cuenta.cuentaId !== cuentaId));
    } catch (err) {
      setError('Error al eliminar la cuenta');
    }
  };

  if (loading) {
    return <div>Cargando cuentas...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: 'white', backgroundColor: '#6f42c1', padding: '10px', borderRadius: '5px' }}>
        Listado de Cuentas Contables
      </h1>
      <Button variant="success" className="mb-3" onClick={() => handleShowModal(null)}>
        Agregar Cuenta
      </Button>
      <table className="table table-striped table-hover mt-4">
        <thead>
          <tr>
            <th>ID Cuenta</th>
            <th>Número de Cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuentas.map(cuenta => (
            <tr key={cuenta.cuentaId}>
              <td>{cuenta.cuentaId}</td>
              <td>{cuenta.numCuenta || 'Sin número asignado'}</td>
              <td>
                <button
                  className="btn btn-primary mx-1"
                  style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}
                  onClick={() => handleShowModal(cuenta)}
                >
                  Editar
                </button>
                <button className="btn btn-danger mx-1" onClick={() => eliminarCuenta(cuenta.cuentaId)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCuenta ? 'Editar Cuenta' : 'Agregar Cuenta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNumCuenta">
              <Form.Label>Número de Cuenta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de cuenta"
                value={numCuenta}
                onChange={(e) => setNumCuenta(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCuenta}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CuentasList;
