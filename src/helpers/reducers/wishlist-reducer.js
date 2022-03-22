import { updatedWishList } from '../utils'

const wishListItemsReducer = (wishList, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return {
                ...wishList,
                wishListItems: [...wishList.wishListItems, action.payload],
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...wishList,
                wishListItems: updatedWishList(wishList, action),
            }
        default:
            return wishList
    }
}
export { wishListItemsReducer }
