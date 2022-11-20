import React from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from './isLogin';

const PrivateRoute = ({ children} :{ children: any}) => {
  return !isLogin() ? <Navigate to='/' /> : children;
};

export default PrivateRoute;