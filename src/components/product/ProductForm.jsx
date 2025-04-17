
import React, { useState } from 'react';
import FormField from './FormField';
import ImagePreview from './ImagePreview';

const ProductForm = ({ theme, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });
  
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  
  const categories = ['Electronics', 'Fashion', 'Vehicles', 'Real Estate', 'Furniture', 'Jobs'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
      
      // Clear error for this field
      if (errors.image) {
        setErrors({
          ...errors,
          image: '',
        });
      }
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid number greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
    }
    
    if (!formData.image) {
      newErrors.image = 'Product image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        previewUrl
      });
    }
  };
  
  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
    }}>
      <form onSubmit={handleSubmit}>
        <FormField label="Product Title" id="title" error={errors.title}>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Samsung Galaxy S21"
          />
        </FormField>
        
        <FormField label="Price (NGN)" id="price" error={errors.price}>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., 150000"
          />
        </FormField>
        
        <FormField label="Category" id="category" error={errors.category}>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </FormField>
        
        <FormField label="Description" id="description" error={errors.description}>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your product in detail..."
            rows={5}
            style={{ resize: 'vertical' }}
          ></textarea>
        </FormField>
        
        <FormField label="Product Image" id="image" error={errors.image}>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: theme === 'light' ? '#f5f5f5' : '#252525',
              borderRadius: '8px',
              border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
            }}
          />
          <ImagePreview previewUrl={previewUrl} theme={theme} />
        </FormField>
        
        <button 
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
