import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/atomic'
import { useAuth } from '../../helpers/contexts/auth-context'
import '../profile-page/profile-page.css'

const Settings = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    return (
        <section className="settings flex-column gap-2 justify-center flex align-center">
            <h1>Are you leaving so early?</h1>
            {!isAuthenticated ? (
                <Button
                    btnType="primary bold btn md login without-shadow "
                    btnText="Login"
                    btnFunc={() => navigate('/login')}
                />
            ) : (
                <Button
                    btnType="primary bold btn md login without-shadow "
                    btnText="Logout"
                    btnFunc={logout}
                />
            )}
        </section>
    )
}

export { Settings }
