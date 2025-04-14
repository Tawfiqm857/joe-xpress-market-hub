
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import products from '../data/products';

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract search and category params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);
  
  // Filter products based on search query and selected category
  useEffect(() => {
    let result = products;
    
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(product => 
        product.category === selectedCategory
      );
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory]);
  
  const categories = ['All', 'Electronics', 'Fashion', 'Vehicles', 'Real Estate', 'Furniture'];
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title">Browse Products</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <SearchBar />
        </div>
        
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
        }}>
          <span style={{ marginRight: '1rem', fontWeight: '500' }}>Categories:</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  border: 'none',
                  backgroundColor: selectedCategory === category 
                    ? 'var(--accent)' 
                    : theme === 'light' ? '#e0e0e0' : '#333',
                  color: selectedCategory === category 
                    ? 'white' 
                    : theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem',
            borderRadius: '8px',
            backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>No products found</h3>
            <p>Try changing your search criteria or check back later for new listings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
