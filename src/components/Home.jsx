import React from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import "./Home.css";
import pan1 from "../assets/carousel/pan.png";
import cucas from "../assets/carousel/cucas.png";
import croissant1 from "../assets/carousel/croissant.png";

const Dashboard = () => {
  // Intentar obtener usuario de localStorage (si existe)
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
  } catch {
    user = null;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        {user ? (
          <p className="hero-subtitle">
            Bienvenido, {user.nombre}. Administra tus productos, pedidos, proveedores y pagos de forma rápida y sencilla.
          </p>
        ) : (
          <p className="hero-subtitle">
            Administra tus productos, pedidos, proveedores y pagos de forma rápida y sencilla.
          </p>
        )}
      </section>

      {/* ---------------------- TARJETAS ---------------------- */}
      <section className="features-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <h4>📦 Productos</h4>
                  <p>Gestiona todos los productos disponibles en la panadería.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <h4>🧾 Pedidos</h4>
                  <p>Organiza pedidos personalizados de tus clientes.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <h4>💳 Pagos</h4>
                  <p>Administra los diferentes métodos de pago disponibles.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------------------- CARRUSEL ---------------------- */}
      <section className="carousel-section">
        <Container>
          <Carousel>
            <Carousel.Item>
              <img className="carousel-img" src={pan1} alt="Pan fresco" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-img" src={cucas} alt="Cucas" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-img" src={croissant1} alt="croissant" />
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* ---------------------- FOOTER ---------------------- */}
      <footer className="app-footer">
        <Container className="text-center">
          <p>📍 Calle 49#1b 14 Versalles — Ibague Tolima, Colombia</p>
          <p>🕒 Horario: 8:00 AM a 10:00 PM</p>
          <p>📞 Tel: 322 474 7369</p>
          <div className="footer-social">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-whatsapp"></i></a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Panadería La Esperanza — Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Dashboard;
