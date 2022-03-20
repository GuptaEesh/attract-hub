import { Button, Input } from '../../atomic'
import { LanguageDrop } from '../index'
import React from 'react'
import '../NavBar/nav.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../../helpers/contexts/cart-context'
import { useWishList } from '../../../helpers/contexts/wishlist-context'

export function Nav({ profileImg }) {
    const { items } = useCart()
    const { wishItems } = useWishList()
    let wishlistCounter = wishItems.length
    wishlistCounter = wishlistCounter > 100 ? '100+' : wishlistCounter
    let cartCounter = items.reduce(
        (totalItems, item) => (totalItems += Number(item.quantity)),
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
                <a href="/">
                    <Button
                        btnType="primary btn md login without-shadow "
                        btnText="Login"
                    />
                </a>
            </section>
            <section className="flex align-center">
                <LanguageDrop />
                <img
                    className="profile-avatar img-sm xsm"
                    alt="profile-img"
                    src={
                        profileImg ||
                        'https://www.w3schools.com/howto/img_avatar.png'
                    }
                />
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
