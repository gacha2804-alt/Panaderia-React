import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Image } from "react-bootstrap";
import {
  getCurrentUser,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount,
  logout,
} from "../../../services/auth.service";
import LayoutDashboard from "../../LayoutDashboard";
import "./perfil.css";

const Perfil = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(getCurrentUser());
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user?.nombre || "");
  const [email, setEmail] = useState(user?.email || "");

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);

  const [passOld, setPassOld] = useState("");
  const [passNew, setPassNew] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // listen for user update events (services update localStorage)
    const onUpdated = () => setUser(getCurrentUser());
    window.addEventListener("app:user-updated", onUpdated);
    window.addEventListener("app:logout", onUpdated);
    return () => {
      window.removeEventListener("app:user-updated", onUpdated);
      window.removeEventListener("app:logout", onUpdated);
    };
  }, []);

  useEffect(() => {
    setName(user?.nombre || "");
    setEmail(user?.email || "");
    setAvatarPreview(user?.avatar || null);
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { nombre: name, email };
      const res = await updateProfile(user.id, payload);

      if (!res.ok) {
        setAlert({ show: true, type: "danger", msg: res.message || "Error al actualizar el perfil" });
        return;
      }

      setAlert({ show: true, type: "success", msg: "Perfil actualizado correctamente" });
      setEditing(false);
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "danger", msg: "No se pudo actualizar el perfil" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setAvatarFile(f);
    if (f) setAvatarPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!avatarFile) return setAlert({ show: true, type: "warning", msg: "Selecciona una imagen primero" });

    setLoading(true);
    try {
      const res = await uploadAvatar(user.id, avatarFile);
      if (!res.ok) {
        setAlert({ show: true, type: "danger", msg: res.message || "Error al subir la imagen" });
        return;
      }

      setAlert({ show: true, type: "success", msg: "Imagen subida correctamente" });
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "danger", msg: "No se pudo subir la imagen" });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passOld || !passNew) return setAlert({ show: true, type: "warning", msg: "Rellena ambas contraseñas" });
    if (passNew !== passConfirm) return setAlert({ show: true, type: "warning", msg: "Las contraseñas no coinciden" });

    setLoading(true);
    try {
      const res = await changePassword(user.id, passOld, passNew);

      if (!res.ok) {
        setAlert({ show: true, type: "danger", msg: res.message || "Error al cambiar la contraseña" });
        return;
      }

      setAlert({ show: true, type: "success", msg: res.message || "Contraseña actualizada correctamente" });
      setPassOld("");
      setPassNew("");
      setPassConfirm("");
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "danger", msg: "No se pudo cambiar la contraseña" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await deleteAccount(user.id);

      if (!res.ok) {
        setAlert({ show: true, type: "danger", msg: res.message || "Error al eliminar la cuenta" });
        setShowDeleteModal(false);
        return;
      }

      setAlert({ show: true, type: "success", msg: res.message || "Cuenta eliminada correctamente" });
      setShowDeleteModal(false);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "danger", msg: "No se pudo eliminar la cuenta" });
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <LayoutDashboard title="Mi Perfil">
        <Alert variant="warning">No hay usuario autenticado</Alert>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard title="Mi Perfil">
      <Container className="perfil-root mt-3">
      <Row>
        <Col md={4}>
          <Card className="mb-3 text-center">
            <Card.Body>
              <div className="avatar-wrapper">
                {avatarPreview ? (
                  <Image src={avatarPreview} roundedCircle className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">{user.nombre?.[0]?.toUpperCase()}</div>
                )}
              </div>

              <h5 className="mt-3">{user.nombre}</h5>
              <p className="text-muted">{user.email}</p>
              <p className="small">Rol: {user.role || user.rol}</p>

              <hr />

              <Form.Group controlId="avatarFile" className="mb-2">
                <Form.Label>Actualizar imagen</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>
              <div className="d-flex gap-2 justify-content-center mt-2">
                <Button variant="outline-primary" onClick={handleUpload} disabled={loading}>
                  {loading ? "Subiendo..." : "Subir imagen"}
                </Button>
                <Button variant="outline-secondary" onClick={() => { setAvatarFile(null); setAvatarPreview(user?.avatar || null); }} disabled={loading}>Cancelar</Button>
              </div>

              <hr />

              <Button variant="danger" className="mt-2" onClick={() => setShowDeleteModal(true)}>Eliminar cuenta</Button>
              <Button variant="secondary" className="mt-2 ms-2" onClick={handleLogout}>Cerrar sesión</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {alert.show && (
            <Alert variant={alert.type} onClose={() => setAlert({ show: false })} dismissible>{alert.msg}</Alert>
          )}

          <Card className="mb-3">
            <Card.Header>
              <strong>Información del perfil</strong>
              <Button variant="link" onClick={() => setEditing((v) => !v)} className="float-end">{editing ? "Cancelar" : "Editar"}</Button>
            </Card.Header>

            <Card.Body>
              {!editing ? (
                <div>
                  <p><strong>Nombre:</strong> {user.nombre}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              ) : (
                <Form onSubmit={handleSaveProfile}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Guardando..." : "Guardar"}
                    </Button>
                    <Button variant="secondary" onClick={() => setEditing(false)} disabled={loading}>Cancelar</Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header><strong>Cambiar contraseña</strong></Card.Header>
            <Card.Body>
              <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3" controlId="passOld">
                  <Form.Label>Contraseña actual</Form.Label>
                  <Form.Control type="password" value={passOld} onChange={(e) => setPassOld(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="passNew">
                  <Form.Label>Nueva contraseña</Form.Label>
                  <Form.Control type="password" value={passNew} onChange={(e) => setPassNew(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="passConfirm">
                  <Form.Label>Confirmar nueva contraseña</Form.Label>
                  <Form.Control type="password" value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} required />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Cambiando..." : "Cambiar contraseña"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro? Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={loading}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteAccount} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </LayoutDashboard>
  );
};

export default Perfil;
