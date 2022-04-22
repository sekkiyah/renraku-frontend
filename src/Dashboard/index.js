import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchCall from "../services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    fetchCall("GET", `/api/plans`, jwt).then((planData) => {
      setPlans(planData);
    });
  }, []);

  function createPlan() {
    fetchCall("POST", `/api/plans`, jwt).then((plan) => {
      console.log(plan);
      //window.location.href = `/plans/${plan.planNumber}`; Redirect to page
    });
  }

  return (
    <>
      <div style={{ margin: "2em" }}>
        {plans ? (
          plans.map((plan) => (
            <div key={plan.planNumber}>
              <Link to={`/plans/${plan.planNumber}`}>
                Plan Number: {plan.planNumber}
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
        <button onClick={() => createPlan()}>Add Plan</button>
      </div>
      <div>Jwt token is {jwt}</div>
    </>
  );
};

export default Dashboard;
