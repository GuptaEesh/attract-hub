import { newCart, updatedCart } from '../utils'
const cartItemsReducer = (cart, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...cart,
                cartItems: [
                    ...cart.cartItems,
                    { ...action.payload, quantity: 1 },
                ],
            }

        case 'INCREASE_ITEM_COUNT':
            return { ...cart, cartItems: updatedCart(cart, action) }

        case 'DELETE_PRODUCT':
            return { ...cart, cartItems: newCart(cart, action) }
        default:
            return cart
    }
}
export { cartItemsReducer }
