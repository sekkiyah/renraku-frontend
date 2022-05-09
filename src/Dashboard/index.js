import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {
  //const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className="d-flex flex-column m-3 gap-3 text-center">
        <h2>Select an option below</h2>
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
