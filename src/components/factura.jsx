import React from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LayoutDashboard from "./LayoutDashboard";

const Factura = () => {
  const location = useLocation();

  const carrito = location.state?.carrito || [];
  const metodoPago = location.state?.metodoPago || "N/A";
  const listaPrecios = location.state?.listaPrecios || {};

  const total = carrito.reduce(
    (sum, p) => sum + listaPrecios[p.nombre].precio * p.stock,
    0
  );

  return (
    <LayoutDashboard title="Factura">

      <Card className="p-4 shadow">

        <h4>Factura</h4>
        <p><strong>Método de pago:</strong> {metodoPago}</p>

        <hr />

        <h5>Productos:</h5>

        <ul>
          {carrito.map((p, i) => (
            <li key={i}>
              {p.nombre} — Cantidad: {p.stock} — Precio: ${listaPrecios[p.nombre].precio}
            </li>
          ))}
        </ul>

        <hr />

        <h4>Total: ${total.toLocaleString()}</h4>

      </Card>

    </LayoutDashboard>
  );
};

export default Factura;
