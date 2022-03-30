import { createContext, useContext, useReducer } from 'react'
import { cartItemsReducer } from '../reducers'
import { useAuth } from './auth-context'
const CartContext = createContext(null)

function CartProvider({ children }) {
    const { userData } = useAuth()
    const [cart, dispatch] = useReducer(cartItemsReducer, {
        cartItems: userData.cart,
    })
    const items = cart.cartItems
    return (
        <CartContext.Provider value={{ items, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)
export { useCart, CartProvider }
