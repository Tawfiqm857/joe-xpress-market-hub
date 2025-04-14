
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer style={{
      backgroundColor: 'var(--primary)',
      color: 'var(--text-light)',
      padding: '3rem 0',
      marginTop: '2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}>
              Joe<span style={{ color: 'var(--accent)' }}>Express</span>
            </h3>
            <p style={{ lineHeight: '1.6' }}>
              Your trusted marketplace for buying and selling in Nigeria.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Products</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/post-product" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Sell Item</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/dashboard" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Dashboard</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Electronics</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Fashion</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Vehicles</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Real Estate</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact</h4>
            <p style={{ marginBottom: '0.5rem' }}>Email: info@joeexpress.ng</p>
            <p style={{ marginBottom: '0.5rem' }}>Phone: +234 801 234 5678</p>
            <p>Address: Lagos, Nigeria</p>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          marginTop: '2rem', 
          paddingTop: '1.5rem',
          textAlign: 'center', 
        }}>
          <p>© {new Date().getFullYear()} JoeExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
