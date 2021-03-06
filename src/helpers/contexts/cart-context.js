import { createContext, useContext, useReducer } from 'react'
import { cartItemsReducer } from '../reducers'
import { useAuth } from './auth-context'
const CartContext = createContext(null)

function CartProvider({ children }) {
    const { userData } = useAuth()

    const [cart, dispatch] = useReducer(cartItemsReducer, {
        cartItems: userData.cart,
        wishListItems: userData.wishlist,
        currentOrder: {},
        orderSummary: [],
    })
    const items = cart.cartItems
    const wishItems = cart.wishListItems
    const currentOrder = cart.currentOrder
    const orderSummary = cart.orderSummary
    return (
        <CartContext.Provider
            value={{ items, wishItems, orderSummary, currentOrder, dispatch }}
        >
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)
export { useCart, CartProvider }
