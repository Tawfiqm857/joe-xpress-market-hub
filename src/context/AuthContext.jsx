
import React, { createContext, useState, useEffect } from 'react';

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

  // Login function - will connect to backend later
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll simulate a successful login with mock data
      // In a real app, this would be an API call to your backend
      const mockUser = { id: '123', name: 'Test User', email };
      const mockToken = 'mock-jwt-token';
      
      // Store in localStorage
      localStorage.setItem('joeXpressToken', mockToken);
      localStorage.setItem('joeXpressUser', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setToken(mockToken);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, simulate a successful registration
      const mockUser = { id: '123', name, email };
      const mockToken = 'mock-jwt-token';
      
      // Store in localStorage
      localStorage.setItem('joeXpressToken', mockToken);
      localStorage.setItem('joeXpressUser', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setToken(mockToken);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
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
