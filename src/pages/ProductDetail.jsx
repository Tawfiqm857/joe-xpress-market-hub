
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../data/products';

const ProductDetail = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const { getProductById } = useProducts();
  
  const product = getProductById(id);
  
  if (!product) {
    return (
      <div className={`${theme}-mode`}>
        <div className="container section">
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem',
            borderRadius: '8px',
            backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
            marginTop: '2rem',
          }}>
            <h2 style={{ marginBottom: '1rem' }}>Product Not Found</h2>
            <p style={{ marginBottom: '1.5rem' }}>The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link 
            to="/products" 
            style={{ 
              color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
              textDecoration: 'none',
              opacity: 0.7,
            }}
          >
            Products
          </Link>
          <span style={{ margin: '0 0.5rem', opacity: 0.7 }}>/</span>
          <span style={{ opacity: 0.7 }}>{product.category}</span>
          <span style={{ margin: '0 0.5rem', opacity: 0.7 }}>/</span>
          <span>{product.title}</span>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '2rem',
          '@media (min-width: 768px)': {
            gridTemplateColumns: '1fr 1fr',
          }
        }}>
          {/* Product Image */}
          <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}>
              {product.title}
            </h1>
            
            <p style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              color: 'var(--accent)',
              marginBottom: '1.5rem',
            }}>
              {formatPrice(product.price)}
            </p>
            
            {product.isUserProduct && (
              <div style={{ 
                marginBottom: '1rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                display: 'inline-block',
              }}>
                Your Post
              </div>
            )}
            
            <div style={{
              padding: '1rem',
              backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}>
              <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Seller Information
              </h3>
              <p style={{ marginBottom: '0.25rem' }}>
                <strong>Name:</strong> {product.seller.name}
              </p>
              <p style={{ marginBottom: '0.25rem' }}>
                <strong>Location:</strong> {product.seller.location}
              </p>
              <p>
                <strong>Contact:</strong> {product.seller.phone}
              </p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Description
              </h3>
              <p style={{ lineHeight: 1.6 }}>
                {product.description}
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
            }}>
              <Link 
                to="/products" 
                className="btn"
                style={{
                  flex: 1,
                  textAlign: 'center',
                }}
              >
                Back to Products
              </Link>
              
              {!product.isUserProduct && (
                <button 
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                  }}
                  onClick={() => alert('Contact feature not yet implemented')}
                >
                  Contact Seller
                </button>
              )}
              
              {product.isUserProduct && (
                <Link 
                  to="/dashboard" 
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  Manage Your Products
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products Placeholder */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>You might also like</h2>
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
            borderRadius: '8px',
          }}>
            <p>Related products coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
