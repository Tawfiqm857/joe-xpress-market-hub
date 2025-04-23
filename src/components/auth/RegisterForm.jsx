
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { User, Mail, Lock, KeyRound } from 'lucide-react';
import '../../styles/auth.css';

const RegisterForm = () => {
  const { theme } = React.useContext(ThemeContext);
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      name: '', 
      email: '', 
      password: '', 
      confirmPassword: '' 
    };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    // Clear registration error when user makes changes
    if (registerError) {
      setRegisterError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await register(formData.name, formData.email, formData.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setRegisterError(result.error || 'Registration failed. Please try again.');
        }
      } catch (err) {
        setRegisterError(err.message || 'An unexpected error occurred');
        console.error('Registration submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="auth-container animate-fade-in">
      {(authError || registerError) && (
        <div className="auth-error animate-slide-left">
          {registerError || authError}
        </div>
      )}
      
      <h2 className="auth-title animate-text-reveal">Join Joe Express</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group animate-slide-right delay-100">
          <label htmlFor="name" className="form-label">
            <User size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {formErrors.name && <div className="input-error">{formErrors.name}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-200">
          <label htmlFor="email" className="form-label">
            <Mail size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
          {formErrors.email && <div className="input-error">{formErrors.email}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-300">
          <label htmlFor="password" className="form-label">
            <Lock size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a password"
          />
          {formErrors.password && <div className="input-error">{formErrors.password}</div>}
        </div>
        
        <div className="form-group animate-slide-right delay-400">
          <label htmlFor="confirmPassword" className="form-label">
            <KeyRound size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {formErrors.confirmPassword && <div className="input-error">{formErrors.confirmPassword}</div>}
        </div>
        
        <button 
          type="submit"
          className="auth-submit animate-fade-in delay-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <div className="auth-alt animate-fade-in delay-600">
        <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterForm;
