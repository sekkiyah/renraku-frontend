import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUser();

  return (
    <Navbar className="NavBar nav d-flex m-3 justify-content-end">
      <Button
        className="justify-content-end"
        onClick={() => {
          //localStorage.setItem("user.jwt", null);
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Navbar>
  );
}

export default NavBar;
