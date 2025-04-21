
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormInput from './FormInput';
import FormError from './FormError';
import { User, Lock } from 'lucide-react';
import '../../styles/auth.css';
import { ThemeContext } from '../../context/ThemeContext';

const LoginForm = () => {
  const { theme } = React.useContext(ThemeContext);
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
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
    // Clear login error when user makes changes
    if (loginError) {
      setLoginError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await login(formData.email, formData.password);
        if (!result.success) {
          setLoginError(result.error || 'Invalid email or password');
        }
        // If successful, useEffect will handle redirect
      } catch (err) {
        setLoginError(err.message || 'An unexpected error occurred');
        console.error('Login submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="auth-container animate-fade-in">
      {(authError || loginError) && (
        <div className="auth-error animate-slide-left">
          {loginError || authError}
        </div>
      )}
      
      <h2 className="auth-title animate-fade-in">Welcome Back</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group animate-slide-right delay-100">
          <label htmlFor="email" className="form-label">
            <User size={18} style={{ display: 'inline', marginRight: '8px' }} />
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
        
        <div className="form-group animate-slide-right delay-200">
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
            placeholder="Your password"
          />
          {formErrors.password && <div className="input-error">{formErrors.password}</div>}
        </div>
        
        <button 
          type="submit"
          className="auth-submit animate-fade-in delay-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="auth-alt animate-fade-in delay-400">
        <p>Don't have an account? <Link to="/register" className="auth-link">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
