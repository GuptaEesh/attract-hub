import React from 'react'
import { useAuth } from '../../helpers/contexts/auth-context'
import '../profile-page/profile-page.css'
const ProfileInfo = () => {
    const {
        userData: { name, email },
    } = useAuth()
    return (
        <article className="profile-details flex flex-column">
            <h1 className="details-heading">Profile Details</h1>
            <ul className=" flex flex-column gap-2 list-noneOrdered">
                <li>
                    Name :<span className="bold"> {name}</span>
                </li>
                <li>
                    Email : <span className="bold">{email}</span>
                </li>
            </ul>
        </article>
    )
}

export { ProfileInfo }
