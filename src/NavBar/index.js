import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar className="NavBar nav d-flex m-3 justify-content-end">
      <Button
        className="justify-content-end"
        onClick={() => {
          localStorage.setItem("jwt", null);
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Navbar>
  );
}

export default NavBar;
