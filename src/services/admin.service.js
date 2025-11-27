// src/services/admin.service.js

const API_URL = "http://localhost:3000/api";

// Todas las solicitudes deben llevar el token
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/* ------------------------ PRODUCTOS ------------------------ */

// GET /api/productos
export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await res.json();
};

// POST /api/productos
export const createProducto = async (producto) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(producto),
  });
  return await res.json();
};

// PUT /api/productos/:id
export const updateProducto = async (id, producto) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(producto),
  });
  return await res.json();
};

// DELETE /api/productos/:id
export const deleteProducto = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return await res.json();
};



/* ------------------------ USUARIOS ------------------------ */

// GET /api/usuarios
export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await res.json();
};

// POST /api/usuarios
export const createUsuario = async (usuario) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(usuario),
  });
  return await res.json();
};

// PUT /api/usuarios/:id
export const updateUsuario = async (id, usuario) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(usuario),
  });
  return await res.json();
};

// DELETE /api/usuarios/:id
export const deleteUsuario = async (id) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return await res.json();
};



/* ------------------------ PEDIDOS ------------------------ */

// GET /api/pedidos
export const getPedidos = async () => {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await res.json();
};

// PUT /api/pedidos/:id
export const updatePedido = async (id, pedido) => {
  const res = await fetch(`${API_URL}/pedidos/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(pedido),
  });
  return await res.json();
};

// DELETE /api/pedidos/:id
export const deletePedido = async (id) => {
  const res = await fetch(`${API_URL}/pedidos/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return await res.json
}