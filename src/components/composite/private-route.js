import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../helpers/contexts/auth-context'

export function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/login" replace />
}
