// const useAddWishItem = (product, dispatchWish) =>
import axios from 'axios'

const getConfig = (token) => ({
    headers: {
        authorization: token,
    },
})

const useAddWishItem = async (product, dispatch, token) => {
    try {
        const response = await axios.post(
            '/api/user/wishlist',
            {
                product,
            },
            getConfig(token)
        )
        dispatch({ type: 'ADD_TO_WISHLIST', payload: response.data.wishlist })
    } catch (e) {
        console.log(e)
    }
}
// dispatchWish({
//     type: 'ADD_TO_WISHLIST',
//     payload: product,
// })

export { useAddWishItem }
