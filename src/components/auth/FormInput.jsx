
import React from 'react';

const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, error, icon }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {icon && <span className="input-icon">{icon}</span>}
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default FormInput;
