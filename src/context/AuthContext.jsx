
import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

// Create the context with a default value
export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('joeXpressToken');
    const storedUser = localStorage.getItem('joeXpressUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');
      
      // Find user with matching email and password
      const matchedUser = registeredUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (!matchedUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const userWithoutPassword = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email
      };
      
      // Store in localStorage
      const mockToken = `user-${Date.now()}`;
      localStorage.setItem('joeXpressToken', mockToken);
      localStorage.setItem('joeXpressUser', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      setToken(mockToken);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');
      
      // Check if email already exists
      if (registeredUsers.some(user => user.email === email)) {
        throw new Error('Email already registered');
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password // Store password for login verification
      };
      
      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem('joeXpressUsers', JSON.stringify(registeredUsers));
      
      // Create user object without password
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      // Store in localStorage for current session
      const mockToken = `user-${Date.now()}`;
      localStorage.setItem('joeXpressToken', mockToken);
      localStorage.setItem('joeXpressUser', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      setToken(mockToken);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('joeXpressToken');
    localStorage.removeItem('joeXpressUser');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        loading,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
