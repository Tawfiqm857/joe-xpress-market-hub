
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import '../styles/main.css';
import '../styles/auth.css';

const Register = () => {
  const { theme } = React.useContext(ThemeContext);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className={`${theme}-mode`}>
      <div className="container section">
        <h1 className="page-title animate-fade-in">Create an Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
