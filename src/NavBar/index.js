import Cookies from "js-cookie";
import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

function NavBar() {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  const user = useUser();
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Home
          </Navbar.Brand>
          {/* <img
              // src="logo.jpeg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              // alt="React Bootstrap logo"
            /> */}
          {user.jwt ? (
            <Navbar.Brand
              className="justify-content-end"
              variant="secondary"
              href="/login"
              onClick={() => {
                // navigate("/login");
                Cookies.remove("jwt");
                // console.log(pathname);
                // window.location.reload();
              }}
            >
              Logout
            </Navbar.Brand>
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
    </>
    /* <Navbar className="NavBar nav d-flex m-3 justify-content-end">
      <Button
        className="justify-content-end"
        onClick={() => {
          Cookies.set("jwt", null);
          console.log(pathname);
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Navbar> */
  );
}

export default NavBar;
