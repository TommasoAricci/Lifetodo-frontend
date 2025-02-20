import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';

function Authentication({ children }) {
  const { token } = useStore();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default Authentication;
