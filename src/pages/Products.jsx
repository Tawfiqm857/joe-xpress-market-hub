
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import '../styles/main.css';
import '../styles/product.css';

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const { products, userProducts, isLoaded } = useProducts();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyProducts, setShowMyProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Filter products based on search query, selected category, and my products filter
  useEffect(() => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    let result = showMyProducts ? userProducts : products;
    
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
    setIsLoading(false);
  }, [searchQuery, selectedCategory, products, userProducts, showMyProducts, isLoaded]);
  
  const categories = ['All', 'Electronics', 'Fashion', 'Vehicles', 'Real Estate', 'Furniture', 'Jobs'];
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title animate-fade-in">Browse Products</h1>
        
        <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
          <SearchBar />
        </div>
        
        <div className="filters-container">
          <div className="product-categories animate-slide-left">
            <span style={{ marginRight: '1rem', fontWeight: '500' }}>Categories:</span>
            {categories.map((category, index) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button ${selectedCategory === category ? 'active' : ''} delay-${index * 100}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {isAuthenticated && (
            <label className="my-products-toggle animate-slide-right">
              <input 
                type="checkbox" 
                checked={showMyProducts} 
                onChange={() => setShowMyProducts(!showMyProducts)} 
              />
              Show only my products
            </label>
          )}
        </div>
        
        {isLoading ? (
          <div className="loading-container animate-fade-in">
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={`${product.id}-${index}`} 
                product={product} 
                className={`delay-${(index % 8) * 100}`}
              />
            ))}
          </div>
        ) : (
          <div className="no-products animate-fade-in">
            <h3 className="empty-title">No products found</h3>
            <p>Try changing your search criteria or check back later for new listings.</p>
            {isAuthenticated && (
              <button 
                className="btn btn-primary mt-4"
                onClick={() => navigate('/post-product')}
              >
                Add Your First Product
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
