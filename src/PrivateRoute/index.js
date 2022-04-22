import React, { useState } from "react";
import { Navigate } from "react-router";
import fetchCall from "../services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    fetchCall("GET", `/api/auth/validate?token=${jwt}`, jwt).then((isValid) => {
      setIsValid(isValid);
      setIsLoading(false);
    });
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
