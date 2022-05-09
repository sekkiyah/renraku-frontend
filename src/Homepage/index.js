import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <Container fluid="sm" className="mt-5 d-flex flex-column gap-4 text-center">
      <Row>
        <Col>
          <h1>Welcome</h1>
          <h5 className="text-muted">Click below to login</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            size="lg"
            className="col-md-3"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
