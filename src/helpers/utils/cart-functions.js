const updatedCart = (cart, action) =>
    cart.cartItems.map((cartItemCheck) => {
        if (cartItemCheck.id === action.payload.cartItem.id)
            return { ...cartItemCheck, quantity: action.payload.quantity }
        return cartItemCheck
    })
const newCart = (cart, action) =>
    cart.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
export { updatedCart, newCart }
