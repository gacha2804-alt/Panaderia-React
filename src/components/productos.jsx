import React, { useState } from "react";
import LayoutDashboard from "./LayoutDashboard";
import { Button, Card, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./productos.css";

const Productos = () => {
  const navigate = useNavigate();

  const listaPrecios = {
    "Pan francés": { precio: 500, img: "/src/assets/imagenes/pan_frances.png", desc: "Pan tradicional recién horneado." },
    "Pan aliñado": { precio: 700, img: "/src/assets/imagenes/pan_aliñado.png", desc: "Pan con especias y sabor único." },
    "Buñuelo": { precio: 300, img: "/src/assets/imagenes/buñuelos.png", desc: "Delicioso buñuelo crujiente." },
    "Almojábana": { precio: 800, img: "/src/assets/imagenes/almojabanas.png", desc: "Suave pan de queso." },
    "Pandebono": { precio: 900, img: "/src/assets/imagenes/pandebono.png", desc: "Clásico pandebono colombiano." },
    "Galletas de coco": { precio: 700, img: "/src/assets/imagenes/galletas de coco.png", desc: "Deliciosas galletas de coco." }
  };

  const [carrito, setCarrito] = useState([]);

  const handleAgregarCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, stock: item.stock + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, stock: 1 }]);
    }
  };

  const aumentar = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, stock: item.stock + 1 } : item
      )
    );
  };

  const disminuir = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id ? { ...item, stock: item.stock - 1 } : item
        )
        .filter((item) => item.stock > 0)
    );
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const irAPago = () => {
    navigate("/MetodoDePago", {
      state: {
        carrito,
        listaPrecios
      }
    });
  };

  return (
    <LayoutDashboard title="Tienda de Productos">

      <h4 className="text-center mb-3">Productos disponibles</h4>

      <Row className="g-4 mb-4">
        {Object.keys(listaPrecios).map((nombre, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={listaPrecios[nombre].img}
                alt={nombre}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>{listaPrecios[nombre].desc}</Card.Text>
                <Card.Text className="fw-bold">${listaPrecios[nombre].precio}</Card.Text>

                <Button
                  variant="success"
                  onClick={() =>
                    handleAgregarCarrito({ id: index + 1, nombre })
                  }
                >
                  Agregar al carrito
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h4 className="text-center mb-3">Carrito</h4>

      {carrito.length === 0 ? (
        <p className="text-center">El carrito está vacío</p>
      ) : (
        <>
          {/* Tabla del carrito */}
          <Table bordered hover className="text-center">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${listaPrecios[item.nombre].precio}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={() => disminuir(item.id)}>
                      -
                    </Button>{" "}
                    <strong>{item.stock}</strong>{" "}
                    <Button variant="outline-secondary" size="sm" onClick={() => aumentar(item.id)}>
                      +
                    </Button>
                  </td>
                  <td>${(listaPrecios[item.nombre].precio * item.stock).toLocaleString()}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => eliminar(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Total */}
          <div className="alert alert-success fw-bold text-center mt-3">
            TOTAL: $
            {carrito
              .reduce(
                (sum, p) => sum + listaPrecios[p.nombre].precio * p.stock,
                0
              )
              .toLocaleString()}
          </div>

          <div className="text-center mb-5">
            <Button variant="primary" onClick={irAPago}>
              Pagar
            </Button>
          </div>
        </>
      )}

    </LayoutDashboard>
  );
};

export default Productos;
