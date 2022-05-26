const cartItemsReducer = (cart, action) => {
    switch (action.type) {
        case 'ORDER_CONFIRMED':
            return {
                ...cart,
                currentOrder: {},
            }
        case 'ADD_TO_ORDER_SUMMARY':
            return {
                ...cart,
                currentOrder: { id: action.payload.id },
                orderSummary: [...cart.orderSummary, action.payload],
            }
        case 'MANIPULATE_BAG':
            return { ...cart, cartItems: action.payload }

        case 'MANIPULATE_WISHLIST':
            return { ...cart, wishListItems: action.payload }

        default:
            return cart
    }
}
export { cartItemsReducer }
