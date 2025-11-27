import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Alert } from "react-bootstrap";

const API_URL = "http://localhost:3000/api";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const getUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios(res.data);
    } catch (error) {
      console.error(error);
      setAlert({ show: true, type: "danger", msg: "Error cargando usuarios" });
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios(usuarios.filter((u) => u.id !== id));
      setAlert({ show: true, type: "success", msg: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        type: "danger",
        msg: "No se pudo eliminar el usuario"
      });
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Gestión de Usuarios</h2>

      {alert.show && (
        <Alert variant={alert.type} onClose={() => setAlert({ show: false })} dismissible>
          {alert.msg}
        </Alert>
      )}

      <Table bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => eliminarUsuario(u.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsuarios;
