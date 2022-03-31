import { Button } from '../../atomic'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useCart } from '../../../helpers/contexts/cart-context'
import { useRemoveWishItem, useAddWishItem, useAddCartItem } from './Item-Hooks'
import { useAuth } from '../../../helpers/contexts/auth-context'
import { Loading, SmallLoader } from '../Loader'
export function WishCard({ greyClass, product }) {
    let navigate = useNavigate()
    const [popup, setPopup] = useState({
        cartloader: false,
        wishloader: false,
        toast: false,
    })
    const { cartloader, wishloader } = popup
    const { token } = useAuth()
    const { image, brand, name, price, ratings } = product
    const { items, dispatch, wishItems } = useCart()
    const addWishItem = () => useAddWishItem(product, dispatch, token, setPopup)
    const removeWishItem = (id) =>
        useRemoveWishItem(dispatch, token, id, setPopup)
    const addCartItem = () => useAddCartItem(product, dispatch, token, setPopup)
    const moveToCart = () => navigate('/cart')
    return (
        <div style={{ position: 'relative' }}>
            <div
                className={
                    !greyClass
                        ? 'eg-card ecomm-card'
                        : 'eg-card ecomm-card grey-card'
                }
                style={{ width: '12rem', marginLeft: 0 }}
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
                            onClick={() => removeWishItem(product._id)}
                        >
                            favorite
                        </span>
                    ) : (
                        <span className="material-icons" onClick={addWishItem}>
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
                        btnFunc={addCartItem}
                        disabled={greyClass}
                        btnText={cartloader ? <SmallLoader /> : 'Move To Cart'}
                        btnType="primary btn without-shadow"
                    />
                )}
            </div>
        </div>
    )
}
