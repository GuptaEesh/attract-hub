import { useCart } from '../../../helpers/contexts/cart-context'
import { FaStudiovinari } from 'react-icons/fa'
import { useState } from 'react'
import {
    removeCartItem,
    removeWishItem,
    addWishItem,
    quantityHandler,
} from '../../../helpers/utils'
import './cards.css'
import { useAuth } from '../../../helpers/contexts/auth-context'
import { Loading } from '../Loader'
import { useData } from '../../../helpers/contexts/data-context'
export function CartProducts({ cartItem }) {
    const { image, name, desc, ratings, price, maxQuantity, fastDelivery } =
        cartItem
    const { dispatch, wishItems } = useCart()
    const { setPopups } = useData()
    const [popup, setPopup] = useState({
        cartloader: false,
        wishloader: false,
    })
    let buyNumbers = []
    for (let i = 1; i <= maxQuantity; i++) {
        buyNumbers.push(<option value={i}>{i}</option>)
    }
    const { token } = useAuth()
    const { cartloader, wishloader } = popup

    const quantity = (event) =>
        quantityHandler(event, cartItem, dispatch, token, setPopups)
    const deleteProduct = (id) =>
        removeCartItem(dispatch, token, id, setPopup, setPopups)
    const removeWish = (id) =>
        removeWishItem(dispatch, token, id, setPopup, setPopups)
    const addWish = () =>
        addWishItem(cartItem, dispatch, token, setPopup, setPopups)
    return (
        <div className="flex flex-row cart-product">
            <img
                style={{ width: '20%', height: '10rem' }}
                className="hero-img"
                src={image}
            />
            <section
                style={{ paddingLeft: '1rem', width: '80%' }}
                className=" bold justify-space-around flex flex-column align-space-between"
            >
                <div
                    className="flex align-center justify-space-between"
                    style={{ gap: '1rem' }}
                >
                    <section className="flex flex-column">
                        <span>{name}</span>
                        <span className={fastDelivery ? 'sm text-blue' : 'sm'}>
                            {fastDelivery ? (
                                <span className="sm flex align-center">
                                    Get in 2 working days <FaStudiovinari />{' '}
                                </span>
                            ) : (
                                'Get in 8 working days'
                            )}
                        </span>
                    </section>
                    <section className="flex flex-column">
                        <div
                            style={{
                                width: 'var(--size-16)',
                                height: 'var(--size-16)',
                            }}
                        >
                            {cartloader ? (
                                <Loading />
                            ) : (
                                <span
                                    className="material-icons"
                                    onClick={() => deleteProduct(cartItem._id)}
                                >
                                    delete
                                </span>
                            )}
                        </div>
                        <div
                            style={{
                                width: 'var(--size-16)',
                                height: 'var(--size-16)',
                            }}
                        >
                            {' '}
                            {wishloader ? (
                                <Loading />
                            ) : wishItems.find(
                                  (item) => item.id === cartItem.id
                              ) ? (
                                <span
                                    className="material-icons text-blue"
                                    onClick={() => removeWish(cartItem._id)}
                                >
                                    favorite
                                </span>
                            ) : (
                                <span
                                    className="material-icons"
                                    onClick={addWish}
                                >
                                    favorite
                                </span>
                            )}
                        </div>
                    </section>
                </div>
                <small className="xsm ">{desc}</small>
                <div className="flex align-center">
                    {ratings}
                    <span className="material-icons text-blue outlined">
                        star
                    </span>
                </div>
                {buyNumbers.length !== 0 ? (
                    <section className="flex align-center justify-space-between">
                        <label className="bold md cart-counter">
                            Qty:
                            <select
                                value={cartItem.qty}
                                onChange={quantity}
                                className="text-white bold md"
                                name="quantity"
                                id="quantity"
                                style={{
                                    backgroundColor: 'transparent',
                                    width: '3rem',
                                }}
                            >
                                <optgroup
                                    style={{
                                        backgroundColor: 'var(--primary-400)',
                                    }}
                                >
                                    {buyNumbers}
                                </optgroup>
                            </select>
                        </label>
                        <span
                            className="bold size-12"
                            style={{ paddingRight: '10px' }}
                        >
                            {price * Number(cartItem.qty)}$
                        </span>
                    </section>
                ) : (
                    <p style={{ lineHeight: '80%' }}>
                        Not for Sale! Seller was a fraud! We are looking into
                        it.
                    </p>
                )}
            </section>
        </div>
    )
}
