
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
      marginBottom: '2rem',
    }}>
      <button 
        onClick={() => setActiveTab('products')}
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: activeTab === 'products' 
            ? `2px solid var(--accent)` 
            : 'none',
          color: activeTab === 'products' 
            ? 'var(--accent)' 
            : theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
          fontWeight: activeTab === 'products' ? 'bold' : 'normal',
          cursor: 'pointer',
        }}
      >
        My Products
      </button>
      
      <button 
        onClick={() => setActiveTab('messages')}
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: activeTab === 'messages' 
            ? `2px solid var(--accent)` 
            : 'none',
          color: activeTab === 'messages' 
            ? 'var(--accent)' 
            : theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
          fontWeight: activeTab === 'messages' ? 'bold' : 'normal',
          cursor: 'pointer',
        }}
      >
        Messages
      </button>
    </div>
  );
};

export default TabNavigation;
