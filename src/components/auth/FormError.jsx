
import React from 'react';

const FormError = ({ message }) => {
  if (!message) return null;
  
  return (
    <p className="input-error">
      {message}
    </p>
  );
};

export default FormError;
