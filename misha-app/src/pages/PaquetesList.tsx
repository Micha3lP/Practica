import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import paqueteService, { Paquete } from '../services/paqueteService';

const ListaPaquetes: React.FC = () => {
  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [paqueteActual, setPaqueteActual] = useState<Paquete | null>(null);
  const [nuevoNombrePaquete, setNuevoNombrePaquete] = useState('');
  const [nuevaDescripcionPaquete, setNuevaDescripcionPaquete] = useState(''); // Para la descripción

  // Carga inicial de los paquetes desde la API
  const obtenerPaquetes = async () => {
    try {
      const data = await paqueteService.obtenerPaquetes();
      setPaquetes(data);
    } catch (error) {
      console.error('Error al obtener los paquetes:', error);
    }
  };

  useEffect(() => {
    obtenerPaquetes();
  }, []);


  const cerrarModal = () => setMostrarModal(false);
  const mostrarModalAgregar = () => setMostrarModal(true);

  const guardarPaquete = async () => {
    try {
      if (paqueteActual) {
        // Editar paquete
        await paqueteService.actualizarPaquete(paqueteActual.id, {
          nombre: nuevoNombrePaquete,
          descripcion: nuevaDescripcionPaquete,
        });
      } else {
        // Agregar nuevo paquete
        await paqueteService.crearPaquete({
          nombre: nuevoNombrePaquete,
          descripcion: nuevaDescripcionPaquete,
        });
      }
      // Vuelve a obtener los paquetes actualizados después de guardar
      await obtenerPaquetes();
      cerrarModal();
    } catch (error) {
      console.error('Error al guardar el paquete:', error);
    }
  };

  const eliminarPaquete = async (id: number) => {
    try {
      await paqueteService.eliminarPaquete(id);
      setPaquetes(paquetes.filter(pkg => pkg.id !== id));
    } catch (error) {
      console.error('Error al eliminar el paquete:', error);
    }
  };

  const editarPaquete = (pkg: Paquete) => {
    setPaqueteActual(pkg);
    setNuevoNombrePaquete(pkg.nombre);
    setNuevaDescripcionPaquete(pkg.descripcion); // Asegúrate de cargar la descripción existente
    mostrarModalAgregar();
  };

  const agregarPaquete = () => {
    setPaqueteActual(null);
    setNuevoNombrePaquete('');
    setNuevaDescripcionPaquete(''); // Limpia el campo de descripción al agregar uno nuevo
    mostrarModalAgregar();
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Paquetes</h1>
      <Button variant="primary" onClick={agregarPaquete} className="mb-3">
        Agregar Paquete
      </Button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paquetes.map(pkg => (
            <tr key={pkg.id}>
              <td>{pkg.id}</td>
              <td>{pkg.nombre}</td>
              <td>{pkg.descripcion}</td>
              <td>
                <Button variant="warning" onClick={() => editarPaquete(pkg)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => eliminarPaquete(pkg.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar */}
      <Modal show={mostrarModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{paqueteActual ? 'Editar Paquete' : 'Agregar Paquete'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombrePaquete">
              <Form.Label>Nombre del Paquete</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce el nombre del paquete"
                value={nuevoNombrePaquete}
                onChange={(e) => setNuevoNombrePaquete(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="descripcionPaquete">
              <Form.Label>Descripción del Paquete</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce la descripción del paquete"
                value={nuevaDescripcionPaquete}
                onChange={(e) => setNuevaDescripcionPaquete(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarPaquete}>
            {paqueteActual ? 'Guardar Cambios' : 'Agregar Paquete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaPaquetes;
