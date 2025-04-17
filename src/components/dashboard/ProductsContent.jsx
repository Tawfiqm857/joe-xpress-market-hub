
import React from 'react';
import { Link } from 'react-router-dom';
import ProductTable from './ProductTable';
import EmptyState from './EmptyState';

const ProductsContent = ({ products, onDeleteProduct }) => {
  return (
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
    </>
  );
};

export default ProductsContent;
