
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const StatsCard = ({ title, value }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{
      backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
    }}>
      <p style={{ color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}>{title}</p>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{value}</h2>
    </div>
  );
};

export default StatsCard;
