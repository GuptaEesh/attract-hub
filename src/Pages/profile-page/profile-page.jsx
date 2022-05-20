import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './profile-page.css'
const ProfilePage = () => {
    const options = [
        {
            text: 'Profile',
            link: '/profile/',
        },
        {
            text: 'Orders',
            link: '/profile/orders',
        },
        {
            text: 'Settings',
            link: '/profile/settings',
        },
    ]
    const activeClass = ({ isActive }) =>
        isActive ? 'active-class bold' : 'inactive-class'
    return (
        <div className="flex user-links height-r-80">
            <nav className="flex flex-1 flex-column gap-4 nav-links">
                {options.map(({ text, link }) => (
                    <NavLink key={text} className={activeClass} to={link}>
                        {text}
                    </NavLink>
                ))}
            </nav>
            <main className="flex-5 profile-page">
                <Outlet />
            </main>
        </div>
    )
}

export { ProfilePage }
