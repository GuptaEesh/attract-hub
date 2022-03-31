import { Button, Input } from '../../atomic'
import { LanguageDrop } from '../index'
import React from 'react'
import '../NavBar/nav.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../../helpers/contexts/cart-context'
import { useWishList } from '../../../helpers/contexts/wishlist-context'
import { useAuth } from '../../../helpers/contexts/auth-context'
// use profile image here
export function Nav() {
    const { items } = useCart()
    const { logout, isAuthenticated } = useAuth()
    const { wishItems } = useWishList()
    const navigate = useNavigate()

    let wishlistCounter = wishItems.length
    wishlistCounter = wishlistCounter > 100 ? '100+' : wishlistCounter
    let cartCounter = items.reduce(
        (totalItems, item) => (totalItems += Number(item.qty)),
        0
    )
    cartCounter = cartCounter > 100 ? '100+' : cartCounter
    return (
        <header className="nav-bar with-shadow">
            <div className="nav-section-left">
                <Link to="/">
                    <Button btnText="Home" btnType="secondary-link logo bold" />
                </Link>
                <Link to="/products">
                    <Button
                        btnText="Sh🔹p"
                        btnType="secondary-link logo bold"
                    />
                </Link>
            </div>
            <section>
                <Input
                    inputType="text"
                    inputClass="input-text md"
                    inputPlaceHolder="Search..."
                />
            </section>
            <section className="flex align-center">
                <LanguageDrop />
                {!isAuthenticated ? (
                    <Button
                        btnType="primary bold btn md login without-shadow "
                        btnText="->]"
                        btnFunc={() => navigate('/login')}
                    />
                ) : (
                    <Button
                        btnType="primary bold btn md login without-shadow "
                        btnText="[->"
                        btnFunc={logout}
                    />
                )}
            </section>
            <div className="nav-section-right align-center">
                <div className="icon-with-badge">
                    <Link to="/wishlist">
                        <span className="material-icons outlined lg">
                            favorite
                        </span>
                        <small className="text-center notification mat xsm">
                            {wishlistCounter}
                        </small>
                    </Link>
                </div>
                <div className="icon-with-badge">
                    <Link to="/cart">
                        <span className="material-icons outlined lg">
                            shopping_cart
                        </span>
                    </Link>
                    <small className="text-center notification mat xsm">
                        {cartCounter}
                    </small>
                </div>
            </div>
        </header>
    )
}
