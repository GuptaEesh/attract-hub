import { useCart } from '../../../helpers/contexts/cart-context'
import { useWishList } from '../../../helpers/contexts/wishlist-context'
import { FaStudiovinari } from 'react-icons/fa'
import {
    useRemoveCartItem,
    useRemoveWishItem,
    useAddWishItem,
} from './Item-Hooks'
import './cards.css'
import { useAuth } from '../../../helpers/contexts/auth-context'
import axios from 'axios'
export function CartProducts({ cartItem }) {
    const { image, name, desc, ratings, price, maxQuantity, fastDelivery } =
        cartItem
    const { dispatch } = useCart()
    const { wishItems, dispatchWish } = useWishList()
    let buyNumbers = []
    for (let i = 1; i <= maxQuantity; i++) {
        buyNumbers.push(<option value={i}>{i}</option>)
    }
    const { token } = useAuth()
    const url = `/api/user/cart/${cartItem._id}`
    const quantityHandler = async (e) => {
        const response = await axios.post(
            url,
            {
                action: {
                    type: 'increment',
                    payload: e.target.value,
                },
            },
            {
                headers: {
                    authorization: token,
                },
            }
        )
        dispatch({
            type: 'INCREASE_ITEM_COUNT',
            payload: response.data.cart,
        })
    }
    const deleteCartProduct = (id) => useRemoveCartItem(dispatch, token, id)
    const removeWishItem = (id) => useRemoveWishItem(dispatchWish, token, id)
    const addWishItem = () => useAddWishItem(cartItem, dispatchWish, token)
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
                <div className="flex align-center justify-space-between">
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
                        <span
                            className="material-icons"
                            onClick={() => deleteCartProduct(cartItem._id)}
                        >
                            delete
                        </span>
                        {wishItems.find((item) => item.id === cartItem.id) ? (
                            <span
                                className="material-icons text-blue"
                                onClick={() => removeWishItem(cartItem._id)}
                            >
                                favorite
                            </span>
                        ) : (
                            <span
                                className="material-icons"
                                onClick={addWishItem}
                            >
                                favorite
                            </span>
                        )}
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
                                onChange={quantityHandler}
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
