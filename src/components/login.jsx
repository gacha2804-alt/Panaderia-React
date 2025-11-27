import React, { useState } from "react";
import { login, getCurrentUser } from "../services/auth.service";

const Login = () => {
  const [form, setForm] = useState({ email: "", contrasena: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const data = await login(form.email, form.contrasena);

      if (!data.usuario) {
        setMensaje("Credenciales incorrectas");
        return;
      }

      // ⬇️ Recuperamos usuario normalizado (AQUÍ ESTÁ LA MAGIA)
      const user = getCurrentUser();
      console.log("Usuario logueado:", user);

      setMensaje("Inicio de sesión exitoso");

      // Redirige a dashboard ADMIN o CLIENTE según rol
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setMensaje("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error en login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <h2>Iniciar Sesión</h2>

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px 15px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Iniciar Sesión
      </button>

      <p style={{ color: mensaje.includes("exitoso") ? "green" : "red", marginTop: "10px" }}>
        {mensaje}
      </p>
    </form>
  );
};

export default Login;
