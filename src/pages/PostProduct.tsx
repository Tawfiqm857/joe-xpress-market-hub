
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

interface FormData {
  title: string;
  price: string;
  category: string;
  description: string;
  image: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const PostProduct: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const categories = ['Electronics', 'Fashion', 'Vehicles', 'Real Estate', 'Furniture', 'Jobs'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: FormErrors = {};
    
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // In a real app, this would be an API call to save the product
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form
        setFormData({
          title: '',
          price: '',
          category: '',
          description: '',
          image: null,
        });
        setPreviewUrl('');
        
        // Redirect to products page after delay
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      }, 1500);
    }
  };
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title">Post a Product</h1>
        
        {isSuccess ? (
          <div style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Product Posted Successfully!
            </h3>
            <p>Your product has been posted and will be redirected to products page.</p>
          </div>
        ) : (
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
              <div className="form-group">
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
                {errors.title && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.title}</p>}
              </div>
              
              <div className="form-group">
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
                {errors.price && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.price}</p>}
              </div>
              
              <div className="form-group">
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
                {errors.category && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.category}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
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
                {errors.description && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.description}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="image" className="form-label">Product Image</label>
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
                {errors.image && <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.image}</p>}
                
                {previewUrl && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Image Preview:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
                      }}
                    />
                  </div>
                )}
              </div>
              
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
        )}
      </div>
    </div>
  );
};

export default PostProduct;
