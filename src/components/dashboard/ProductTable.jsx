
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { formatPrice } from '../../data/products';
import { Eye, Trash } from 'lucide-react';
import '../../styles/dashboard.css';

const ProductTable = ({ products, onDelete }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{ overflowX: 'auto' }} className="animate-fade-in">
      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={`animate-slide-right delay-${(index % 5) * 100}`}>
              <td>
                <div className="product-media">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="table-image"
                  />
                  <span>{product.title}</span>
                </div>
              </td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.category}</td>
              <td>
                <div className="table-actions">
                  <Link 
                    to={`/product/${product.id}`}
                    className="btn-view"
                  >
                    <Eye size={16} />
                  </Link>
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash size={16} />
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
