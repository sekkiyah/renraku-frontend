import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const Homepage = () => {
  const user = useUser();
  const navigate = useNavigate();
  return (
    <Container
      fluid="sm"
      className="mt-5 d-flex gap-4 justify-content-center text-center"
    >
      <Card body className="col-md-8">
        <h1>Welcome</h1>
        <Row>
          {user.jwt ? (
            <Col>
              <Button
                size="lg"
                className="col-md-4"
                //href="/dashboard"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Button>
            </Col>
          ) : (
            <Col>
              <h5 className="text-muted">Click below to login</h5>
              <Button
                size="lg"
                className="col-md-3"
                //ref="/login"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </Col>
          )}
        </Row>
      </Card>
    </Container>
  );
};

export default Homepage;
