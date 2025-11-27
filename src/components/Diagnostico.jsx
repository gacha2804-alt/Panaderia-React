import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

const Diagnostico = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (url, method = "GET") => {
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
      });
      return { url, status: res.status, ok: res.ok };
    } catch (err) {
      return { url, error: err.message };
    }
  };

  const runDiagnostics = async () => {
    setLoading(true);
    const endpoints = [
      "http://localhost:3000",
      "http://localhost:3000/api",
      "http://localhost:3000/api/auth/login",
      "http://localhost:3000/api/usuarios",
      "http://localhost:3000/api/perfil",
      "http://localhost:3000/api/auth/perfil",
      "http://localhost:5000",
      "http://localhost:5000/api",
      "http://localhost:8000",
      "http://localhost:8000/api",
    ];

    const res = {};
    for (const endpoint of endpoints) {
      res[endpoint] = await testEndpoint(endpoint);
    }
    setResults(res);
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h1>Diagnóstico de Endpoints</h1>
      <p>Verifica qué puertos y endpoints están disponibles.</p>

      <Button onClick={runDiagnostics} disabled={loading} variant="primary">
        {loading ? "Testando..." : "Ejecutar Diagnóstico"}
      </Button>

      <div className="mt-4">
        {Object.entries(results).length === 0 ? (
          <Alert variant="info">Haz clic en "Ejecutar Diagnóstico" para comenzar</Alert>
        ) : (
          <div>
            {Object.entries(results).map(([url, data]) => (
              <Alert key={url} variant={data.ok ? "success" : "danger"}>
                <strong>{url}</strong>
                <br />
                {data.error ? (
                  <span>Error: {data.error}</span>
                ) : (
                  <span>Status: {data.status}</span>
                )}
              </Alert>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 p-3" style={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
        <h5>Instrucciones:</h5>
        <ol>
          <li>Verifica que el servidor backend está corriendo.</li>
          <li>Si ves Status 200/404 en algún puerto, esa es la URL correcta.</li>
          <li>Si todos son errores, el backend no está activo.</li>
          <li>Copia la URL que funciona y actualiza `API_URL` en `auth.service.js`.</li>
        </ol>
      </div>
    </Container>
  );
};

export default Diagnostico;
