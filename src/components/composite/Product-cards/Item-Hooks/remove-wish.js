import axios from 'axios'

const getConfig = (token) => ({
    headers: {
        authorization: token,
    },
})

const useRemoveWishItem = async (dispatch, token, id) => {
    try {
        const response = await axios.delete(
            `/api/user/wishlist/${id}`,

            getConfig(token)
        )
        dispatch({
            type: 'REMOVE_FROM_WISHLIST',
            payload: response.data.wishlist,
        })
    } catch (e) {
        console.log(e)
    }
}
// const useRemoveWishItem = (product, dispatchWish) =>
//     dispatchWish({
//         type: 'REMOVE_FROM_WISHLIST',
//         payload: product,
//     })

export { useRemoveWishItem }
