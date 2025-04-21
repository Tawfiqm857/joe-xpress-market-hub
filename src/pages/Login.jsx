
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import '../styles/main.css';
import '../styles/auth.css';

const Login = () => {
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
        <h1 className="page-title animate-fade-in">Login to Your Account</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
