
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { formatPrice } from '../../data/products';

const ProductTable = ({ products, onDelete }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
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
          {products.map(product => (
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
                    onClick={() => onDelete(product.id)}
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
  );
};

export default ProductTable;
