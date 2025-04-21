
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import defaultProducts from '../data/products';
import { toast } from 'sonner';

// Create context
export const ProductContext = createContext({
  products: [],
  userProducts: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  getProductById: () => null
});

export const ProductProvider = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState(defaultProducts);
  const [userProducts, setUserProducts] = useState([]);

  // Load any saved products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('joeXpressProducts');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts([...defaultProducts, ...parsedProducts]);
      } catch (error) {
        console.error('Error parsing saved products:', error);
      }
    }
  }, []);

  // Update userProducts whenever user or products change
  useEffect(() => {
    if (user) {
      const userProds = products.filter(product => 
        product.seller?.id === user.id || product.isUserProduct
      );
      setUserProducts(userProds);
    } else {
      setUserProducts([]);
    }
  }, [user, products]);

  // Add a new product
  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    
    // Save to localStorage (excluding default products)
    const customProducts = updatedProducts.filter(p => p.isUserProduct);
    localStorage.setItem('joeXpressProducts', JSON.stringify(customProducts));
    
    toast.success('Product added successfully!');
    return newProduct;
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    
    // Save to localStorage (excluding default products)
    const customProducts = updatedProducts.filter(p => p.isUserProduct);
    localStorage.setItem('joeXpressProducts', JSON.stringify(customProducts));
    
    toast.success('Product updated successfully!');
    return updatedProduct;
  };

  // Delete a product
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    
    // Save to localStorage (excluding default products)
    const customProducts = updatedProducts.filter(p => p.isUserProduct);
    localStorage.setItem('joeXpressProducts', JSON.stringify(customProducts));
    
    toast.success('Product deleted successfully!');
  };

  // Get a product by ID
  const getProductById = (productId) => {
    return products.find(product => product.id === parseInt(productId));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        userProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
