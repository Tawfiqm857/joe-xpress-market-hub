
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{
      display: 'flex',
      maxWidth: '100%',
      position: 'relative',
    }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What are you looking for?"
        style={{
          flex: 1,
          padding: '1rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '2rem',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
	color: 'darkblue'
        }}
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'var(--accent)',
          color: 'darkblue',
          border: 'none',
          borderRadius: '1.5rem',
          padding: '0.5rem 1.5rem',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
