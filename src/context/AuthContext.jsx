
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

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

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        currentUser.getIdToken().then(idToken => {
          setToken(idToken);
          setUser({
            id: currentUser.uid,
            name: currentUser.displayName || 'User',
            email: currentUser.email,
            profilePicture: currentUser.photoURL,
            // Add other user properties as needed
          });
          console.log('User authenticated from Firebase');
        });
      } else {
        // User is signed out
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will handle setting the user state
      
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
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await firebaseUpdateProfile(userCredential.user, {
        displayName: name,
      });
      
      // The onAuthStateChanged listener will handle setting the user state
      
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
  const updateProfile = async (profileData) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is logged in');
      }
      
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: profileData.name || auth.currentUser.displayName,
        photoURL: profileData.profilePicture || auth.currentUser.photoURL
      });
      
      // Update additional user data if needed
      // This would be stored in Firestore in a complete implementation
      
      // Update local state
      setUser(prev => ({
        ...prev,
        name: profileData.name || prev.name,
        profilePicture: profileData.profilePicture || prev.profilePicture,
        location: profileData.location || prev.location,
        phone: profileData.phone || prev.phone,
        socials: profileData.socials || prev.socials
      }));
      
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error(err.message || 'Failed to update profile');
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      toast.info('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Failed to logout');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
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
