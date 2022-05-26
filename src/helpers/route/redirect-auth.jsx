import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'
const RedirectAuth = () => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    return isAuthenticated ? (
        <Navigate
            to={location.state.from.pathname ?? '/'}
            state={{ from: location }}
            replace={true}
        />
    ) : (
        <Outlet />
    )
}

export { RedirectAuth }
