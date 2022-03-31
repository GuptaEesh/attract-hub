const cartItemsReducer = (cart, action) => {
    switch (action.type) {
        case 'MANIPULATE_BAG':
            return { ...cart, cartItems: action.payload }

        case 'MANIPULATE_WISHLIST':
            return { ...cart, wishListItems: action.payload }

        default:
            return cart
    }
}
export { cartItemsReducer }
