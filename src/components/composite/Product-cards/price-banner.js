import { Link } from 'react-router-dom'
// import { Button } from '../../atomic'

export function PriceBanner({
    totalPrice = 1000,
    delivery = 10,
    discount = 5,
}) {
    return (
        <div className="eg-card card-one justify-space-around">
            {totalPrice > 200 ? (
                <p>
                    This is eligible for{' '}
                    <span className="text-blue">Free </span>
                    delivery.
                </p>
            ) : (
                <p>
                    Your cart seems light, mind adding more items😂. Just
                    kidding, go for it!
                </p>
            )}
            <h2>Price Details:</h2>
            <section>
                <table>
                    <tbody>
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
                                {delivery === 0
                                    ? 'Free Delivery'
                                    : `${delivery}$`}
                            </td>
                        </tr>
                        <tr>
                            <td className="bold size-12">Total Amount:</td>
                            <td className="bold size-12">
                                {totalPrice + delivery - discount}$
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <Link to="/checkout">
                <button className="primary btn without-shadow">Checkout</button>
            </Link>
        </div>
    )
}
