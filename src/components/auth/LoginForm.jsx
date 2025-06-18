
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, AlertCircle } from 'lucide-react';
import '../../styles/auth.css';
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from 'sonner';

const LoginForm = ({ redirectPath = '/dashboard' }) => {
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
  
  // Clear auth error when component mounts or unmounts
  useEffect(() => {
    return () => setLoginError('');
  }, []);
  
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
        if (result.success) {
          // Show success toast and redirect
          toast.success('Login successful! Welcome back.');
          // Redirect to the requested page after successful login
          navigate(redirectPath, { replace: true });
        } else {
          setLoginError(result.error || 'Invalid email or password');
          toast.error(result.error || 'Invalid email or password');
        }
      } catch (err) {
        setLoginError(err.message || 'An unexpected error occurred');
        toast.error(err.message || 'An unexpected error occurred');
        console.error('Login submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Show validation errors toast
      toast.error('Please fix the errors in the form');
    }
  };
  
  return (
    <div className="auth-container animate-fade-in">
      {(authError || loginError) && (
        <div className="auth-error animate-slide-left flex items-center">
          <AlertCircle size={18} className="mr-2" />
          {loginError || authError}
        </div>
      )}
      
      <h2 className="auth-title animate-text-reveal">Welcome Back</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group animate-slide-right delay-100">
          <label htmlFor="email" className="form-label">
            <User size={18} className="inline mr-2" />
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
            <Lock size={18} className="inline mr-2" />
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
