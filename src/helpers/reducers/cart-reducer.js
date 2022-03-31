const cartItemsReducer = (cart, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { cartItems: action.payload }

        case 'INCREASE_ITEM_COUNT':
            return { cartItems: action.payload }

        case 'DELETE_PRODUCT':
            return { cartItems: action.payload }
        default:
            return cart
    }
}
export { cartItemsReducer }
