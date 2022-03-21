const useAddWishItem = (product, dispatchWish) =>
    dispatchWish({
        type: 'ADD_TO_WISHLIST',
        payload: product,
    })

export { useAddWishItem }
