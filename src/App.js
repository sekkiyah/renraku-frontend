import { Routes, Route } from "react-router-dom";
import "./App.css";
import PlanDashboard from "./PlanDashboard";
import jwt_decode from "jwt-decode";
import Homepage from "./Homepage";
import Login from "./Login";
import PlanView from "./PlanView";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import { useEffect, useState } from "react";
import { useUser } from "./UserProvider";

function App() {
  const user = useUser();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    setRoles(getRolesFromJwt());
  }, [user.jwt]);

  function getRolesFromJwt() {
    if (user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      //console.log("JWT DECODED: ", decodedJwt);
      return decodedJwt.authorities;
    }
    return [];
  }

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
