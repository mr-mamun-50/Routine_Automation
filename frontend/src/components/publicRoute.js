import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {

    let isAuth = localStorage.getItem('auth_token');

    return isAuth ? <Navigate to='/' /> : children;
}
