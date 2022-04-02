import React, { useContext, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
const initialData = {
    token: localStorage.getItem('token'),
    data: JSON.parse(localStorage.getItem('userData')),
}
const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(initialData)
    const navigate = useNavigate()
    const isAuthenticated = authToken.token ? true : false
    const login = (data) => {
        localStorage.setItem('token', JSON.stringify(data.encodedToken))
        localStorage.setItem('userData', JSON.stringify(data.foundUser))
        setAuthToken({ token: data.encodedToken, data: data.foundUser })
    }

    const logout = () => {
        setAuthToken({ token: null, data: null })
        navigate('/login')
    }
    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isAuthenticated,
                token: authToken.token,
                userData: authToken.data ?? { cart: [], wishlist: [] },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }
