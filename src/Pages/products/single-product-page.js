import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../../components/atomic'
import { SmallLoader } from '../../components/composite'
import { useCart } from '../../helpers/contexts/cart-context'
import { useData } from '../../helpers/contexts/data-context'
import './products-page.css'
import {
    useAddCartItem,
    useAddWishItem,
    useRemoveWishItem,
} from '../../components/composite/Product-cards/Item-Hooks'
import { useWishList } from '../../helpers/contexts/wishlist-context'
export function ProductPage() {
    let navigate = useNavigate()
    const { data } = useData()
    const [loader, setLoader] = useState(false)
    const { items, dispatch } = useCart()
    const { wishItems, dispatchWish } = useWishList()
    const { id } = useParams()
    let product = data.filter((item) => item.id === id)
    product = product[0]
    const moveToCart = () => navigate('/cart')
    const addCartItem = () => useAddCartItem(product, dispatch, setLoader)
    const addWishItem = () => useAddWishItem(product, dispatchWish)
    const removeWishItem = () => useRemoveWishItem(product, dispatchWish)

    return data
        .filter((product) => product.id === id)
        .map(({ name, image, price, brand, ratings }) => (
            <div
                className="flex flex-column align-center"
                style={{ gap: '5rem' }}
                key={id}
            >
                <h2 className="size-20" style={{ marginTop: '1rem' }}>
                    {name} Description
                </h2>

                <div
                    className="flex flex-wrap align-center"
                    style={{ gap: '1rem' }}
                >
                    <img className="product-image" src={image} alt={name} />

                    <section
                        className="flex flex-column"
                        style={{ flex: 2, gap: '2rem' }}
                    >
                        <section className="flex flex-column">
                            <span className="bold">{name}</span>
                            <small className="sm">{brand}</small>

                            {wishItems.find(
                                (item) => item.id === product.id
                            ) ? (
                                <span
                                    className="material-icons text-blue"
                                    onClick={removeWishItem}
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
                        <p className="size-12">{price}$/-</p>

                        <label className="flex">
                            <span className="bold">{ratings}</span>{' '}
                            <input
                                className="rating-star"
                                type="checkbox"
                                checked
                            />
                            <span className="material-icons outlined lg rating-star-icon">
                                star
                            </span>
                        </label>

                        <p className="text-blue size-12 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolorum molestiae, quos perferendis laboriosam
                            doloribus dolor voluptas maxime! Alias, dignissimos
                            accusantium quibusdam laboriosam ullam id molestiae
                            ad aperiam, quas aut natus!
                        </p>
                        <div className="flex align-center">
                            <Button
                                btnType="secondary btn sm"
                                btnText="Talk to Seller"
                            />

                            {items.find((item) => item.id === id) ? (
                                <Button
                                    btnFunc={moveToCart}
                                    btnText={'Go To Cart'}
                                    btnType="tertiary bold btn without-shadow"
                                />
                            ) : (
                                <Button
                                    btnFunc={addCartItem}
                                    btnText={
                                        loader ? <SmallLoader /> : 'Add To Cart'
                                    }
                                    btnType="primary btn without-shadow"
                                />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        ))
}
