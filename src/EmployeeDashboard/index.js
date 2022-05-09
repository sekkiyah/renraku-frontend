import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container fluid className="m-3 text-center mt-5">
        <Button className="col-md-5" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </Container>
    </>
  );
};

export default EmployeeDashboard;
