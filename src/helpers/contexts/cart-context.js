import { createContext, useContext, useReducer } from 'react'
import { cartItemsReducer } from '../reducers'
const CartContext = createContext(null)

function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartItemsReducer, { cartItems: [] })
    const items = cart.cartItems
    return (
        <CartContext.Provider value={{ items, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)
export { useCart, CartProvider }
