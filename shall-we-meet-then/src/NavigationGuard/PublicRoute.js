import React from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from './isLogin';
import { useParams } from "react-router-dom";

const PublicRoute = ({ children }) => {
  return isLogin() ? <Navigate to='/main' /> : children;
};

export default PublicRoute;