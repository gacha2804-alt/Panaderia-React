import React from "react";
import LayoutDashboard from "./LayoutDashboard";

const Promociones = () => {
  return (
    <LayoutDashboard title="Promociones Activas">
      <div className="promociones-container">

        <p>Aprovecha nuestras ofertas del día:</p>

        <div className="promo-list">

          <div className="promo-card">
            <h4>🥐 Combo Desayuno</h4>
            <p>Café + croissant por solo <strong>$5.000</strong></p>
          </div>

          <div className="promo-card">
            <h4>🍞 Pan 2x1</h4>
            <p>Lleva dos panes blandos por el precio de uno todos los martes.</p>
          </div>

          <div className="promo-card">
            <h4>🍰 20% de descuento en tortas</h4>
            <p>Aplica en tortas de chocolate, vainilla y tres leches.</p>
          </div>

        </div>

      </div>
    </LayoutDashboard>
  );
};

export default Promociones;
