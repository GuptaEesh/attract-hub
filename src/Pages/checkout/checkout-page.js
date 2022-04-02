import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/atomic'
import { AddressField, CartProducts } from '../../components/composite'
import { useCart } from '../../helpers/contexts/cart-context'

export function CheckoutPage() {
    const { items } = useCart()
    const navigate = useNavigate()
    let totalPrice = items.reduce(
        (total, item) => (total += Number(item.price * item.qty)),
        0
    )
    let discount = Math.round(0.05 * totalPrice)
    let delivery = totalPrice > 200 ? 0 : Math.round(0.19 * totalPrice)
    return items.length === 0 ? (
        <div className="flex align-center justify-center">
            <h2>Redirecting to products page....</h2>
            {setTimeout(() => navigate('/products'), 1000)}
        </div>
    ) : (
        <div
            className="flex flex-column align-center justify-space-around"
            style={{ padding: '2rem', gap: '1rem' }}
        >
            <h2 className="size-16">Checkout Page ({items.length})</h2>
            <AddressField />
            {items.map((cartItem) => (
                <CartProducts key={cartItem._id} cartItem={cartItem} />
            ))}
            <h2> Checkout price - {totalPrice + delivery - discount}$</h2>
            <Button btnText="Order now" btnType="btn primary bold" />
        </div>
    )
}
