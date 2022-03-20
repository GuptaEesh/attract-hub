const useRemoveCartItem = (cartItem, dispatch) =>
    dispatch({
        type: 'DELETE_PRODUCT',
        payload: cartItem,
    })

export { useRemoveCartItem }
