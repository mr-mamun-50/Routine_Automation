import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

    let isAuth = localStorage.getItem('auth_token');

    return isAuth ? children : <Navigate to='/login' />;
}
