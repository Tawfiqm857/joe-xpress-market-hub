
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const EmptyState = ({ type, message, actionText, actionLink }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '3rem 1rem',
      borderRadius: '8px',
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
    }}>
      <h3 style={{ marginBottom: '1rem' }}>{`No ${type} yet`}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
