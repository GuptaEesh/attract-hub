import axios from 'axios'
import { getConfig } from './get-config'

const useAddCartItem = async (product, dispatch, token, setPopup) => {
    try {
        setPopup((popup) => ({ ...popup, cartloader: true }))
        const response = await axios.post(
            '/api/user/cart',
            {
                product,
            },
            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, cartloader: false }))
        dispatch({ type: 'MANIPULATE_BAG', payload: response.data.cart })
    } catch (e) {
        console.log(e)
    }
}

const useQuantityHandler = async (e, cartItem, dispatch, token) => {
    const response = await axios.post(
        `/api/user/cart/${cartItem._id}`,
        {
            action: {
                type: 'increment',
                payload: e.target.value,
            },
        },
        getConfig(token)
    )
    dispatch({
        type: 'MANIPULATE_BAG',
        payload: response.data.cart,
    })
}

export { useAddCartItem, useQuantityHandler }
