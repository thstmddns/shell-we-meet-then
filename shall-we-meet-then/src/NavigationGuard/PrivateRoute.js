import React from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from './isLogin';

const PrivateRoute = ({ children }) => {
  return !isLogin() ? <Navigate to='/' /> : children;
};

export default PrivateRoute;