import { useState, useEffect } from 'react';
import bancoService from '../services/bancoService';
import { Asiento, Movimiento, Departamento, CuentasContable } from '../models/models';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AsientoForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Asiento>();
  const { register: registerMov, handleSubmit: handleSubmitMov, formState: { errors: errorsMov } } = useForm<Movimiento>();

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cuentas, setCuentas] = useState<CuentasContable[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Cargar departamentos y cuentas contables al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dptoData = await bancoService.obtenerDepartamentos();
        const cuentasData = await bancoService.obtenerCuentas();
        setDepartamentos(dptoData);
        setCuentas(cuentasData);
      } catch (err) {
        console.error('Error al cargar departamentos o cuentas');
      }
    };

    fetchData();
  }, []);

  // Manejo de modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleGuardarMovimiento = (data: Movimiento) => {
    setMovimientos([...movimientos, { ...data }]);
    handleCloseModal();
  };

  const handleGuardarAsiento = async (data: Asiento) => {
    const totalDebito = movimientos
      .filter(mov => mov.tipoMovimiento === 'Debito')
      .reduce((acc, mov) => acc + mov.valor, 0);
    const totalCredito = movimientos
      .filter(mov => mov.tipoMovimiento === 'Credito')
      .reduce((acc, mov) => acc + mov.valor, 0);

    if (totalDebito !== totalCredito) {
      alert('El asiento no está cuadrado. Revise los débitos y créditos.');
      return;
    }

    const fechaFormatted = new Date(data.fecha).toISOString().split('T')[0];

    try {
      const asientoGuardado = await bancoService.agregarAsiento({
        ...data,
        fecha: fechaFormatted
      });
      await Promise.all(
        movimientos.map(async (mov) => {
          await bancoService.agregarMovimiento({
            ...mov,
            asientoId: asientoGuardado.asientoId,
          });
        })
      );
      alert('Asiento guardado correctamente.');
    } catch (err) {
      console.error('Error al guardar el asiento y movimientos.');
    }
  };

  return (
    <div className="container mt-5">
      {/* Formulario principal */}
      <Form onSubmit={handleSubmit(handleGuardarAsiento)} noValidate className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                {...register('fecha', { required: 'La fecha es obligatoria' })}
                isInvalid={!!errors.fecha} // Asegurar que isInvalid esté aplicado correctamente
              />
              <Form.Control.Feedback type="invalid">
                {errors.fecha?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formDepartamento">
              <Form.Label>Departamento:</Form.Label>
              <Form.Control
                as="select"
                {...register('dptoId', { required: 'Seleccione un departamento' })}
                isInvalid={!!errors.dptoId} // Añadir isInvalid si hay error
              >
                <option value="">Seleccione</option>
                {departamentos.map((dpto) => (
                  <option key={dpto.dptoId} value={dpto.dptoId}>
                    {dpto.descDpto}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.dptoId?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                type="text"
                {...register('descripcion', { required: 'La descripción es obligatoria' })}
                isInvalid={!!errors.descripcion} // Asegurar que el feedback visual de error funcione
                placeholder="Descripción del asiento"
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        <Button variant="magenta" onClick={handleShowModal} style={{ backgroundColor: '#ff00ff', color: 'white' }}>
          Nuevo Movimiento
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead style={{ backgroundColor: '#ff00ff', color: 'white' }}>
          <tr>
            <th>Num. Cuenta</th>
            <th>Descripción</th>
            <th>Débito</th>
            <th>Crédito</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((mov, index) => (
            <tr key={index}>
              <td>{cuentas.find(cuenta => cuenta.cuentaId === mov.cuentaId)?.numCuenta || 'Sin cuenta'}</td>
              <td>{mov.descripcion}</td>
              <td>{mov.tipoMovimiento === 'Debito' ? mov.valor : ''}</td>
              <td>{mov.tipoMovimiento === 'Credito' ? mov.valor : ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        {movimientos.reduce((acc, mov) => acc + (mov.tipoMovimiento === 'Debito' ? mov.valor : -mov.valor), 0) === 0 ? (
          <p>Asiento cuadrado</p>
        ) : (
          <p>Asiento descuadrado</p>
        )}
      </div>

      <Button variant="magenta" type="submit" style={{ backgroundColor: '#ff00ff', color: 'white' }}>
        Guardar Asiento
      </Button>

      {/* Modal de nuevo movimiento */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitMov(handleGuardarMovimiento)} noValidate>
            <Form.Group controlId="formCuenta">
              <Form.Label>Cuenta:</Form.Label>
              <Form.Control
                as="select"
                {...registerMov('cuentaId', { required: 'Seleccione una cuenta' })}
                isInvalid={!!errorsMov.cuentaId} // Asegurar que isInvalid esté aplicado correctamente
              >
                <option value="">Seleccione</option>
                {cuentas.map((cuenta) => (
                  <option key={cuenta.cuentaId} value={cuenta.cuentaId}>
                    {cuenta.numCuenta}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errorsMov.cuentaId?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescripcionMov">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                type="text"
                {...registerMov('descripcion', { required: 'La descripción es obligatoria' })}
                isInvalid={!!errorsMov.descripcion}
                placeholder="Descripción del movimiento"
              />
              <Form.Control.Feedback type="invalid">
                {errorsMov.descripcion?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formValor">
              <Form.Label>Valor:</Form.Label>
              <Form.Control
                type="number"
                {...registerMov('valor', { required: 'El valor es obligatorio' })}
                isInvalid={!!errorsMov.valor} // Añadir isInvalid si hay error
              />
              <Form.Control.Feedback type="invalid">
                {errorsMov.valor?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTipoMovimiento">
              <Form.Label>Tipo Movimiento:</Form.Label>
              <Form.Control
                as="select"
                {...registerMov('tipoMovimiento', { required: 'Seleccione el tipo de movimiento' })}
                isInvalid={!!errorsMov.tipoMovimiento} // Asegurar que isInvalid esté aplicado
              >
                <option value="Debito">Débito</option>
                <option value="Credito">Crédito</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errorsMov.tipoMovimiento?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Movimiento
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AsientoForm;
