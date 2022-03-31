// import { updatedWishList } from '../utils'

const wishListItemsReducer = (wishList, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return {
                wishListItems: action.payload,
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                wishListItems: action.payload,
            }
        default:
            return wishList
    }
}
export { wishListItemsReducer }
