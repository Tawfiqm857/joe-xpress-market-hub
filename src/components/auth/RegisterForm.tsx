
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormInput from './FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import FormError from './FormError';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  theme: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ theme }) => {
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    // Clear registration error when user makes changes
    if (registerError) {
      setRegisterError('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await register(formData.name, formData.email, formData.password);
        if (!result.success) {
          setRegisterError(result.error || 'Registration failed. Please try again.');
        }
        // If successful, useEffect will handle redirect
      } catch (err: any) {
        setRegisterError(err.message || 'An unexpected error occurred');
        console.error('Registration submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <Card className="mx-auto max-w-md" style={{
      backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
      border: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333333'}`,
    }}>
      <CardHeader>
        <CardTitle className="text-center">Create an Account</CardTitle>
      </CardHeader>
      
      <CardContent>
        {(authError || registerError) && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {registerError || authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormInput
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={formErrors.name}
          />
          
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
            placeholder="Choose a password"
            error={formErrors.password}
          />
          
          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={formErrors.confirmPassword}
          />
          
          <Button 
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <p>Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
