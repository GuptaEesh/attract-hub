import { Button, Input } from '../../atomic'
import React from 'react'
import '../NavBar/nav.css'
// import { BiSearchAlt } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../../helpers/contexts/cart-context'
import { resetFilters } from '../../../Pages/products/Filter/filter-controller'
import { useFilter } from '../../../helpers/contexts/filter-context'
import { useAuth } from '../../../helpers/contexts/auth-context'
export function Nav() {
    const { items, wishItems } = useCart()
    const { isAuthenticated } = useAuth()
    const { dispatch } = useFilter()
    const navigate = useNavigate()
    let wishlistCounter = wishItems?.length
    wishlistCounter = wishlistCounter > 100 ? '100+' : wishlistCounter
    let cartCounter = items?.reduce(
        (totalItems, item) => (totalItems += Number(item.qty)),
        0
    )
    cartCounter = cartCounter > 100 ? '100+' : cartCounter
    const debounceFunc = () => {
        let timer
        return (e) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                resetFilters(dispatch)
                e.target.value.length
                    ? navigate(`/search/${e.target.value}`)
                    : navigate(`/search/empty`)
            }, 300)
        }
    }
    return (
        <header className="nav-bar flex align-center with-shadow justify-space-between">
            <div className="nav-section-left flex-2">
                <Link to="/">
                    <Button
                        btnText="Home"
                        btnType="secondary-link cursor-pointer logo bold"
                    />
                </Link>
                <Link to="/products">
                    <Button
                        btnText="Sh🔹p"
                        btnType="secondary-link logo bold cursor-pointer"
                    />
                </Link>
            </div>
            <section className="flex search-bar align-center position-relative">
                <Input
                    inputFunc={debounceFunc()}
                    inputType="text"
                    inputClass="input-text sm"
                    inputPlaceHolder="Search products, brands ..."
                />
            </section>
            <div className="nav-section-right flex align-center justify-flex-end flex-2 gap-1">
                <Link to="/profile" className="bold ">
                    Account
                </Link>
                <div className="icon-with-badge">
                    <Link to="/wishlist">
                        <span className="material-icons outlined lg">
                            favorite
                        </span>
                        {isAuthenticated && (
                            <small className="text-center notification mat xsm">
                                {wishlistCounter}
                            </small>
                        )}
                    </Link>
                </div>
                <div className="icon-with-badge">
                    <Link to="/cart">
                        <span className="material-icons outlined lg">
                            shopping_cart
                        </span>
                    </Link>
                    {isAuthenticated && (
                        <small className="text-center notification mat xsm">
                            {cartCounter}
                        </small>
                    )}
                </div>
            </div>
        </header>
    )
}
