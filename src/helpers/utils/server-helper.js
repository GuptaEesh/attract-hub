const alerts = (
    message,
    type,
    setPopups,
    dispatch = null,
    payload,
    placeToSaveProducts
) => {
    setPopups((popups) => ({
        ...popups,
        toast: true,
        toastMessage: message,
        toastType: type,
    }))
    setTimeout(
        () =>
            setPopups((popups) => ({
                ...popups,
                toast: false,
            })),
        1500
    )
    dispatch && placeToSaveProducts === 'cart'
        ? dispatchHandler(dispatch, 'MANIPULATE_BAG', payload.data.cart)
        : dispatchHandler(
              dispatch,
              'MANIPULATE_WISHLIST',
              payload.data.wishlist
          )
}

const dispatchHandler = (dispatch, dispatchType, payload) =>
    dispatch({ type: dispatchType, payload })

const immediateToastCloser = (setPopups) =>
    setPopups((popups) => ({ ...popups, toast: false }))

const getConfig = (token) => ({
    headers: {
        authorization: token,
    },
})
export { alerts, immediateToastCloser, getConfig }
