import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/atomic'
import { useCart } from '../../helpers/contexts/cart-context'

export function OrdersPage() {
    const { currentOrder, dispatch } = useCart()
    const navigate = useNavigate()
    return currentOrder && Object.keys(currentOrder).length === 0 ? (
        <Navigate to="/products" replace />
    ) : (
        <div
            className="flex align-center flex-column"
            style={{ margin: '2rem', gap: '2rem' }}
        >
            <h1>Congratulations! Your order has been successfully placed!</h1>
            <div
                className="flex align-center flex-column"
                style={{ gap: '2rem' }}
            >
                <h2 className="size-16">
                    Order id is{' '}
                    <span className="size-12">{currentOrder.id}</span>{' '}
                </h2>
                <Button
                    btnType="btn primary without-shadow"
                    btnText="Shop More"
                    btnFunc={() => {
                        dispatch({ type: 'ORDER_CONFIRMED' })
                        navigate('/products')
                    }}
                />
            </div>
        </div>
    )
}