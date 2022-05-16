import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className="d-flex flex-column mt-3 gap-3 text-center">
        <Row>
          <Col>
            <h1>Dashboard</h1>
            <br />
            <h5 className="text-muted">Select an option below</h5>
          </Col>
        </Row>
        <Row>
          <Col className="">
            <Button className="col-md-5" onClick={() => navigate("/employees")}>
              Employees
            </Button>
          </Col>
          <Col>
            <Button
              className="col-md-5"
              variant="success"
              onClick={() => navigate("/plans")}
            >
              Plans
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
