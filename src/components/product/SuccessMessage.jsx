
import React from 'react';

const SuccessMessage = () => {
  return (
    <div style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '2rem',
    }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Product Posted Successfully!
      </h3>
      <p>Your product has been posted and will be redirected to products page.</p>
    </div>
  );
};

export default SuccessMessage;
