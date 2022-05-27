import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { Button } from '../../components/atomic'
import { AddressField, CartProducts } from '../../components/composite'
import { useCart } from '../../helpers/contexts/cart-context'
import { useData } from '../../helpers/contexts/data-context'
import { useAuth } from '../../helpers/contexts/auth-context'
import attract from '../../images/favicon.ico'
import './checkout-page.css'
export function CheckoutPage() {
    const { items, dispatch } = useCart()
    const { dataHandler } = useData()
    const { userData } = useAuth()
    const selectedAddress = dataHandler.selectedAddress
    const navigate = useNavigate()
    let totalPrice = items?.reduce(
        (total, item) => (total += Number(item.price * item.qty)),
        0
    )
    let discount = Math.round(0.05 * totalPrice)
    let delivery = totalPrice > 200 ? 0 : Math.round(0.19 * totalPrice)
    const loadScript = async (url) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = url

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    const displayRazorpay = async () => {
        const res = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        )

        if (!res) {
            alert('Razorpay SDK failed to load, check you connection')
            return
        }
        // Did it using dollars but it would have been difficult for the project reviewer to navigate to a successful transaction.
        const options = {
            key: 'rzp_test_BwWY3GrNLhnHWZ',
            amount: (totalPrice + delivery - discount) * 100 * 80,
            currency: 'INR',
            name: 'Attract Hub',
            description: 'Thank you for shopping with us',
            image: { attract },
            handler: (response) => {
                dispatch({
                    type: 'ADD_TO_ORDER_SUMMARY',
                    payload: {
                        id: uuid(),
                        payment_id: response.razorpay_payment_id,
                        orders: items,
                        payment: totalPrice + delivery - discount,
                    },
                })
                //Have to empty cart on clicking this but backend doesn't support clear cart api.
                navigate('/order_summary', { replace: true })
            },
            prefill: {
                name: `${userData.name}`,
                email: `${userData.email}`,
                contact: `+91+${selectedAddress.number}`,
            },
            theme: {
                color: 'rgb(10,132,255)',
            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const placeOrder = () => displayRazorpay()

    return items?.length === 0 ? (
        <div className="flex align-center justify-center">
            <h2>Redirecting to products page....</h2>
            {setTimeout(() => navigate('/products'), 1000)}
        </div>
    ) : (
        <div className="flex flex-column align-center justify-space-around gap-1 padding-2">
            <h2 className="size-16">Checkout Page ({items?.length})</h2>
            <AddressField />
            {items?.map((cartItem) => (
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
                btnFunc={placeOrder}
            />
        </div>
    )
}
