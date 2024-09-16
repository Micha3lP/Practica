import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const NavigationBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            Nombre de la Página
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <Button variant="outline-primary" onClick={handleLoginClick}>
                  Login
                </Button>
              </Nav.Item>
              <Nav.Item className="ms-2">
                <Button variant="outline-secondary" onClick={handleRegisterClick}>
                  Registro
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal para Login */}
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleCloseLogin} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;
