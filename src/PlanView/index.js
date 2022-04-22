import React, { useEffect, useState } from "react";
import fetchCall from "../services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const PlanView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const planNumber = window.location.href.split("/plans/")[1];
  const [plan, setPlan] = useState({
    subgroup: "",
    policyNumber: "",
    groupNumber: "",
  });

  function updatePlan(prop, value) {
    const newPlan = { ...plan }; //duplicates original and creates 'copy'
    newPlan[prop] = value;
    setPlan(newPlan); //updates the view
  }

  function save() {
    fetchCall("PUT", `/api/plans/${planNumber}`, jwt, plan).then((planData) => {
      setPlan(planData);
      console.log(planData);
    });
  }

  useEffect(() => {
    fetchCall("GET", `/api/plans/${planNumber}`, jwt).then((planData) => {
      if (planData.subgroup === null) planData.subgroup = "";
      if (planData.policyNumber === null) planData.policyNumber = "";
      if (planData.groupNumber === null) planData.groupNumber = "";
      setPlan(planData);
    });
  }, []);

  return (
    <div>
      <h1>Plan Number: {planNumber}</h1>
      {plan ? (
        <>
          <h3>
            Plan Subgroup:
            <input
              type="text"
              id="subgroup"
              onChange={(e) => updatePlan("subgroup", e.target.value)}
              value={plan.subgroup}
            ></input>
          </h3>
          <h3>
            Policy #:
            <input
              type="text"
              id="policyNumber"
              onChange={(e) => updatePlan("policyNumber", e.target.value)}
              value={plan.policyNumber}
            ></input>
          </h3>
          <h3>
            Group #:
            <input
              type="text"
              id="groupNumber"
              onChange={(e) => updatePlan("groupNumber", e.target.value)}
              value={plan.groupNumber}
            ></input>
          </h3>
          <button onClick={() => save()}>Save</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlanView;
