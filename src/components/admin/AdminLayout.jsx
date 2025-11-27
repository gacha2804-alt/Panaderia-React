import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h3 className="admin-title">Admin Panel</h3>

        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/productos">Productos</Link></li>
            <li><Link to="/admin/usuarios">Usuarios</Link></li>
            <li><Link to="/admin/pedidos">Pedidos</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
