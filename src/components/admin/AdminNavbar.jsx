import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { logout } from "../../services/auth.service";

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Panel de Administrador</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/admin/usuarios">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/admin/pedidos">Pedidos</Nav.Link>
            <Nav.Link as={Link} to="/admin/perfil">Perfil</Nav.Link>
          </Nav>

          <Button
            variant="outline-light"
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            Cerrar Sesión
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
