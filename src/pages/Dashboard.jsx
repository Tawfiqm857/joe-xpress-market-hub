
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../data/products';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { userProducts, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('products');
  
  // Mock statistics data
  const stats = {
    views: 523,
    enquiries: 32,
    products: userProducts.length
  };
  
  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        deleteProduct(productId);
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete the product. Please try again.');
      }
    }
  };
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title">Seller Dashboard</h1>
        
        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
          }}>
            <p style={{ color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}>Total Views</p>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{stats.views}</h2>
          </div>
          
          <div style={{
            backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
          }}>
            <p style={{ color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}>Product Enquiries</p>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{stats.enquiries}</h2>
          </div>
          
          <div style={{
            backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
          }}>
            <p style={{ color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}>Active Products</p>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{stats.products}</h2>
          </div>
        </div>
        
        {/* Tab navigation */}
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
        
        {/* Tab content */}
        {activeTab === 'products' && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '1.5rem',
            }}>
              <Link to="/post-product" className="btn btn-primary">
                + Add New Product
              </Link>
            </div>
            
            {userProducts.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.95rem',
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: theme === 'light' ? '#f5f5f5' : '#252525',
                      textAlign: 'left',
                    }}>
                      <th style={{ padding: '1rem', borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}` }}>Product</th>
                      <th style={{ padding: '1rem', borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}` }}>Price</th>
                      <th style={{ padding: '1rem', borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}` }}>Category</th>
                      <th style={{ padding: '1rem', borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}` }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProducts.map(product => (
                      <tr key={product.id} style={{
                        borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
                      }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img 
                              src={product.image} 
                              alt={product.title}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                              }}
                            />
                            <span>{product.title}</span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>{formatPrice(product.price)}</td>
                        <td style={{ padding: '1rem' }}>{product.category}</td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link 
                              to={`/product/${product.id}`}
                              style={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                              }}
                            >
                              View
                            </Link>
                            <button 
                              style={{
                                backgroundColor: '#f44336',
                                color: 'white',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                              }}
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem 1rem',
                borderRadius: '8px',
                backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
              }}>
                <h3 style={{ marginBottom: '1rem' }}>No products yet</h3>
                <p style={{ marginBottom: '1.5rem' }}>Start selling by posting your first product.</p>
                <Link to="/post-product" className="btn btn-primary">
                  Post a Product
                </Link>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'messages' && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem',
            borderRadius: '8px',
            backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
          }}>
            <h3 style={{ marginBottom: '1rem' }}>No messages yet</h3>
            <p>When buyers contact you about your products, their messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
