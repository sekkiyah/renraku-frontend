import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import fetchCall from "../services/fetchService";
import { useUser } from "../UserProvider";

const EmployeeDashboard = () => {
  const user = useUser();
  const [employees, setEmployees] = useState(null); //FIX Live Updates
  const employeeList = useRef(employees);
  const navigate = useNavigate();
  const [employeeModal, setEmployeeModal] = useState(false);
  const closeEmployeeModal = () => setEmployeeModal(false);
  const showEmployeeModal = () => setEmployeeModal(true);

  const [newEmployee, setNewEmployee] = useState(null);

  useEffect(() => {
    employeeList.current = employees;
  });

  useEffect(() => {
    fetchEmployees();
  }, [employeeList.current]);

  function createEmployee(employee) {
    fetchCall("POST", `api/employees`, user.jwt, employee);
    console.log(employee);
  }

  function updateNewEmployee(prop, value) {
    const updatedNewEmployee = { ...newEmployee }; //duplicates original and creates 'copy'
    updatedNewEmployee[prop] = value;
    setNewEmployee(updatedNewEmployee);
  }

  async function fetchEmployees() {
    const getEmployees = await fetchCall("GET", `/api/employees`, user.jwt);
    employeeList.current = setEmployees(getEmployees);
    // .then((employeeData) => {
    //   //console.log("calling GET");
    //   employeeList.current = setEmployees(employeeData);
    // });
  }

  return (
    <>
      <Container className="d-flex flex-column mt-3">
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee ID</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) => (
                <tr
                  key={employee.dbId}
                  onClick={() => navigate(`/employees/${employee.dbId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{employee.dbId}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.dob}</td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Row className="mt-3">
          <Col className="d-flex flex-column gap-3 flex-sm-row">
            <Button onClick={() => showEmployeeModal()}>Add Employee</Button>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={employeeModal} onHide={closeEmployeeModal}>
        <Modal.Header>
          <Modal.Title>New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form name="newEmployee">
            <Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  required
                  onChange={(e) =>
                    updateNewEmployee("firstName", e.target.value)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={(e) =>
                    updateNewEmployee("lastName", e.target.value)
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Form.Group as={Col}>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeId"
                  onChange={(e) =>
                    updateNewEmployee("employeeId", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  onChange={(e) => updateNewEmployee("dob", e.target.value)}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Col className="d-flex flex-column m-3 gap-3 flex-sm-row">
          <Button
            type="submit"
            onClick={() => {
              createEmployee(newEmployee);
              closeEmployeeModal();
            }}
          >
            Add Employee
          </Button>
          <Button variant="secondary" onClick={closeEmployeeModal}>
            Close
          </Button>
        </Col>
      </Modal>
    </>
  );
};

export default EmployeeDashboard;
