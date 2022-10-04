import React from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext'

const ProtectedRoute = ({ children }) => {//children é sempre oq tem dentro de um elemento quanto vc abre e fecha ele.

  const { login } = React.useContext(UserContext);

  return login ? children : <Navigate to="/login" />;
}

export default ProtectedRoute