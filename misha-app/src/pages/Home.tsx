import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <h1>Bienvenido a la Página de Inicio</h1>
          <p>Has iniciado sesión exitosamente.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
