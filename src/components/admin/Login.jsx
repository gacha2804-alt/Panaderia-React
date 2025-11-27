import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { login } from "../services/auth.service";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userType = params.get("type"); // "cliente" o "admin"

  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("danger");

  const handleLogin = async (values) => {
    try {
      const data = await login(values.email, values.contrasena);
      if (!data.token) throw new Error("Credenciales inválidas");

      if (userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMsg(err.message);
      setType("danger");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">
          Login {userType === "admin" ? "Administrador" : "Cliente"}
        </h3>

        {msg && <Alert variant={type}>{msg}</Alert>}

        <Formik
          initialValues={{ email: "", contrasena: "" }}
          onSubmit={handleLogin}
        >
          {({ handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control name="email" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="contrasena" onChange={handleChange} />
              </Form.Group>

              <Button type="submit" className="w-100">
                Entrar
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default Login;
