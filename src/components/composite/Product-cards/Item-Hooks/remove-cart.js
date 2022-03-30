// const useRemoveCartItem = (cartItem, dispatch) =>
//     dispatch({
//         type: 'DELETE_PRODUCT',
//         payload: cartItem,
//     })

// export { useRemoveCartItem }
import axios from 'axios'

const getConfig = (token) => ({
    headers: {
        authorization: token,
    },
})

const useRemoveCartItem = async (dispatch, token, id) => {
    try {
        const response = await axios.delete(
            `/api/user/cart/${id}`,

            getConfig(token)
        )
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: response.data.cart,
        })
    } catch (e) {
        console.log(e)
    }
}

export { useRemoveCartItem }
