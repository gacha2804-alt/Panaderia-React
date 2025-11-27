import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  const cargar = async () => {
    const res = await axios.get("http://localhost:3000/api/productos");
    setProductos(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <AdminLayout>
      <h2>Gestión de Productos</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>
                <button className="btn btn-warning btn-sm">Editar</button>
                <button className="btn btn-danger btn-sm ms-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminProductos;
