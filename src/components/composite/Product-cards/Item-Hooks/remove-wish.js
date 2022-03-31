import axios from 'axios'
import { getConfig } from './get-config'

const useRemoveWishItem = async (dispatch, token, id, setPopup) => {
    try {
        setPopup((popup) => ({ ...popup, wishloader: true }))
        const response = await axios.delete(
            `/api/user/wishlist/${id}`,

            getConfig(token)
        )
        setPopup((popup) => ({ ...popup, wishloader: false }))
        dispatch({
            type: 'MANIPULATE_WISHLIST',
            payload: response.data.wishlist,
        })
    } catch (e) {
        console.log(e)
    }
}

export { useRemoveWishItem }
