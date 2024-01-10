// SecureRoute.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const SecureRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default SecureRoute;
