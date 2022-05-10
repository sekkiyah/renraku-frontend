import React, { useEffect, useState } from "react";
import fetchCall from "../services/fetchService";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const PlanView = () => {
  const user = useUser();
  const planNumber = window.location.href.split("/plans/")[1];
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [plan, setPlan] = useState({
    planName: "",
    subgroup: "",
    policyNumber: "",
    groupNumber: "",
  });

  useEffect(() => {
    fetchCall("GET", `/api/plans/${planNumber}`, user.jwt).then((planData) => {
      if (planData.planName === null) planData.planName = "";
      if (planData.subgroup === null) planData.subgroup = "";
      if (planData.policyNumber === null) planData.policyNumber = "";
      if (planData.groupNumber === null) planData.groupNumber = "";
      setPlan(planData);
    });
  }, []);

  function updatePlan(prop, value) {
    const newPlan = { ...plan }; //duplicates original and creates 'copy'
    newPlan[prop] = value;
    setPlan(newPlan); //updates the view
  }

  function deletePlan() {
    fetchCall("DELETE", `/api/plans/${planNumber}`, user.jwt, plan).then(
      (planData) => {
        setPlan(planData);
        navigate("/plans");
      }
    );
  }

  function save() {
    fetchCall("PUT", `/api/plans/${planNumber}`, user.jwt, plan).then(
      (planData) => {
        setPlan(planData);
        console.log(planData);
        setErrorMsg("Successfully updated plan");
        setTimeout(() => {
          setErrorMsg("");
        }, "3000");
      }
    );
  }

  return (
    <>
      {plan ? (
        <Container className="d-flex flex-column m-3">
          <h3>Plan Number: {planNumber}</h3>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                id="planName"
                onChange={(e) => updatePlan("planName", e.target.value)}
                value={plan.planName}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Plan Subgroup</Form.Label>
              <Form.Control
                type="text"
                id="subgroup"
                onChange={(e) => updatePlan("subgroup", e.target.value)}
                value={plan.subgroup}
              />
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Form.Group as={Col}>
              <Form.Label>Policy #:</Form.Label>
              <Form.Control
                type="text"
                id="policyNumber"
                onChange={(e) => updatePlan("policyNumber", e.target.value)}
                value={plan.policyNumber}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Group #:</Form.Label>
              <Form.Control
                type="text"
                id="groupNumber"
                onChange={(e) => updatePlan("groupNumber", e.target.value)}
                value={plan.groupNumber}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex flex-column gap-3 flex-sm-row">
              <Button onClick={() => save()}>Save</Button>
              <Button variant="secondary" onClick={() => navigate("/plans")}>
                Return
              </Button>
            </Col>
            <Col className="d-flex flex-column gap-3 flex-sm-row justify-content-end">
              <Button
                variant="danger"
                onClick={() => {
                  let confirm = window.confirm(
                    "Are you sure you want to delete this plan?"
                  );
                  if (confirm) {
                    deletePlan();
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
          className="justify-content-center text-center mt-1"
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

export default PlanView;
