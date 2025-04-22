import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
        }}
      >
        404 - Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
