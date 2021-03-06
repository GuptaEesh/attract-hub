import { Button } from '../../atomic'
import { FaShippingFast } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useCart } from '../../../helpers/contexts/cart-context'
import './cards.css'
import {
    addCartItem,
    addWishItem,
    removeWishItem,
} from '../../../helpers/utils'
import { useAuth } from '../../../helpers/contexts/auth-context'
import { Loading, SmallLoader } from '../Loader'
import { useData } from '../../../helpers/contexts/data-context'
export function Card({ greyClass, product }) {
    let navigate = useNavigate()
    const location = useLocation()
    const { image, inStock, brand, id, name, price, ratings, fastDelivery } =
        product
    const { items, dispatch, wishItems } = useCart()
    const { setPopups } = useData()
    const [popup, setPopup] = useState({
        cartloader: false,
        wishloader: false,
    })
    const { cartloader, wishloader } = popup
    const { isAuthenticated, token } = useAuth()
    const addWish = (e) => {
        e.stopPropagation()
        isAuthenticated
            ? addWishItem(product, dispatch, token, setPopup, setPopups)
            : navigate('/login', { state: { from: location } })
    }
    const addCartProduct = (e) => {
        e.stopPropagation()
        isAuthenticated
            ? addCartItem(product, dispatch, token, setPopup, setPopups)
            : navigate('/login', { state: { from: location } })
    }
    const removeWish = (id, e) => {
        e.stopPropagation()
        isAuthenticated
            ? removeWishItem(dispatch, token, id, setPopup, setPopups)
            : navigate('/login', { state: { from: location } })
    }
    const moveToCart = (e) => {
        e.stopPropagation()
        navigate('/cart')
    }
    const singleProductPage = () => navigate(`/products/${id}`)
    return (
        <div
            onClick={!greyClass && singleProductPage}
            className={`position-relative height-max-content ${
                !greyClass && 'cursor-pointer'
            }`}
        >
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
            >
                <img
                    alt="product-img"
                    className="hero-img"
                    src={image}
                    loading="lazy"
                />
                {/* {!greyClass && (
                    <Button
                        btnText="See Details"
                        btnType="tertiary btn product-detail-btn bold md"
                        btnFunc={() => navigate(`/products/${id}`)}
                    />
                )} */}
                <header className="card-header bold justify-space-between">
                    <span className="flex flex-column sm">
                        {name}
                        <small className="sm light">{brand}</small>
                    </span>
                    {wishloader ? (
                        <Loading />
                    ) : wishItems?.find((item) => item.id === product.id) ? (
                        <span
                            className="material-icons text-blue"
                            onClick={(e) => removeWish(product._id, e)}
                        >
                            favorite
                        </span>
                    ) : (
                        <span className="material-icons" onClick={addWish}>
                            favorite
                        </span>
                    )}
                </header>
                <section className="product-info">
                    <span className="bold size-12">
                        ${price}
                        <span className="md light text-strike m-p5">
                            ${Math.round(price * 1.3)}
                        </span>
                    </span>
                    <div className="flex align-center bold">
                        {ratings}
                        <span className="material-icons text-blue outlined">
                            star
                        </span>
                    </div>
                </section>

                {items?.find((item) => item.id === product.id) ? (
                    <Button
                        btnFunc={moveToCart}
                        btnText={'Go To Cart'}
                        btnType="secondary width-p-100 bold btn"
                    />
                ) : (
                    <Button
                        btnFunc={addCartProduct}
                        disabled={greyClass}
                        btnText={cartloader ? <SmallLoader /> : 'Add To Cart'}
                        btnType="primary btn without-shadow"
                    />
                )}
            </div>
        </div>
    )
}
