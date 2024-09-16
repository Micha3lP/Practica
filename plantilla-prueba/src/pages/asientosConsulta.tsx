import { useState, useEffect } from 'react';
import bancoService from '../services/bancoService';
import { Asiento } from '../models/models';
import { Departamento } from '../models/models';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table } from 'react-bootstrap';

const AsientosConsulta = () => {
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asientosData = await bancoService.obtenerAsientos();
        const departamentosData = await bancoService.obtenerDepartamentos();
        setAsientos(asientosData);
        setDepartamentos(departamentosData);
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando asientos...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      {/* Formulario visual para filtros (no funcional) */}
      <Form className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group controlId="formDepartamento">
              <Form.Label>Departamento:</Form.Label>
              <Form.Control as="select">
                <option value="">Seleccione</option>
                {departamentos.map((dpto) => (
                  <option key={dpto.dptoId} value={dpto.dptoId}>
                    {dpto.descDpto}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control type="text" placeholder="Descripción del asiento" />
            </Form.Group>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <Button
              variant="magenta"
              style={{ backgroundColor: '#ff00ff', color: 'white' }}
            >
              Consultar
            </Button>
          </div>
        </div>
      </Form>

      {/* Tabla de consulta */}
      <Table striped bordered hover>
        <thead style={{ backgroundColor: '#ff00ff', color: 'white' }}>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Departamento</th>
            <th>Total Débito</th>
            <th>Total Crédito</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {asientos.map((asiento) => (
            <tr key={asiento.asientoId}>
              <td>{asiento.asientoId}</td>
              <td>{asiento.fecha}</td>
              <td>{asiento.descripcion || 'Sin descripción'}</td>
              <td>
                {departamentos.find((dpto) => dpto.dptoId === asiento.dptoId)?.descDpto || 'Sin departamento'}
              </td>
              <td>{/* Aquí va el cálculo o campo de Total Débito */}</td>
              <td>{/* Aquí va el cálculo o campo de Total Crédito */}</td>
              <td>
                <Button variant="info" size="sm">Ver Detalle</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AsientosConsulta;
