import React from "react";
import LayoutDashboard from "./LayoutDashboard";

const Dashboard = ({ user }) => {
  const hora = new Date().getHours();
  const saludo =
    hora < 12 ? "Buenos días" : hora < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <LayoutDashboard title="Bienvenido a la Panadería La Esperanza" user={user}>
      <div className="dashboard-bienvenida">
        <h3>
          {saludo}, {user?.nombre || user?.email} 👋
        </h3>
        <p>Nos alegra verte nuevamente. ¿Qué deseas hacer hoy?</p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="dashboard-cards">
        <div className="card">
          <h4>Productos</h4>
          <p>Consulta todos los productos disponibles.</p>
        </div>

        <div className="card">
          <h4>Promociones</h4>
          <p>Mira las promociones activas del día.</p>
        </div>

        <div className="card">
          <h4>Métodos de Pago</h4>
          <p>Revisa cómo puedes pagar tus compras.</p>
        </div>

        <div className="card">
          <h4>Contacto</h4>
          <p>¿Dudas? Puedes comunicarte con soporte.</p>
        </div>
      </div>

      <p style={{ marginTop: "30px" }}>
        Selecciona una opción del menú lateral para continuar.
      </p>
    </LayoutDashboard>
  );
};

export default Dashboard;

