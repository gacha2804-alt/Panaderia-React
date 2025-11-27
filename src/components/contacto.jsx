import React from "react";
import LayoutDashboard from "./LayoutDashboard";

const Contacto = () => {
  return (
    <LayoutDashboard title="Contacto y Soporte">

      <div className="contacto-container">

        <h3>Información de Contacto</h3>

        <div className="contacto-info">

          <div className="contacto-card">
            <h4>📱 Teléfono</h4>
            <p> 322 474 7369</p>
          </div>

          <div className="contacto-card">
            <h4>📧 Correo Electrónico</h4>
            <p>gacha2804@gmail.com</p>
          </div>

          <div className="contacto-card">
            <h4>📍 Dirección</h4>
            <p>Calle 49#1b 14 Versalles, Ibague Tolima</p>
          </div>

          <div className="contacto-card">
            <h4>🕒 Horario de Atención</h4>
            <p>Lunes a Domingo · 8:00 AM – 10:00 PM</p>
          </div>

        </div>

      </div>

    </LayoutDashboard>
  );
};

export default Contacto;
