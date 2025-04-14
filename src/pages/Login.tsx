
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { theme } = React.useContext(ThemeContext);
  const { login, isAuthenticated, error } = useAuth();
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
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await login(formData.email, formData.password);
        // If successful, useEffect will handle redirect
      } catch (err) {
        console.error('Login submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title">Login to Your Account</h1>
        
        <div style={{
          maxWidth: '450px',
          margin: '0 auto',
          backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
        }}>
          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#f44336',
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
              {formErrors.email && (
                <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  {formErrors.email}
                </p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
              />
              {formErrors.password && (
                <p style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  {formErrors.password}
                </p>
              )}
            </div>
            
            <button 
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p>Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
