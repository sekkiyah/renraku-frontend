import React, { useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import fetchCall from "../services/fetchService";
//import fetchCall from "../services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
      // shins
      // asd
    };

    // fetchCall("POST", `/api/auth/login`, jwt, reqBody)
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log("Validated");
    //       return Promise.all([response.json(), response.headers]);
    //     } else return Promise.reject("Invalid login");
    //   })
    //   .then(([body, headers]) => { Come back to
    //     setJwt(headers.get("authorization"));
    //     //navigate("/plans");
    //   })
    //   .catch((message) => {
    //     console.log(message);
    //   });
    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else return Promise.reject("Invalid login");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-end">
          <Col md="5">
            <Form.Label>Login</Form.Label>
            <Form.Group controlId="username" className="mb-3">
              <FloatingLabel label="Username">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="password">
              <FloatingLabel label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column gap-3 flex-sm-row justify-content-end">
            <Button
              id="submit"
              type="submit"
              size="lg"
              onClick={() => sendLoginRequest()}
              //onSubmit={() => sendLoginRequest()}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              type="button"
              size="lg"
              onClick={() => {
                navigate("/");
              }}
            >
              Return Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
