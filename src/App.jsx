import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo/logo.png";

import Home from "./components/Home";
import Dashboard from "./components/dashboard";
import Productos from "./components/productos";
import MetodoDePago from "./components/MetodoDePago";
import Factura from "./components/factura";
import Pedidos from "./components/pedidos";
import Contacto from "./components/contacto";
import Promociones from "./components/promociones";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./components/ProtectedRoute";


import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProductos from "./components/admin/AdminProductos";
import AdminUsuarios from "./components/admin/AdminUsuarios";
import Perfil from "./components/admin/perfil/perfil";

import { Container, Navbar, Button } from "react-bootstrap";
import { logout, getCurrentUser } from "./services/auth.service";
import RoleSelector from "./components/RoleSelector";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) {
      setUser(saved);

      if (saved.role === "admin") {
        setShowRoleSelector(true);
      }
    }
  }, []);

  const handleLogout = () => {
    logout("app:logout");
    setUser(null);
    window.location.href = "/";
  };

  const handleRoleSelection = (role) => {
    setShowRoleSelector(false);

    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      {/* NAVBAR */}
      {!location.pathname.startsWith("/admin") && (
        <Navbar bg="light" expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <img src={logo} alt="Logo" className="navbar-logo" />
              <span className="navbar-brand-text">Panadería La Esperanza</span>
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {!user ? (
                <Button onClick={() => setShowAuth(true)}>Iniciar Sesión</Button>
              ) : (
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      {/* RUTAS */}
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Home handleShowLogin={() => setShowAuth(true)} />
          }
        />

        {/* RUTAS CLIENTE */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/MetodoDePago" element={<MetodoDePago />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/promociones" element={<Promociones />} />

        {/* RUTAS ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />

        {/* RUTA PERFIL - todos los roles */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} setUser={setUser} />

      <RoleSelector show={showRoleSelector} onSelect={handleRoleSelection} />
    </>
  );
}

export default App;
