
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from './SearchBar';
import { ArrowRight, Star, Users, Shield } from 'lucide-react';

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{
      backgroundImage: `linear-gradient(135deg, rgba(0, 31, 63, 0.9), rgba(0, 31, 63, 0.7)), url('https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '8rem 1rem 6rem',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 102, 0, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          opacity: 0.9,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Star fill="var(--accent)" color="var(--accent)" size={16} />
            <span>4.8/5 Rating</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Users color="var(--accent)" size={16} />
            <span>50,000+ Users</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Shield color="var(--accent)" size={16} />
            <span>100% Secure</span>
          </div>
        </div>

        {/* Main heading with improved typography */}
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          fontWeight: '800',
          marginBottom: '2rem',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}>
          Buy & Sell in Nigeria
        </h1>

        {/* Enhanced subtitle */}
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
          maxWidth: '900px', 
          margin: '0 auto 3rem auto',
          lineHeight: 1.7,
          opacity: 0.95,
          fontWeight: '400',
        }}>
          Your trusted marketplace for finding the best deals and connecting with buyers all over Nigeria. 
          <span style={{ display: 'block', marginTop: '0.5rem', color: 'var(--accent)', fontWeight: '500' }}>
            Join thousands of happy users today!
          </span>
        </p>
        
        {/* Enhanced search bar container */}
        <div style={{ 
          marginBottom: '3rem', 
          maxWidth: '800px', 
          margin: '0 auto 3rem auto',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}>
          <SearchBar />
        </div>
        
        {/* Improved action buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.5rem', 
          flexWrap: 'wrap',
          marginBottom: '4rem',
        }}>
          <Link to="/products" style={{ 
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '3rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            boxShadow: '0 8px 25px rgba(255, 102, 0, 0.3)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '2px solid transparent',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 102, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 102, 0, 0.3)';
          }}>
            Browse Products
            <ArrowRight size={18} />
          </Link>
          
          <Link to="/post-product" style={{ 
            backgroundColor: 'transparent',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '3rem',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Sell Something
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Quick stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          opacity: 0.9,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              10K+
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Active Listings</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              50K+
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Happy Customers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              24/7
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
