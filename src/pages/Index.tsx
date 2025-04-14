
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Index: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  // Get only the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4);
  
  const categories = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Vehicles', icon: '🚗' },
    { name: 'Real Estate', icon: '🏠' },
    { name: 'Furniture', icon: '🛋️' },
    { name: 'Jobs', icon: '💼' },
  ];
  
  return (
    <div className={`${theme}-mode`}>
      <Hero />
      
      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h2 className="page-title" style={{ margin: 0 }}>Featured Products</h2>
            <Link to="/products" style={{ 
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}>
              View All →
            </Link>
          </div>
          
          <div className="grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="section" style={{ backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a' }}>
        <div className="container">
          <h2 className="page-title" style={{ textAlign: 'center' }}>Browse Categories</h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1.5rem',
          }}>
            {categories.map(category => (
              <Link 
                key={category.name}
                to={`/products?category=${category.name}`}
                style={{ 
                  textDecoration: 'none',
                  color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
                }}
              >
                <div style={{ 
                  backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
                  borderRadius: '8px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{category.icon}</div>
                  <div style={{ fontWeight: 'bold' }}>{category.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="page-title" style={{ textAlign: 'center' }}>Why Choose JoeExpress</h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                color: 'var(--accent)',
              }}>
                🔒
              </div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                marginBottom: '0.75rem',
              }}>
                Safe Transactions
              </h3>
              <p style={{ lineHeight: '1.6' }}>
                Our platform ensures your transactions are safe and secure.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                color: 'var(--accent)',
              }}>
                👥
              </div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                marginBottom: '0.75rem',
              }}>
                Verified Sellers
              </h3>
              <p style={{ lineHeight: '1.6' }}>
                All our sellers are verified to ensure quality and trust.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                color: 'var(--accent)',
              }}>
                ⚡
              </div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                marginBottom: '0.75rem',
              }}>
                Fast Delivery
              </h3>
              <p style={{ lineHeight: '1.6' }}>
                Quick and reliable delivery options across Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ 
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            marginBottom: '1.5rem',
          }}>
            Ready to Start Selling?
          </h2>
          <p style={{ 
            maxWidth: '700px', 
            margin: '0 auto 2rem auto',
            lineHeight: 1.6,
          }}>
            Join thousands of sellers on Nigeria's fastest growing marketplace. It takes less than 2 minutes to post your first item.
          </p>
          
          <Link to="/post-product" style={{ 
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}>
            Post Your Ad Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
