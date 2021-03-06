import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../../components/atomic'
import { Loading, SmallLoader } from '../../components/composite'
import { useCart } from '../../helpers/contexts/cart-context'
import { useData } from '../../helpers/contexts/data-context'
import './products-page.css'
import { useAuth } from '../../helpers/contexts/auth-context'
import {
    addCartItem,
    addWishItem,
    getProducts,
    removeWishItem,
} from '../../helpers/utils'
export function ProductPage() {
    let navigate = useNavigate()
    const location = useLocation()
    const { dataHandler, setPopups, dispatchData } = useData()
    useEffect(() => getProducts(setPopups, dispatchData), [dataHandler])
    const { items, dispatch, wishItems } = useCart()
    const [popup, setPopup] = useState({
        cartloader: false,
        wishloader: false,
    })
    const { cartloader, wishloader } = popup
    const { id } = useParams()
    let product = dataHandler.data.filter((item) => item.id === id)[0]

    const moveToCart = () => navigate('/cart')
    const addCartProduct = () =>
        isAuthenticated
            ? addCartItem(product, dispatch, token, setPopup, setPopups)
            : navigate('/login', { state: { from: location } })
    const addWish = () =>
        isAuthenticated
            ? addWishItem(product, dispatch, token, setPopup, setPopups)
            : navigate('/login', { state: { from: location } })
    const removeWish = (id) =>
        isAuthenticated
            ? removeWishItem(dispatch, token, id, setPopup, setPopups)
            : navigate('/login', { state: { from: location } })
    const { isAuthenticated, token } = useAuth()
    return dataHandler.data
        ?.filter((product) => product.id === id)
        ?.map(({ id, name, image, price, brand, ratings }) => (
            <div className="flex flex-column align-center gap-4" key={id}>
                <h2 className="size-20 margin-top-1">{name} Description</h2>

                <div className="flex flex-wrap align-center gap-1">
                    <img className="product-image" src={image} alt={name} />

                    <section className="flex flex-column flex-2 gap-2">
                        <section className="flex flex-column">
                            <span className="bold">{name}</span>
                            <small className="sm">{brand}</small>
                            <div className="loader-container">
                                {wishloader ? (
                                    <Loading />
                                ) : wishItems?.find(
                                      (item) => item.id === product.id
                                  ) ? (
                                    <span
                                        className="material-icons text-blue"
                                        onClick={() => removeWish(product._id)}
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
                        <p className="size-12">${price}/-</p>

                        <label className="flex">
                            <span className="bold">{ratings}</span>
                            <input
                                className="rating-star"
                                type="checkbox"
                                defaultChecked
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
                            <a
                                href="https://wa.me/+917015887787"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="secondary btn md"
                            >
                                Talk to Seller
                            </a>

                            {items?.find((item) => item.id === id) ? (
                                <Button
                                    btnFunc={moveToCart}
                                    btnText={'Go To Cart'}
                                    btnType="tertiary bold btn without-shadow"
                                />
                            ) : (
                                <Button
                                    btnFunc={addCartProduct}
                                    btnText={
                                        cartloader ? (
                                            <SmallLoader />
                                        ) : (
                                            'Add To Cart'
                                        )
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
