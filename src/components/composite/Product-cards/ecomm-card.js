import { Button } from '../../atomic'
import { FaShippingFast } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useCart } from '../../../helpers/contexts/cart-context'
import { SmallLoader } from '../'
import { useWishList } from '../../../helpers/contexts/wishlist-context'
import './cards.css'
import { useAddCartItem, useAddWishItem, useRemoveWishItem } from './Item-Hooks'
export function Card({ greyClass, product }) {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const { image, inStock, brand, id, name, price, ratings, fastDelivery } =
        product
    const { items, dispatch } = useCart()
    const { wishItems, dispatchWish } = useWishList()
    const addWishItem = () => useAddWishItem(product, dispatchWish)
    const addCartItem = () => useAddCartItem(product, dispatch, setLoader)
    const removeWishItem = () => useRemoveWishItem(product, dispatchWish)
    const moveToCart = () => navigate('/cart')
    return (
        <div style={{ position: 'relative', height: 'max-content' }}>
            {fastDelivery && inStock && (
                <h2 className="bold justify-center flex align-center card-tag">
                    Fast <FaShippingFast size="1rem" color="var(--white)" />
                </h2>
            )}
            <div
                className={
                    !greyClass
                        ? 'eg-card ecomm-card'
                        : 'eg-card ecomm-card grey-card'
                }
                style={{ width: '12rem', marginLeft: 0 }}
            >
                <img
                    alt="product-img"
                    className="hero-img"
                    src={image}
                    loading="lazy"
                />
                {!greyClass && (
                    <Button
                        btnText="See Details"
                        btnType="tertiary btn product-detail-btn bold md"
                        btnFunc={() => navigate(`/products/${id}`)}
                    />
                )}
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
                <section className="product-info">
                    <span className="bold size-12">
                        {price}${' '}
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
                        btnText={loader ? <SmallLoader /> : 'Add To Cart'}
                        btnType="primary btn without-shadow"
                    />
                )}
            </div>
        </div>
    )
}
