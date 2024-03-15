import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import visionLogo from '../images/vision_logo.png';
import '../styles/home_styles.css';

import Carousel1 from '../images/Carousel/Carousel01.jpg';
import Carousel2 from '../images/Carousel/Carousel02.jpeg';
import Carousel3 from '../images/Carousel/Carousel03.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <div>
      {/* Header */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img
            src={visionLogo}
            width="100"
            height="100"
            className="d-inline-block align-top"
            alt="Vision Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="nav-links">
                <Nav.Link className="nav-link" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/classes">Classes</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/about">About</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/contact">Contact Us</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/login">
                    <Button className="u-login" variant="primary" size="lg">Login</Button>
                </Nav.Link>
            </Nav>

        </Navbar.Collapse>
      </Navbar>

      {/* Body */}
      <Container fluid>
        <Row>
          <Col>
            {/* Carousel */}
            <Carousel>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Carousel1}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Vision Institute</h3>
                  <p>Gampola - Atabage beautiful area</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Carousel2}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Vision Institute</h3>
                  <p>Gampola - Atabage beautiful area</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Carousel3}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Vision Institute</h3>
                  <p>Gampola - Atabage beautiful area</p>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={6} className="text-center">
            <Button variant="primary" size="lg">Login</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
