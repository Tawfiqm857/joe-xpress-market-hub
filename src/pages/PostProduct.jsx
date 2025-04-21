
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/product/ProductForm';
import SuccessMessage from '../components/product/SuccessMessage';
import '../styles/main.css';
import '../styles/product.css';

const PostProduct = () => {
  const { theme } = useContext(ThemeContext);
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (formData) => {
    setIsSubmitting(true);
    
    const newProduct = {
      id: Date.now(),
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.previewUrl,
      seller: {
        id: user?.id || 'anonymous',
        name: user?.name || 'Anonymous',
        location: user?.location || 'Lagos, Nigeria',
        phone: user?.phone || '+234 123 456 7890'
      },
      isUserProduct: true
    };
    
    // Add product to context
    addProduct(newProduct);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to products page after delay
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title animate-fade-in">Post a Product</h1>
        
        {isSuccess ? (
          <SuccessMessage />
        ) : (
          <ProductForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        )}
      </div>
    </div>
  );
};

export default PostProduct;
