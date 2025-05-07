
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Create the context with a default value
export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: () => {},
  error: null
});

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('joeXpressToken');
        const storedUser = localStorage.getItem('joeXpressUser');
        
        if (storedToken && storedUser) {
          // Verify token validity (in a real app, this would make an API call)
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          console.log('User authenticated from stored session');
        }
      } catch (error) {
        console.error('Session verification error:', error);
        // Clear invalid session data
        localStorage.removeItem('joeXpressToken');
        localStorage.removeItem('joeXpressUser');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
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
        email: matchedUser.email,
        profilePicture: matchedUser.profilePicture || null,
        location: matchedUser.location || null,
        phone: matchedUser.phone || null,
        socials: matchedUser.socials || {}
      };
      
      // Store in localStorage
      const mockToken = `user-token-${Date.now()}`;
      localStorage.setItem('joeXpressToken', mockToken);
      localStorage.setItem('joeXpressUser', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      setToken(mockToken);
      toast.success('Login successful!');
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
      toast.error(err.message || 'Login failed');
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
        password, // Store password for login verification
        profilePicture: null,
        location: null,
        phone: null,
        socials: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        }
      };
      
      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem('joeXpressUsers', JSON.stringify(registeredUsers));
      
      // Create user object without password
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        location: newUser.location,
        phone: newUser.phone,
        socials: newUser.socials
      };
      
      // Store in localStorage for current session
      const mockToken = `user-token-${Date.now()}`;
      localStorage.setItem('joeXpressToken', mockToken);
      localStorage.setItem('joeXpressUser', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      setToken(mockToken);
      toast.success('Registration successful!');
      return { success: true };
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
      toast.error(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = (profileData) => {
    try {
      if (!user) {
        throw new Error('No user is logged in');
      }
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('joeXpressUsers') || '[]');
      
      // Find current user
      const currentUserIndex = registeredUsers.findIndex(u => u.id === user.id);
      
      if (currentUserIndex === -1) {
        throw new Error('User not found');
      }
      
      // Update user data, preserving password
      const updatedUser = {
        ...registeredUsers[currentUserIndex],
        name: profileData.name || registeredUsers[currentUserIndex].name,
        profilePicture: profileData.profilePicture || registeredUsers[currentUserIndex].profilePicture,
        location: profileData.location || registeredUsers[currentUserIndex].location,
        phone: profileData.phone || registeredUsers[currentUserIndex].phone,
        socials: profileData.socials || registeredUsers[currentUserIndex].socials
      };
      
      // Update in registered users
      registeredUsers[currentUserIndex] = updatedUser;
      localStorage.setItem('joeXpressUsers', JSON.stringify(registeredUsers));
      
      // Create user object without password
      const userWithoutPassword = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        location: updatedUser.location,
        phone: updatedUser.phone,
        socials: updatedUser.socials
      };
      
      // Update current user session
      localStorage.setItem('joeXpressUser', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error(err.message || 'Failed to update profile');
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('joeXpressToken');
    localStorage.removeItem('joeXpressUser');
    setUser(null);
    setToken(null);
    toast.info('Logged out successfully');
    navigate('/login');
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
        updateProfile,
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
