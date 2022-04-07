import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { Button } from '../../components/atomic'
import { AddressField, CartProducts } from '../../components/composite'
import { useCart } from '../../helpers/contexts/cart-context'
import { useData } from '../../helpers/contexts/data-context'
import './checkout-page.css'
export function CheckoutPage() {
    const { items, dispatch } = useCart()
    const { dataHandler } = useData()
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
        <div className="flex flex-column align-center justify-space-around gap-1 padding-2">
            <h2 className="size-16">Checkout Page ({items.length})</h2>
            <AddressField />
            {items.map((cartItem) => (
                <CartProducts key={cartItem._id} cartItem={cartItem} />
            ))}
            <h2> Checkout price - {totalPrice + delivery - discount}$</h2>
            {dataHandler.selectedAddress === '' ? (
                <span className="bold text-red">Add Address Please !</span> //Add a scroll to top button
            ) : (
                <span>Order now!</span>
            )}
            <Button
                disabled={dataHandler.selectedAddress === '' ? true : false}
                btnText="Order now"
                btnType="btn primary bold order-btn"
                btnFunc={() => {
                    dispatch({
                        type: 'ADD_TO_ORDER_SUMMARY',
                        payload: { id: uuid(), order: items },
                    }) //Have to empty cart on clicking this but backend doesn't support clear cart api.
                    navigate('/order_summary', { replace: true })
                }}
            />
        </div>
    )
}
