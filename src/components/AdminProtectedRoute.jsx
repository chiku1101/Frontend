import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Not logged in, redirect to admin login page with return url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== 'admin') {
    // Logged in but not an admin, redirect to regular login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authorized, render component
  return children;
};

export default AdminProtectedRoute;