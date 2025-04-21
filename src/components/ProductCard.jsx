
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { formatPrice } from '../data/products';
import { MapPin } from 'lucide-react';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="product-card animate-fade-in">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="product-image"
        />
      </Link>
      
      <div className="product-content">
        <Link 
          to={`/product/${product.id}`} 
          className="product-title"
        >
          <h3 className="animate-text-reveal">{product.title}</h3>
        </Link>
        
        <p className="product-price animate-fade-in delay-100">
          {formatPrice(product.price)}
        </p>
        
        <div className="product-meta animate-fade-in delay-200">
          <span>{product.category}</span>
          <span className="product-location">
            <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {product.seller.location}
          </span>
        </div>
        
        {product.isUserProduct && (
          <div className="product-tag animate-fade-in delay-300">
            Your Post
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
