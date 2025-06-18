
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
    <div className={`${theme}-mode min-h-screen`}>
      <div className="container py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 animate-fade-in">
            Browse Products
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
            Discover amazing products from verified sellers across Nigeria
          </p>
        </div>
        
        <div className="mb-10 animate-fade-in delay-200">
          <SearchBar />
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="animate-slide-left">
            <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-accent text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="animate-slide-right">
              <label className="flex items-center gap-3 cursor-pointer bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
                <input 
                  type="checkbox" 
                  checked={showMyProducts} 
                  onChange={() => setShowMyProducts(!showMyProducts)}
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm md:text-base font-medium text-gray-700">Show only my products</span>
              </label>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={`${product.id}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index % 12) * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">No products found</h3>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Try adjusting your search criteria or explore different categories
              </p>
              {isAuthenticated && (
                <button 
                  className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={() => navigate('/post-product')}
                >
                  Add Your First Product
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
