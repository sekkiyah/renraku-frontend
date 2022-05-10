import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import fetchCall from "../services/fetchService";
import { useUser } from "../UserProvider";

const PlanDashboard = () => {
  const user = useUser();
  const [plans, setPlans] = useState(null); //FIX Live Updates
  const planList = useRef(plans);
  const navigate = useNavigate();
  const [planModal, setPlanModal] = useState(false);
  const closePlanModal = () => setPlanModal(false);
  const showPlanModal = () => setPlanModal(true);

  const [newPlan, setNewPlan] = useState(null);

  useEffect(() => {
    planList.current = plans;
  });

  useEffect(() => {
    fetchPlans();
  }, [planList.current]);

  function createPlan(plan) {
    fetchCall("POST", `api/plans`, user.jwt, plan);
    console.log(plan);
  }

  function updateNewPlan(prop, value) {
    const updatedNewPlan = { ...newPlan }; //duplicates original and creates 'copy'
    updatedNewPlan[prop] = value;
    setNewPlan(updatedNewPlan);
  }

  async function fetchPlans() {
    const getPlans = await fetchCall("GET", `/api/plans`, user.jwt);
    planList.current = setPlans(getPlans);
    // .then((planData) => {
    //   //console.log("calling GET");
    //   planList.current = setPlans(planData);
    // });
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
          <Form name="newPlan">
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  type="text"
                  name="planName"
                  onChange={(e) => updateNewPlan("planName", e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Plan Subgroup</Form.Label>
                <Form.Control
                  type="text"
                  name="subgroup"
                  onChange={(e) => updateNewPlan("subgroup", e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Form.Group as={Col}>
                <Form.Label>Policy #:</Form.Label>
                <Form.Control
                  type="text"
                  name="policyNumber"
                  onChange={(e) =>
                    updateNewPlan("policyNumber", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Group #:</Form.Label>
                <Form.Control
                  type="text"
                  name="groupNumber"
                  onChange={(e) => updateNewPlan("groupNumber", e.target.value)}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Col className="d-flex flex-column m-3 gap-3 flex-sm-row">
          <Button
            type="submit"
            onClick={() => {
              createPlan(newPlan);
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
    </>
  );
};

export default PlanDashboard;
