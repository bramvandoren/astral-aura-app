// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const PrivateRoute = ({ element, ...props }) => {
  const { authToken } = useAuth();

  return authToken ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
