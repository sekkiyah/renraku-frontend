import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import fetchCall from "../services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const PlanDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [plans, setPlans] = useState(null); //FIX
  const planList = useRef(plans);
  const navigate = useNavigate();
  const [planModal, setPlanModal] = useState(false);
  const closePlanModal = () => setPlanModal(false);
  const showPlanModal = () => setPlanModal(true);

  useEffect(() => {
    planList.current = planList;
    console.log(planList.current);
  });

  useEffect(() => {
    fetchCall("GET", `/api/plans`, jwt).then((planData) => {
      console.log("calling GET");
      setPlans(planData);
    });

    //fetch();
  }, []);

  function createPlan() {
    fetchCall("POST", `/api/plans`, jwt).then((plan) => {
      console.log("Calling POST");
      //setPlans(plan);
    });
  }

  return (
    <>
      <Container className="d-flex flex-column m-3">
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subgroup</th>
              <th>Group</th>
              <th>Policy</th>
            </tr>
          </thead>
          <tbody>
            {plans &&
              plans.map((plan) => (
                <tr
                  key={plan.planNumber}
                  onClick={() => navigate(`/plans/${plan.planNumber}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{plan.planNumber}</td>
                  <td>{plan.planName}</td>
                  <td>{plan.subgroup}</td>
                  <td>{plan.groupNumber}</td>
                  <td>{plan.policyNumber}</td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Row className="mt-3">
          <Col className="d-flex flex-column gap-3 flex-sm-row">
            <Button onClick={() => showPlanModal()}>Add Plan</Button>
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal show={planModal} onHide={closePlanModal}>
        <Modal.Header>
          <Modal.Title>New Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                id="planName"
                //onChange={(e) => createPlan("planName", e.target.value)}
                //value={plans.planName}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Plan Subgroup</Form.Label>
              <Form.Control
                type="text"
                id="subgroup"
                //onChange={(e) => createPlan("subgroup", e.target.value)}
                //value={plans.subgroup}
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col}>
              <Form.Label>Policy #:</Form.Label>
              <Form.Control
                type="text"
                id="policyNumber"
                //onChange={(e) => createPlan("policyNumber", e.target.value)}
                //value={plans.policyNumber}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Group #:</Form.Label>
              <Form.Control
                type="text"
                id="groupNumber"
                //onChange={(e) => createPlan("groupNumber", e.target.value)}
                //value={plans.groupNumber}
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Col className="d-flex flex-column m-3 gap-3 flex-sm-row">
          <Button
            onClick={() => {
              createPlan();
              closePlanModal();
            }}
          >
            Submit Plan
          </Button>

          <Button variant="secondary" onClick={closePlanModal}>
            Close
          </Button>
        </Col>
      </Modal>
      {/* <div>Jwt token is {jwt}</div> */}
    </>
  );
};

export default PlanDashboard;
