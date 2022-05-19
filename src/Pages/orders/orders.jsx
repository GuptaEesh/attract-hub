import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../helpers/contexts/cart-context'
import '../profile-page/profile-page.css'

const Orders = () => {
    const { orderSummary } = useCart()
    console.log(orderSummary)
    return (
        <article className="orders-page">
            <h1 className="details-heading">Order Details</h1>
            <main className="order-summary flex flex-column gap-2">
                {!orderSummary.length ? (
                    <h1 className="flex flex-column align-center gap-1">
                        Order some products. There&apos;s nothing to show here
                        <Link
                            to="/products"
                            className="btn primary without-shadow"
                        >
                            Order
                        </Link>
                    </h1>
                ) : (
                    orderSummary?.map(({ id, orders }) => (
                        <div key={id} className="order-specific-summary">
                            <span>
                                Order Id:- <span className="bold">{id}</span>
                            </span>
                            <section className="margin-1 flex flex-column gap-2">
                                {orders.map(
                                    ({ _id, image, name, brand, qty }) => (
                                        <div
                                            key={_id}
                                            className="flex flex-row gap-2 order-product"
                                        >
                                            <img
                                                className="hero-img"
                                                src={image}
                                            />
                                            <section className="flex flex-column item-info gap-2">
                                                <h4>{name}</h4>
                                                <small>{brand}</small>
                                                <p className="bold">
                                                    Qty :- {qty}
                                                </p>
                                            </section>
                                        </div>
                                    )
                                )}
                            </section>
                        </div>
                    ))
                )}
            </main>
        </article>
    )
}

export { Orders }
