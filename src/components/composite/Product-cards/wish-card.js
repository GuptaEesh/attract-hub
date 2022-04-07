import { Button } from '../../atomic'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useCart } from '../../../helpers/contexts/cart-context'
import {
    removeWishItem,
    addWishItem,
    addCartItem,
} from '../../../helpers/utils'
import { useAuth } from '../../../helpers/contexts/auth-context'
import { Loading, SmallLoader } from '../Loader'
import { useData } from '../../../helpers/contexts/data-context'
import './cards.css'
export function WishCard({ greyClass, product }) {
    let navigate = useNavigate()
    const [popup, setPopup] = useState({
        cartloader: false,
        wishloader: false,
    })
    const { cartloader, wishloader } = popup
    const { token } = useAuth()
    const { image, brand, name, price, ratings } = product
    const { items, dispatch, wishItems } = useCart()
    const { setPopups } = useData()
    const addWish = () =>
        addWishItem(product, dispatch, token, setPopup, setPopups)
    const removeWish = (id) =>
        removeWishItem(dispatch, token, id, setPopup, setPopups)
    const addCartProduct = () =>
        addCartItem(product, dispatch, token, setPopup, setPopups)
    const moveToCart = () => navigate('/cart')
    return (
        <div className="position-relative">
            <div
                className={
                    !greyClass
                        ? 'eg-card ecomm-card'
                        : 'eg-card ecomm-card grey-card'
                }
            >
                <header className="card-header bold justify-space-between">
                    <span className="flex flex-column sm">
                        {name}
                        <small className="sm light">{brand}</small>
                    </span>
                    {wishloader ? (
                        <Loading />
                    ) : wishItems.find((item) => item.id === product.id) ? (
                        <span
                            className="material-icons text-blue"
                            onClick={() => removeWish(product._id)}
                        >
                            favorite
                        </span>
                    ) : (
                        <span className="material-icons" onClick={addWish}>
                            favorite
                        </span>
                    )}
                </header>
                <img
                    alt="product-img"
                    className="hero-img"
                    src={image}
                    loading="lazy"
                />
                <section className="product-info">
                    <span className="bold size-12">
                        {price}$
                        <span className="md light text-strike">
                            {Math.round(price * 1.3)}$
                        </span>
                    </span>
                    <div className="flex align-center bold">
                        {ratings}{' '}
                        <span className="material-icons text-blue outlined">
                            star
                        </span>
                    </div>
                </section>
                {items.find((item) => item.id === product.id) ? (
                    <Button
                        btnFunc={moveToCart}
                        btnText={'Go To Cart'}
                        btnType="tertiary bold btn without-shadow"
                    />
                ) : (
                    <Button
                        btnFunc={addCartProduct}
                        disabled={greyClass}
                        btnText={cartloader ? <SmallLoader /> : 'Move To Cart'}
                        btnType="primary btn without-shadow"
                    />
                )}
            </div>
        </div>
    )
}
