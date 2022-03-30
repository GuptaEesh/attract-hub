import {
    CartProducts,
    PriceBanner,
    EmptyPage,
} from '../../components/composite'
import { useCart } from '../../helpers/contexts/cart-context'
import './cart.css'
import emptyCart from '../../images/empty-cart.svg'
export function Cart() {
    const { items } = useCart()
    let totalPrice = items.reduce(
        (total, item) => (total += Number(item.price * item.qty)),
        0
    )
    let discount = Math.round(0.05 * totalPrice)
    let delivery = totalPrice > 200 ? 0 : Math.round(0.19 * totalPrice)
    return items.length !== 0 ? (
        <div
            className="flex flex-wrap flex-row justify-space-around"
            style={{ paddingTop: '5rem' }}
        >
            <section>
                <h1 className="bold size-16" style={{ margin: '1rem' }}>
                    Shopping Cart
                </h1>

                {items.map((cartItem) => (
                    <CartProducts key={cartItem._id} cartItem={cartItem} />
                ))}
            </section>
            <section className="flex flex-column align-center">
                <div className="flex flex-column bold fixed-info-tag">
                    All orders are fulfilled by
                    <span className="text-blue">@Attract-Hub</span>
                    <h2>All rights reserved</h2>
                    <span className="light md">Free orders above 200$</span>
                </div>

                <PriceBanner
                    totalPrice={totalPrice}
                    discount={discount}
                    delivery={delivery}
                />
            </section>
        </div>
    ) : (
        <EmptyPage imgSrc={emptyCart} altText="Empty Cart" />
    )
}
