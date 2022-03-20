import { Button } from '../../atomic'

export function PriceBanner({
    totalPrice = 1000,
    delivery = 10,
    coupon = 20,
    discount = 5,
}) {
    return (
        <div className="eg-card card-one justify-space-around">
            {totalPrice > 200 && (
                <p>
                    This is eligible for <span className="text-blue">Free</span>{' '}
                    delivery.
                </p>
            )}
            <header className="bold">
                {' '}
                Coupons
                <Button
                    btnType="secondary btn"
                    btnText={
                        <>
                            <span className="material-icons outlined md">
                                local_offer
                            </span>{' '}
                            Coupons
                        </>
                    }
                />
            </header>
            <h2>Price Details:</h2>
            <section>
                <table>
                    <tr>
                        <td className="sm">Total</td>
                        <td className="sm">{totalPrice}$</td>
                    </tr>
                    <tr>
                        <td className="sm">Discount</td>
                        <td className="sm">{discount}$</td>
                    </tr>
                    <tr>
                        <td className="sm">Delivery Charges</td>
                        <td className="sm">
                            {delivery === 0 ? 'Free Delivery' : `${delivery}$`}
                        </td>
                    </tr>
                    <tr>
                        <td className="sm">Coupon Code:</td>
                        <td className="sm">{coupon}$</td>
                    </tr>
                    <tr>
                        <td className="bold size-12">Total Amount:</td>
                        <td className="bold size-12">
                            {totalPrice + delivery - coupon - discount}$
                        </td>
                    </tr>
                </table>
            </section>

            <a href="./checkout.html">
                <button className="primary btn without-shadow">Checkout</button>
            </a>
        </div>
    )
}
