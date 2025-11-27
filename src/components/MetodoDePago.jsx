import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutDashboard from "./LayoutDashboard";

const MetodoDePago = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const carrito = location.state?.carrito || [];
  const listaPrecios = location.state?.listaPrecios || {};

  const [metodo, setMetodo] = useState("");

  const confirmarPago = () => {
    if (!metodo) {
      alert("Selecciona un método de pago");
      return;
    }

    navigate("/factura", {
      state: {
        carrito,
        metodoPago: metodo,
        listaPrecios
      }
    });
  };

  return (
    <LayoutDashboard title="Método de Pago">

      <h4 className="text-center mb-3">Selecciona tu método de pago</h4>

      <Form className="p-4">
        <Form.Check
          type="radio"
          label="Tarjeta de crédito / débito"
          name="metodoPago"
          value="Tarjeta"
          onChange={(e) => setMetodo(e.target.value)}
        />

        <Form.Check
          type="radio"
          label="Efectivo"
          name="metodoPago"
          value="Efectivo"
          className="mt-2"
          onChange={(e) => setMetodo(e.target.value)}
        />

        <Form.Check
          type="radio"
          label="PayPal"
          name="metodoPago"
          value="PayPal"
          className="mt-2"
          onChange={(e) => setMetodo(e.target.value)}
        />

        <Button className="mt-4 w-100" variant="success" onClick={confirmarPago}>
          Confirmar pago
        </Button>
      </Form>

    </LayoutDashboard>
  );
};

export default MetodoDePago;
