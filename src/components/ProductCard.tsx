
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { formatPrice } from '../data/products';

interface ProductSeller {
  id: number;
  name: string;
  location: string;
  phone: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  seller: ProductSeller;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </Link>
      
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Link 
          to={`/product/${product.id}`} 
          style={{ 
            textDecoration: 'none',
            color: theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
          }}
        >
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}>
            {product.title}
          </h3>
        </Link>
        
        <p style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold',
          color: 'var(--accent)',
          marginBottom: '0.5rem',
        }}>
          {formatPrice(product.price)}
        </p>
        
        <div style={{ 
          marginTop: 'auto',
          fontSize: '0.9rem',
          color: theme === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{product.category}</span>
          <span>{product.seller.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
