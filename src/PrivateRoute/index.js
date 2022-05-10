import React, { useState } from "react";
import { Navigate } from "react-router";
import fetchCall from "../services/fetchService";
import { useUser } from "../UserProvider";

const PrivateRoute = (props) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const { children } = props;

  async function validateUser(user) {
    try {
      const isValid = await fetchCall(
        "GET",
        `/api/auth/validate?token=${user.jwt}`,
        user.jwt
      );
      console.log("isValid: ", isValid);
      setIsValid(isValid);
      setIsLoading(false);
    } catch (err) {
      console.log("Routing error: ", err);
    }
  }

  if (user) {
    validateUser(user);
    // fetchCall("GET", `/api/auth/validate?token=${user.jwt}`, user.jwt).then(
    //   (isValid) => {
    //     setIsValid(isValid);
    //     setIsLoading(false);
    //   }
    // );
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
