// src/components/LayoutDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/auth.service";
import "./dashboard.css";

const LayoutDashboard = ({ children, title }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleStorageChange = () => setUser(getCurrentUser());
    const handleAppLogout = () => setUser(null);

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("app:logout", handleAppLogout);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("app:logout", handleAppLogout);
    };
  }, []);
  {/* function cerrar el boton de cerrar sesion
  const handleLogout = () => {
    logout("app:logout");
    setUser(null);
    navigate("/");
  };
  */}
  

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <nav className="sidebar-menu">

          {/* CLIENTE */}
          {user?.role !== "admin" && (
            <>
              <Link to="/">Inicio</Link>
              <Link to="/productos">Productos</Link>
              <Link to="/contacto">Contacto</Link>
              <Link to="/promociones">Promociones</Link>
              <Link to="/pedidos">Pedidos</Link>
              <Link to="/perfil">👤 Mi Perfil</Link>
            </>
          )}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin">📊 Panel de Administración</Link>
              <Link to="/admin/productos">📦 Productos</Link>
              <Link to="/admin/usuarios">👤 Usuarios</Link>
              <Link to="/admin/pedidos">🧾 Pedidos</Link>
              <Link to="/perfil">👤 Mi Perfil</Link>
            </>
          )}
        </nav>
        {/* Boton cerrar sesion*
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
        */}
      </aside>

      <main className="dashboard-content">
        <h2>{title}</h2>
        <div className="dashboard-inner">{children}</div>
      </main>
    </div>
  );
};

export default LayoutDashboard;
