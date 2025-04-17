
import React from 'react';

const FormField = ({ label, id, error, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      {children}
      {error && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
    </div>
  );
};

export default FormField;
