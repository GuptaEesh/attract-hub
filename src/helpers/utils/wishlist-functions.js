const updatedWishList = (wishList, action) =>
    wishList.wishListItems.filter((item) => item.id !== action.payload.id)
export { updatedWishList }
