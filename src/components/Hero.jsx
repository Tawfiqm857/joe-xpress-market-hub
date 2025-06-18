
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from './SearchBar';
import { ArrowRight, Star, Users, Shield } from 'lucide-react';

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{
      backgroundImage: `linear-gradient(135deg, rgba(0, 31, 63, 0.95), rgba(102, 126, 234, 0.8)), url('https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '10rem 1rem 8rem',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Enhanced animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.15), rgba(255, 140, 0, 0.1))',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        filter: 'blur(1px)',
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(67, 56, 202, 0.1))',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        filter: 'blur(1px)',
      }}></div>
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '8%',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        filter: 'blur(0.5px)',
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Enhanced trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          opacity: 0.95,
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.75rem 1.25rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <Star fill="var(--accent)" color="var(--accent)" size={18} />
            <span style={{ fontWeight: '600' }}>4.8/5 Rating</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.75rem 1.25rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <Users color="var(--accent)" size={18} />
            <span style={{ fontWeight: '600' }}>50,000+ Users</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.75rem 1.25rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <Shield color="var(--accent)" size={18} />
            <span style={{ fontWeight: '600' }}>100% Secure</span>
          </div>
        </div>

        {/* Enhanced main heading */}
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
          fontWeight: '900',
          marginBottom: '2.5rem',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 80%, #e6f3ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.03em',
          textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
        }}>
          Buy & Sell in Nigeria
        </h1>

        {/* Enhanced subtitle with better spacing */}
        <div style={{ 
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', 
          maxWidth: '1000px', 
          margin: '0 auto 4rem auto',
          lineHeight: 1.8,
          opacity: 0.97,
          fontWeight: '400',
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Your trusted marketplace for finding the best deals and connecting with buyers all over Nigeria.
          </p>
          <p style={{ 
            color: 'var(--accent)', 
            fontWeight: '600',
            fontSize: '1.1em',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 102, 0, 0.3)',
          }}>
            ✨ Join thousands of happy users today!
          </p>
        </div>
        
        {/* Enhanced search bar container with better spacing */}
        <div style={{ 
          marginBottom: '4rem',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}>
          <SearchBar />
        </div>
        
        {/* Enhanced action buttons with better styling */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          flexWrap: 'wrap',
          marginBottom: '5rem',
        }}>
          <Link to="/products" style={{ 
            background: 'linear-gradient(135deg, var(--accent), #ff7e33)',
            color: 'white',
            padding: '1.25rem 3rem',
            borderRadius: '3rem',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.15rem',
            boxShadow: '0 10px 30px rgba(255, 102, 0, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '2px solid transparent',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 102, 0, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 102, 0, 0.4)';
          }}>
            Browse Products
            <ArrowRight size={20} />
          </Link>
          
          <Link to="/post-product" style={{ 
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            padding: '1.25rem 3rem',
            borderRadius: '3rem',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.15rem',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(15px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            position: 'relative',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Sell Something
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Enhanced quick stats with better visual design */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          maxWidth: '900px',
          margin: '0 auto',
          opacity: 0.95,
        }}>
          {[
            { number: '10K+', label: 'Active Listings', icon: '📊' },
            { number: '50K+', label: 'Happy Customers', icon: '😊' },
            { number: '24/7', label: 'Customer Support', icon: '🛡️' }
          ].map((stat, index) => (
            <div key={index} style={{ 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem 1.5rem',
              borderRadius: '1.5rem',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ 
                fontSize: '2.25rem', 
                fontWeight: 'bold', 
                color: 'var(--accent)', 
                marginBottom: '0.75rem',
                textShadow: '0 0 20px rgba(255, 102, 0, 0.3)',
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
