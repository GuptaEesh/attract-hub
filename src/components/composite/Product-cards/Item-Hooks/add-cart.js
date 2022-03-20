const useAddCartItem = (product, dispatch, setLoader) => {
    setLoader(true)
    setTimeout(() => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: product,
        })
        setLoader(false)
    }, 1200)
}
export { useAddCartItem }
