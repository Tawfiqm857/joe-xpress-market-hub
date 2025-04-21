
import React from 'react';
import { Link } from 'react-router-dom';
import ProductTable from './ProductTable';
import EmptyState from './EmptyState';
import { Plus } from 'lucide-react';
import '../../styles/dashboard.css';

const ProductsContent = ({ products, onDeleteProduct }) => {
  return (
    <div className="animate-fade-in">
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1.5rem',
      }}>
        <Link to="/post-product" className="btn btn-primary">
          <Plus size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Add New Product
        </Link>
      </div>
      
      {products.length > 0 ? (
        <ProductTable 
          products={products} 
          onDelete={onDeleteProduct} 
        />
      ) : (
        <EmptyState 
          type="products"
          message="Start selling by posting your first product."
          actionText="Post a Product"
          actionLink="/post-product"
        />
      )}
    </div>
  );
};

export default ProductsContent;
