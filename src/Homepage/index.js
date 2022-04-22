import React from "react";

const Homepage = () => {
  return (
    <div>
      <h1>This is the homepage</h1>
      <h2>Click below to login</h2>
      <button
        onClick={() => {
          window.location.href = "login";
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Homepage;
