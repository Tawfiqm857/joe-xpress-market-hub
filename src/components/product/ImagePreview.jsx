
import React from 'react';

const ImagePreview = ({ previewUrl, theme }) => {
  if (!previewUrl) return null;
  
  return (
    <div style={{ marginTop: '1rem' }}>
      <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Image Preview:</p>
      <img
        src={previewUrl}
        alt="Preview"
        style={{
          maxWidth: '100%',
          maxHeight: '200px',
          objectFit: 'contain',
          borderRadius: '8px',
          border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
        }}
      />
    </div>
  );
};

export default ImagePreview;
