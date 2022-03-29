import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../helpers/contexts/auth-context'

export function PrivateRoute({ component }) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? component : <Navigate to="/login" replace />
}
