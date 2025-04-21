
import React, { useState } from 'react';
import FormField from './FormField';
import ImagePreview from './ImagePreview';
import { ThemeContext } from '../../context/ThemeContext';

const ProductForm = ({ onSubmit, isSubmitting }) => {
  const { theme } = React.useContext(ThemeContext);
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
    <div className="product-form-container animate-fade-in">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group animate-slide-right delay-100">
          <label htmlFor="title" className="form-label">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Samsung Galaxy S21"
          />
          {errors.title && <div className="input-error">{errors.title}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-200">
          <label htmlFor="price" className="form-label">Price (NGN)</label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., 150000"
          />
          {errors.price && <div className="input-error">{errors.price}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-300">
          <label htmlFor="category" className="form-label">Category</label>
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
          {errors.category && <div className="input-error">{errors.category}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-400">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your product in detail..."
            rows={5}
          ></textarea>
          {errors.description && <div className="input-error">{errors.description}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-500">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control-file"
          />
          {previewUrl && <ImagePreview previewUrl={previewUrl} theme={theme} />}
          {errors.image && <div className="input-error">{errors.image}</div>}
        </div>
        
        <button 
          type="submit"
          className="product-submit btn btn-primary animate-fade-in delay-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
