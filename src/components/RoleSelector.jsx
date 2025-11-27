// src/components/RoleSelector.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const RoleSelector = ({ show, onSelect, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>Seleccione su tipo de acceso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Hola {user.nombre}</strong>, elige cómo deseas ingresar:</p>

        {/* BOTÓN CLIENTE */}
        <Button
          variant="primary"
          className="w-100 mb-2"
          onClick={() => onSelect("client")}
        >
          Ingresar como Cliente
        </Button>

        {/* BOTÓN ADMIN SOLO SI ES ADMIN */}
        {user.role === "admin" && (
          <Button
            variant="danger"
            className="w-100"
            onClick={() => onSelect("admin")}
          >
            Ingresar como Administrador
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RoleSelector;
