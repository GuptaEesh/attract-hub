import { Button } from '../../atomic'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useCart } from '../../../helpers/contexts/cart-context'
import { SmallLoader } from '../'
import { useWishList } from '../../../helpers/contexts/wishlist-context'
import { useRemoveWishItem, useAddWishItem, useAddCartItem } from './Item-Hooks'
export function WishCard({ greyClass, product }) {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const { image, brand, name, price, ratings } = product
    const { items, dispatch } = useCart()
    const { wishItems, dispatchWish } = useWishList()
    const addWishItem = () => useAddWishItem(product, dispatchWish)
    const removeWishItem = () => useRemoveWishItem(product, dispatchWish)
    const addCartItem = () => useAddCartItem(product, dispatch, setLoader)
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
                    {wishItems.find((item) => item.id === product.id) ? (
                        <span
                            className="material-icons text-blue"
                            onClick={removeWishItem}
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
                        btnText={loader ? <SmallLoader /> : 'Move To Cart'}
                        btnType="primary btn without-shadow"
                    />
                )}
            </div>
        </div>
    )
}
