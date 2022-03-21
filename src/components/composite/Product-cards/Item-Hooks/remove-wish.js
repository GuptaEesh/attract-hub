const useRemoveWishItem = (product, dispatchWish) =>
    dispatchWish({
        type: 'REMOVE_FROM_WISHLIST',
        payload: product,
    })

export { useRemoveWishItem }
