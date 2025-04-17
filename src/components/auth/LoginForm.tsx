
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormInput from './FormInput';
import { Button } from '@/components/ui/button';
import FormError from './FormError';

interface LoginFormProps {
  theme: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ theme }) => {
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    // Clear login error when user makes changes
    if (loginError) {
      setLoginError('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await login(formData.email, formData.password);
        if (!result.success) {
          setLoginError(result.error || 'Invalid email or password');
        }
        // If successful, useEffect will handle redirect
      } catch (err: any) {
        setLoginError(err.message || 'An unexpected error occurred');
        console.error('Login submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div style={{
      maxWidth: '450px',
      margin: '0 auto',
      backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
    }}>
      {(authError || loginError) && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#f44336',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          {loginError || authError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          error={formErrors.email}
        />
        
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          error={formErrors.password}
        />
        
        <Button 
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p>Don't have an account? <Link to="/register" className="text-primary no-underline">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
