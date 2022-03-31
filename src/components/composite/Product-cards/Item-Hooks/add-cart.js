// const useAddCartItem = (product, dispatch, setLoader) => {
//     setLoader(true)
//     setTimeout(() => {
//         dispatch({
//             type: 'ADD_TO_CART',
//             payload: product,
//         })
//         setLoader(false)
//     }, 1200)
// }
// export { useAddCartItem }
import axios from 'axios'

const getConfig = (token) => ({
    headers: {
        authorization: token,
    },
})

const useAddCartItem = async (product, dispatch, token, setLoader) => {
    try {
        setLoader(true)
        const response = await axios.post(
            '/api/user/cart',
            {
                product,
            },
            getConfig(token)
        )
        setLoader(false)
        dispatch({ type: 'ADD_TO_CART', payload: response.data.cart })
    } catch (e) {
        console.log(e)
    }
}

export { useAddCartItem }
