
import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ContactModal from '../components/ContactModal';
import products, { formatPrice } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Find the product based on the ID
  const product = products.find(p => p.id === Number(id));
  
  // If product not found, display a message
  if (!product) {
    return (
      <div className={`${theme}-mode container section`} style={{ textAlign: 'center' }}>
        <h2 className="page-title">Product Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }
  
  // Similar products (excluding the current one)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <button 
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2rem',
            padding: 0,
          }}
        >
          ← Back
        </button>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              <div style={{ padding: '1.5rem' }}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    aspectRatio: '4 / 3',
                  }}
                />
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <h1 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
                }}>
                  {product.title}
                </h1>
                
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  color: 'var(--accent)',
                  marginBottom: '1.5rem',
                }}>
                  {formatPrice(product.price)}
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
                }}>
                  <span>Category: {product.category}</span>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                  }}>
                    Description
                  </h3>
                  <p style={{ lineHeight: '1.6' }}>{product.description}</p>
                </div>
                
                <div style={{ 
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: theme === 'light' ? '#f5f5f5' : '#252525',
                  marginBottom: '1.5rem',
                }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                  }}>
                    Seller Information
                  </h3>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> {product.seller.name}</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {product.seller.location}</p>
                </div>
                
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="btn btn-accent"
                  style={{ width: '100%' }}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
            }}>
              Similar Products
            </h2>
            
            <div className="grid">
              {similarProducts.map(similarProduct => (
                <Link 
                  key={similarProduct.id}
                  to={`/product/${similarProduct.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}>
                    <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden' }}>
                      <img 
                        src={similarProduct.image} 
                        alt={similarProduct.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
                      }}>
                        {similarProduct.title}
                      </h3>
                      <p style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold',
                        color: 'var(--accent)',
                      }}>
                        {formatPrice(similarProduct.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        seller={product.seller}
      />
    </div>
  );
};

export default ProductDetail;
