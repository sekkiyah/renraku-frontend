//import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PlanView from "./PlanView";
import PrivateRoute from "./PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

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
