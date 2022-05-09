//import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PlanDashboard from "./PlanDashboard";
import jwt_decode from "jwt-decode";
import Homepage from "./Homepage";
import Login from "./Login";
import PlanView from "./PlanView";
import PrivateRoute from "./PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";
import Dashboard from "./Dashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import { useState } from "react";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [role, setRole] = useState(() => {
    getRoleFromJwt();
  });

  function getRoleFromJwt() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
      console.log(decodedJwt);
      return decodedJwt.authorities;
    }
    return;
  }

  /*  */

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/plans"
        element={
          <PrivateRoute>
            <PlanDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/plans/:id"
        element={
          <PrivateRoute>
            <PlanView />
          </PrivateRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
