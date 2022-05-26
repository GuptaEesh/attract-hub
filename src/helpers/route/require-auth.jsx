import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'

const RequireAuth = () => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace={true} />
    )
}

export { RequireAuth }
