import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector(state => state.auth);

    if (loading) return <Loader />

    if (user?.role === 'admin') return children;
    else return <Navigate to="/" />

};

export default AdminProtectedRoute;