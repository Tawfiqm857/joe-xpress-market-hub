import React from "react";

const FormError = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        color: "red",
        fontSize: "0.875rem",
        marginTop: "0.25rem",
      }}
    >
      {message}
    </div>
  );
};

export default FormError;
