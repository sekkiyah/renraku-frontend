import React, { useEffect, useState } from "react";
import fetchCall from "../services/fetchService";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const EmployeeView = () => {
  const user = useUser();
  const dbId = window.location.href.split("/employees/")[1];
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    dob: "",
  });

  useEffect(() => {
    fetchCall("GET", `/api/employees/${dbId}`, user.jwt).then(
      (employeeData) => {
        if (employeeData.firstName === null) employeeData.firstName = "";
        if (employeeData.lastName === null) employeeData.lastName = "";
        if (employeeData.employeeId === null) employeeData.employeeId = "";
        if (employeeData.dob === null) employeeData.dob = "";
        setEmployee(employeeData);
      }
    );
  }, []);

  function updateEmployee(prop, value) {
    const updatedEmployee = { ...employee }; //duplicates original and creates 'copy'
    updatedEmployee[prop] = value;
    setEmployee(updatedEmployee); //updates the view
  }

  function deleteEmployee() {
    fetchCall("DELETE", `/api/employees/${dbId}`, user.jwt, employee).then(
      (employeeData) => {
        setEmployee(employeeData);
        navigate("/employees");
      }
    );
  }

  function save() {
    fetchCall("PUT", `/api/employees/${dbId}`, user.jwt, employee).then(
      (employeeData) => {
        setEmployee(employeeData);
        console.log(employeeData);
        setErrorMsg("Successfully updated employee");
        setTimeout(() => {
          setErrorMsg("");
        }, "3000");
      }
    );
  }

  return (
    <>
      {employee ? (
        <Container className="d-flex flex-column mt-3">
          <h3>ID: {dbId}</h3>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                onChange={(e) => updateEmployee("firstName", e.target.value)}
                value={employee.firstName}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                onChange={(e) => updateEmployee("lastName", e.target.value)}
                value={employee.lastName}
              />
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Form.Group as={Col}>
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                id="employeeId"
                onChange={(e) => updateEmployee("employeeId", e.target.value)}
                value={employee.employeeId}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                id="dob"
                onChange={(e) => updateEmployee("dob", e.target.value)}
                value={employee.dob}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex flex-column gap-3 flex-sm-row">
              <Button onClick={() => save()}>Save</Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/employees")}
              >
                Return
              </Button>
            </Col>
            <Col className="d-flex flex-column gap-3 flex-sm-row justify-content-end">
              <Button
                variant="danger"
                onClick={() => {
                  let confirm = window.confirm(
                    "Are you sure you want to delete this employee?"
                  );
                  if (confirm) {
                    deleteEmployee();
                  }
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
      {errorMsg ? (
        <Alert
          variant="success"
          className="justify-content-center text-center mt-3"
          style={{ color: "green", fontWeight: "bold" }}
        >
          {errorMsg}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default EmployeeView;
