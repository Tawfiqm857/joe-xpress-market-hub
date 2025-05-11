
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Please login to access this page');
    }
  }, [isAuthenticated, loading]);
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium animate-pulse">Verifying authentication...</p>
        <p className="text-sm text-muted-foreground mt-2">Please wait a moment</p>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Store the path they were trying to access for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
