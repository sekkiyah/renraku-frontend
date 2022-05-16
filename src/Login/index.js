import React, { useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const Login = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function sendLoginRequest() {
    setErrorMsg("");
    const reqBody = {
      username: username,
      password: password,
      // shins
      // asd
    };

    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.headers.get("authorization"));
          //return response.text();
          return response.headers.get("authorization");
        } else if (response.status === 401 || response.status === 403) {
          setErrorMsg("Invalid login");
        } else {
          setErrorMsg("Something else went wrong");
        }
      })
      .then((data) => {
        if (data) {
          //console.log("Login processed response: ", data);
          user.setJwt(data);
          navigate("/dashboard");
        }
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") return sendLoginRequest();
                  }}
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
            >
              Login
            </Button>
            {/* <Button
              variant="secondary"
              type="button"
              size="lg"
              onClick={() => {
                navigate("/");
              }}
            >
              Return Home
            </Button> */}
          </Col>
        </Row>
        {errorMsg ? (
          <Alert
            variant="secondary"
            className="justify-content-center text-center mt-3"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errorMsg}
          </Alert>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Login;
