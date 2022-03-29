import React, { useContext, createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem(`token`))
    const isAuthenticated = authToken ? true : false
    const login = (token) => {
        localStorage.setItem('token', JSON.stringify(token))
        setAuthToken(token)
    }

    const logout = () => {
        localStorage.clear()
        setAuthToken(null)
    }

    return (
        <AuthContext.Provider
            value={{ login, logout, isAuthenticated, authToken }}
        >
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }
