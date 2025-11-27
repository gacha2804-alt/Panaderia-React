// src/components/AuthModal.jsx

import React, { useState } from "react";
import { Modal, Tab, Tabs, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { login, register, getCurrentUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ show, handleClose, setUser }) => {
  const [key, setKey] = useState("login");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("danger");
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    contrasena: Yup.string().required("Contraseña es requerida"),
  });

  const registerSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    contrasena: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required("Contraseña es requerida"),
  });

  // LOGIN
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const data = await login(values.email, values.contrasena);

      if (!data || !data.token) {
        throw new Error(data?.message || "Error al iniciar sesión");
      }

      setType("success");
      setMessage("Inicio de sesión exitoso");

      // Actualizar estado global en App
      const current = getCurrentUser();
      if (setUser) setUser(current);

      handleClose();
      navigate("/dashboard");
    } catch (err) {
      setType("danger");
      setMessage(err.message || "Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  // REGISTRO
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      await register(values.nombre, values.email, values.contrasena);

      setKey("login"); // vuelvo al login
      setType("success");
      setMessage("Registro exitoso. Verifica tu correo para continuar.");
    } catch (err) {
      setType("danger");
      setMessage(err.message || "Error al registrarse");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Acceso a la Panadería</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant={type}>{message}</Alert>}

        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="login" title="Iniciar Sesión">
            <Formik
              initialValues={{ email: "", contrasena: "" }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="contrasena"
                      value={values.contrasena}
                      onChange={handleChange}
                      isInvalid={touched.contrasena && errors.contrasena}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contrasena}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Iniciar Sesión
                  </Button>
                </Form>
              )}
            </Formik>
          </Tab>

          <Tab eventKey="register" title="Registrarse">
            <Formik
              initialValues={{ nombre: "", email: "", contrasena: "" }}
              validationSchema={registerSchema}
              onSubmit={handleRegister}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={values.nombre}
                      onChange={handleChange}
                      isInvalid={touched.nombre && errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="contrasena"
                      value={values.contrasena}
                      onChange={handleChange}
                      isInvalid={touched.contrasena && errors.contrasena}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contrasena}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="success">
                    Registrarse
                  </Button>
                </Form>
              )}
            </Formik>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;