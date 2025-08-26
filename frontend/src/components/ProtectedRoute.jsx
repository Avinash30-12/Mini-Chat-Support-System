import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
     return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If user has token, show the protected content
  return children;
};

export default ProtectedRoute;