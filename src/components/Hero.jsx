import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from './SearchBar';

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 31, 63, 0.8), rgba(0, 31, 63, 0.8)), url('https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '6rem 1rem',
      color: 'white',
      textAlign: 'center',
    }}>
      <div className="container">
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          fontWeight: 'bold',
          marginBottom: '1.5rem',
        }}>
          Buy & Sell in Nigeria
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
          maxWidth: '800px', 
          margin: '0 auto 2rem auto',
          lineHeight: 1.6,
        }}>
          Your trusted marketplace for finding the best deals and connecting with buyers all over Nigeria. Join thousands of happy users today!
        </p>
        
        <div style={{ marginBottom: '2rem', maxWidth: '700px', margin: '0 auto' }}>
          <SearchBar />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/products" style={{ 
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}>
            Browse Products
          </Link>
          <Link to="/post-product" style={{ 
            backgroundColor: 'white',
            color: 'var(--primary)',
            padding: '0.75rem 2rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}>
            Sell Something
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;