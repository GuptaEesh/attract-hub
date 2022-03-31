import axios from 'axios'
import { getConfig } from './get-config'

const useRemoveCartItem = async (dispatch, token, id, setPopup) => {
    try {
        setPopup((popup) => ({ ...popup, cartloader: true }))
        const response = await axios.delete(
            `/api/user/cart/${id}`,

            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, cartloader: false }))
        dispatch({
            type: 'MANIPULATE_BAG',
            payload: response.data.cart,
        })
    } catch (e) {
        console.log(e)
    }
}

export { useRemoveCartItem }
